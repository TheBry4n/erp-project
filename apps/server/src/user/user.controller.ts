import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateEmailDto, UpdatePasswordDto } from "./dto"
import { getUsers } from '@server/types';

@Controller('user')
export class UserController {

    constructor(
        private service: UserService
    ){}

    @Put("update")
    update(@Body() dto: UpdateEmailDto | UpdatePasswordDto, @Query("type") prop: string, @Query("email") email: string): Promise<void> {
        return this.service.update(dto, prop, email)
    }

    @Get("/")
    getUsers(): Promise<{ users: getUsers[]}> {
        return this.service.getAllUser();
    }

    @Post("fire")
    fire(@Query("id") id: string): Promise<void>{
        return this.service.fireUser(id);
    }

    @Post("hire")
    hire(@Query("id") id: string): Promise<void>{
        return this.service.hireUser(id);
    }

    @Get("controlloCandidatura")
    check(@Query("email") email: string): Promise<{ isCandidate: boolean }> {
        return this.service.check(email);
    }

    @Post("candidatura")
    candidatura(@Body() dto: UpdateEmailDto): Promise<void> {
        return this.service.candidatura(dto)
    }
}
