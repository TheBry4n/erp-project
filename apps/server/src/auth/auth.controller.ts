import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CandidatoDto, SigninDto } from './dto';
import { Candidati } from '@prisma/client';
import { Tokens } from '@server/types';

@Controller('auth')
export class AuthController {
    constructor(private service: AuthService){}

    @Post('candidatura')
    candidatura(@Body() candidaturaDto: CandidatoDto): Promise<Candidati>{
        return this.service.candidatura(candidaturaDto)
    }

    @Post('signin')
    signin(@Body() signinDto: SigninDto): Promise<Tokens>{
        return this.service.signin(signinDto)
    }
}
