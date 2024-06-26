import { Body, Controller, ForbiddenException, Get, Post, Put, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto, LoginDto, RefreshDto, LogoutDto } from './dto';
import { Info, JwtPayload, loginRes, tokensInfo } from '@server/types';
import { User } from '@prisma/client';
import { RefreshGuard } from '@server/guards';
import { GetPayLoad } from '@server/decorator';

@Controller('api')
export class AuthController {
    constructor(private service: AuthService){}

    @Post('signup')
    signup(@Body() signupDto: SignupDto): Promise<User>{
        return this.service.signup(signupDto)
    }

    @Post('login')
    login(@Body() loginDto: LoginDto): Promise<loginRes>{
        return this.service.login(loginDto)
    }

    @Post("refresh")
    @UseGuards(RefreshGuard)
    refresh(@Body() refreshDto: RefreshDto, @GetPayLoad() payload: JwtPayload): Promise<tokensInfo> {
        if(!payload) throw new ForbiddenException("RefreshToken non valido")
        return this.service.refreshToken(refreshDto, payload)
    }

    @Post("logout")
    logout(@Body() logoutDto: LogoutDto): Promise<void> {
        return this.service.logout(logoutDto)
    }

    @Get("info")
    getInfo(): Promise<Info>{
        return this.service.getInfo();
    }
}
