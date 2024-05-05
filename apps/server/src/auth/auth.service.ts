import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@server/prisma/prisma.service';
import { loginRes, Tokens } from '@server/types';
import * as argon from "argon2";
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { LoginDto, SignupDto } from './dto';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService, 
        private config: ConfigService,
        private jwt: JwtService
        ){}

    async signup(dto: SignupDto): Promise<User> {
        const hash = await argon.hash(dto.password);

        const user = await this.prisma.user.create({
            data: {
                nome: dto.nome,
                cognome: dto.cognome,
                email: dto.email,
                hashPW: hash,
                hashRT: ""
            }
        })

        return user;
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

        const tokens = await this.createTokens(user.userId, user.email)

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

    async createTokens(sub: string, email: string): Promise<Tokens>{
        const [at, rt] = await Promise.all([
            this.jwt.signAsync({
                sub,
                email
            },
            {
                secret: this.config.get("JWT_SECRET_AT"),
                expiresIn: this.config.get("JWT_EXPIRE_TIME_AT")
            }),
            this.jwt.signAsync({
                sub,
                email
            },
            {
                secret: this.config.get("JWT_SECRET_RT"),
                expiresIn: this.config.get("JWT_EXPIRE_TIME_RT")
            })
        ])

        return { access_token: at, refresh_token: rt }
    }
}
