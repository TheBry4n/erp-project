import { IsNotEmpty, IsString } from "class-validator";

export class UpdateEmailDto {

    @IsString()
    @IsNotEmpty()
    email: string
}