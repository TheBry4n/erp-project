import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    passwordConfirm: z.string()
}).refine((data) => {
    return data.password === data.passwordConfirm
}, {
    message: "le password non coincidono",
    path: ["passwordConfirm"]
})