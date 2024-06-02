import * as z from "zod"

export const newProductSchema = z.object({
    marca: z.string().min(1),
    modello: z.string().min(1),
    quantita: z.preprocess(
        (val) => parseInt(z.string().parse(val), 10), 
        z.number().int().positive().min(5).refine(val => Number.isInteger(val), { message: "La quantità deve essere un numero intero" })
    ),
    prezzo: z.preprocess(
        (val) => parseFloat(z.string().parse(val)),
        z.number().positive().min(60).refine(val => !isNaN(val), { message: "Il prezzo deve essere un numero valido" })
    ),
    descrizione: z.string().min(10)
})