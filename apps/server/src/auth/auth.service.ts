import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@server/prisma/prisma.service';
import { CandidatoDto, SigninDto } from './dto';
import { Candidati } from '@prisma/client';
import { Tokens } from '@server/types';
import * as argon from "argon2";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService, 
        private config: ConfigService,
        private jwt: JwtService
        ){}

    async candidatura(dto: CandidatoDto): Promise<Candidati> {
        const candidato = await this.prisma.candidati.create({
            data: {
                ...dto
            }
        })
        
        return candidato
    }

    async signin(dto: SigninDto): Promise<Tokens> {
        const user = await this.prisma.personale.findUnique({
            where: {
                email : dto.email
            }
        })
        if(!user) throw new ForbiddenException('credenziali errate')

        const pwMatch = await argon.verify(user.hashPass, dto.password)
        if(!pwMatch) throw new ForbiddenException('Credenziali errate')

        return await this.createTokens(user.idPersonale, user.email)
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
