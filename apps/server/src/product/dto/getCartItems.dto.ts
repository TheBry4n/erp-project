import { IsArray, IsNotEmpty } from "class-validator";

export class GetCartItemsDto {

    @IsNotEmpty()
    @IsArray()
    ids: Array<string>
}