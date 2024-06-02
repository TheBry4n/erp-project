import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateProductDto {

    @IsString()
    @IsNotEmpty()
    marca: string

    @IsString()
    @IsNotEmpty()
    modello: string

    @IsString()
    @IsNotEmpty()
    descrizione: string

    @IsNumber()
    @IsNotEmpty()
    prezzo: number

    @IsNumber()
    @IsNotEmpty()
    quantita: number
}