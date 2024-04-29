import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto, LoginDto } from './dto';
import { Tokens } from '@server/types';
import { User } from '@prisma/client';

@Controller('api')
export class AuthController {
    constructor(private service: AuthService){}

    @Post('signup')
    signup(@Body() signupDto: SignupDto): Promise<User>{
        return this.service.signup(signupDto)
    }

    @Post('login')
    login(@Body() loginDto: LoginDto): Promise<Tokens>{
        return this.service.login(loginDto)
    }
}
