import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { PrismaService } from "@server/prisma/prisma.service";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, "refresh") {
    constructor(config: ConfigService, private readonly prisma: PrismaService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get("JWT_SECRET_RT")
        })
    }

    async validate(payload: { sub: string, email: string }){
        const user = await this.prisma.user.findUnique({
            where: {
                userId: payload.sub
            }
        })

        if(!user) return false

        return payload
    }
}