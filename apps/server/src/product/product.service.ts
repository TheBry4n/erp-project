import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '@server/prisma/prisma.service';
import { Product } from "../types"

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService){}

    async getAllProducts(): Promise<{ products: Array<Product> | [] }>{
        try{
            const products = await this.prisma.scarpe.findMany({
                select: {
                    scarpaId: true,
                    marca: true,
                    modello: true,
                    prezzoUnitario: true,
                    immagine: true,
                    descrizione: true
                }
            });
            return { products }
        }catch(err){
            throw new InternalServerErrorException(`${err.message}`)
        }
    }
}
