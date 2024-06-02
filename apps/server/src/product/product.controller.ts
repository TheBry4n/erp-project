import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from "../types"
import { CheckoutDto, CreateProductDto, GetCartItemsDto, RifornimentoDto } from './dto';

@Controller('products')
export class ProductController {
    constructor(private service: ProductService){}

    @Get("/")
    products(): Promise<{ products: Array<Product> | [] }>{
        return this.service.getAllProducts();
    }

    @Post("getCartItems")
    getCartItems(@Body() body: GetCartItemsDto): Promise<{ products: Array<Product> | [] }> {
        return this.service.getCartItems(body);
    }

    @Post("rifornisci")
    rifornisci(@Query("id") prodID: string, @Body() dto: RifornimentoDto): Promise<void>{
        return this.service.rifornisci(dto, prodID);
    }

    @Post("create")
    create(@Body() dto: CreateProductDto): Promise<void>{
        return this.service.create(dto);
    }

    @Post("checkout")
    checkout(@Body() dto: CheckoutDto): Promise<void>{
        return this.service.checkout(dto)
    }
}
