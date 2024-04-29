import { z } from "zod"

export const signupSchema = z.object({
    nome: z.string().min(4),
    cognome: z.string().min(4),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8)
}).refine((data) => {
    return data.password === data.confirmPassword
}, {
    message: "Le password sono diverse",
    path: ["confirmPassword"]
})