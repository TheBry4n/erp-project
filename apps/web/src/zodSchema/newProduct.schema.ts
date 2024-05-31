import * as z from "zod"

export const newProductSchema = z.object({
    marca: z.string(),
    modello: z.string(),
    quantita: z.number().int().positive().min(5),
    prezzo: z.number().positive().min(100),
    descrizione: z.string(),
    immagine: z.custom((v) =>{
        if(!(v instanceof Buffer)) throw new Error("Immagine invalida");
        return v;
    })
})