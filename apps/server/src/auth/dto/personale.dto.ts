import { IsDateString, IsEmail, IsNotEmpty, IsString } from "class-validator"

export class PersonaleDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    nome: string

    @IsString()
    @IsNotEmpty()
    cognome: string

    @IsDateString()
    @IsNotEmpty()
    dataNascita: Date

    @IsString()
    @IsNotEmpty()
    password: string
}