import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@server/prisma/prisma.service';
import { Info, JwtPayload, loginRes, Tokens, tokensInfo } from '@server/types';
import * as argon from "argon2";
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { LoginDto, LogoutDto, RefreshDto, SignupDto } from './dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService, 
        private readonly config: ConfigService,
        private readonly jwt: JwtService
        ){}

    async signup(dto: SignupDto): Promise<User> {
        const hash = await argon.hash(dto.password);

        try{

            const user = await this.prisma.user.create({
                data: {
                    nome: dto.nome,
                    cognome: dto.cognome,
                    email: dto.email,
                    hashPW: hash,
                    hashRT: ""
                }
            })
            return user
        }catch(error){
            throw new ForbiddenException("Account gia esistente")
        }
    }

    async login(dto: LoginDto): Promise<loginRes> {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })
        if(!user) throw new ForbiddenException("Account inesistente");

        const matchPW = await argon.verify(user.hashPW, dto.password)

        if(!matchPW) throw new ForbiddenException("Password errata");

        const payload: JwtPayload = {sub: user.userId, email: user.email}
        const tokens = await this.createTokens(payload)

        const hashRT = await argon.hash(tokens.refresh_token)

        await this.prisma.user.update({
            where: {
                email: user.email
            },
            data: {
                hashRT: hashRT
            }
        })

        return {
            tokensInfo: {
                access_token: tokens.access_token,
                refresh_token: tokens.refresh_token,
                ATExpiredTime: this.config.get("JWT_EXPIRE_TIME_AT"),
                RTExpiredTime: this.config.get("JWT_EXPIRE_TIME_RT")
            },
            userData: {
                nome: user.nome,
                cognome: user.cognome, 
                email: user.email,
                role: user.ruolo
            }
        }
    }

    async refreshToken(dto: RefreshDto, jwtPayload: JwtPayload): Promise<tokensInfo> {
        const tokens = await this.createTokens(jwtPayload)
        const hashRT = await argon.hash(tokens.refresh_token)
        await this.prisma.user.update({
            where: {
                userId: jwtPayload.sub
            },
            data: {
                hashRT,
            }
        })

        return {
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            ATExpiredTime: this.config.get("JWT_EXPIRE_TIME_AT"),
            RTExpiredTime: this.config.get("JWT_EXPIRE_TIME_RT")
        }
    }

    async logout(dto: LogoutDto): Promise<void> {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })

        if(!user) throw new ForbiddenException("Email non valida");

        if(user.hashPW === "") throw new ForbiddenException("User gia sloggato")

        const RTDtohash = await argon.hash(dto.refreshToken)

        if(RTDtohash !== user.hashRT) throw new ForbiddenException("Refresh token non appartenente al tuo account");

        await this.prisma.user.update({
            where: {
                email: dto.email
            },
            data: {
                hashRT: ""
            }
        })
    }

    private async createTokens(payload: JwtPayload): Promise<Tokens>{
        const [at, rt] = await Promise.all([
            this.jwt.signAsync({
                sub: payload.sub,
                email: payload.email
            },
            {
                secret: this.config.get("JWT_SECRET_AT"),
                expiresIn: this.config.get("JWT_EXPIRE_TIME_AT")
            }),
            this.jwt.signAsync({
                sub: payload.sub,
                email: payload.email
            },
            {
                secret: this.config.get("JWT_SECRET_RT"),
                expiresIn: this.config.get("JWT_EXPIRE_TIME_RT")
            })
        ])

        return { access_token: at, refresh_token: rt }
    }

    async getInfo(): Promise<Info> {
        try{
            let numUser = 0
            let numAdmin = 0
            const users = await this.prisma.user.findMany({
                select: {
                    ruolo: true
                }
            })

            const numProd = await this.prisma.scarpe.count()

            const numCandidati = await this.prisma.candidati.count()

            users.forEach(user => {
                if(user.ruolo === "ADMIN") numAdmin++;
                else if(user.ruolo === "UTENTE") numUser++
            })

            return {
                info: {
                    numAdmin,
                    numCandidati,
                    numProd,
                    numUser
                }
            }
        }catch(err){
            throw new InternalServerErrorException("Errore nel calcolo delle info")
        }
    }
}
