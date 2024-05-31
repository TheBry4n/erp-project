import { IsNotEmpty, IsNumber } from "class-validator";

export class RifornimentoDto {

    @IsNotEmpty()
    @IsNumber()
    quantity: number
}