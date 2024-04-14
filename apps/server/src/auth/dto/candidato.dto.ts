import { IsDateString, IsEmail, IsNotEmpty, IsString } from "class-validator"

export class CandidatoDto {
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
}