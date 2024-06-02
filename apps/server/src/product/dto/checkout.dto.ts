import { IsArray, IsNotEmpty, IsString } from "class-validator"

export class CheckoutDto {

    @IsArray()
    @IsNotEmpty()
    cart: Array<{
        id: string,
        quantita: number
    }>
}