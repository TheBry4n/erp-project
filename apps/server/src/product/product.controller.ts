import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from "../types"

@Controller('products')
export class ProductController {
    constructor(private service: ProductService){}

    @Get("/")
    products(): Promise<{ products: Array<Product> | [] }>{
        return this.service.getAllProducts();
    }
}
