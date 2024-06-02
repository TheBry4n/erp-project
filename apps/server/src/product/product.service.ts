import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '@server/prisma/prisma.service';
import { Product } from "../types"
import { CheckoutDto, CreateProductDto, GetCartItemsDto, RifornimentoDto } from './dto';
import { readFileSync } from 'fs';
import * as path from 'path';

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

    async create(dto: CreateProductDto): Promise<void>{
        const buffer = readFileSync(path.join(__dirname, "../../../src/product/image/immagine-non-disponibile.png"))
        const newProd = await this.prisma.scarpe.create({
            data: {
                marca: dto.marca,
                modello: dto.modello,
                descrizione: dto.descrizione,
                prezzoUnitario: dto.prezzo,
                quantita: dto.quantita,
                immagine: buffer
            }
        })

        if(!newProd) throw new InternalServerErrorException("Errore nella creazione del nuovo prodotto");

        return;
    }

    async checkout(dto: CheckoutDto): Promise<void> {
        try{
            dto.cart.forEach( async (el) => {
                await this.prisma.scarpe.update({
                    where: {
                        scarpaId: el.id
                    },
                    data: {
                        quantita: { decrement: el.quantita }
                    }
                })
            })
        }catch(err){
            throw new InternalServerErrorException("Errore nell'acquisto")
        }
    }
}
