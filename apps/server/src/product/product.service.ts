import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '@server/prisma/prisma.service';
import { Product } from "../types"
import { GetCartItemsDto, RifornimentoDto } from './dto';

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
                    descrizione: true,
                    quantita: true
                }
            });
            return { products }
        }catch(err){
            throw new InternalServerErrorException(`${err.message}`)
        }
    }


    async getCartItems(body: GetCartItemsDto): Promise<{ products: Array<Product> | [] }> {
        try{
            const products: Product[] = []

            for (const id of body.ids) {
                const item: Product | null = await this.prisma.scarpe.findUnique({
                    where: {
                        scarpaId: id
                    },
                    select: {
                        scarpaId: true,
                        marca: true,
                        modello: true,
                        prezzoUnitario: true,
                        immagine: true,
                        descrizione: true,
                        quantita: true
                    }
                });
    
                if (item) {
                    products.push(item);
                }
            }

            return { products }
        }catch(err){
            throw new InternalServerErrorException(`${err.message}`)
        }
    }

    async rifornisci(dto: RifornimentoDto, prodID: string): Promise<void>{
        const { quantity } = dto

        const prod = await this.prisma.scarpe.findUnique({
            where: { scarpaId: prodID }
        })

        if(!prod) throw new InternalServerErrorException("Prodotto non trovato");

        await this.prisma.scarpe.update({
            where: {scarpaId: prodID},
            data:{ quantita: { increment: quantity } }
        })
    }
}
