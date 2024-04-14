import { z } from "zod"
import { loginSchema } from "../zodSchema"

type loginProps = z.infer<typeof loginSchema>

export const loginSubmit = async (data: loginProps) => {
    try{
        const res = await fetch("http://localhost:3001/auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
    
        if(!res.ok){
            const errorData = await res.json()
            const error = {
                statusCode: res.status,
                message: errorData.message
            }
            throw error
        }
    
        const resData = await res.json()
        console.log(resData)
    }catch(error){
        throw error
    }
}