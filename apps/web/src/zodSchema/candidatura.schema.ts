import { z } from "zod"

export const candidaturaSchema = z.object({
    nome: z.string(),
    cognome: z.string(),
    citta: z.string(),
    via: z.string(),
    civico: z.string(),
    dataNascita: z.date()
})