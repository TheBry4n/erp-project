import { z } from "zod";
import { loginSchema } from "../zodSchema";
import { errorResponse, Session } from "../types";
import Cookies from 'js-cookie';

type loginData = z.infer<typeof loginSchema>

export const loginRequest = async (data: loginData): Promise<errorResponse | null> => {
    const apiURL = "http://localhost:3001/api/login"
    let errorRes = null;
    try{
        const res = await fetch(apiURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        if(!res.ok){
            const errorData = await res.json()
            const error: errorResponse = { statusCode: res.status, message: errorData.message }
            errorRes = error;
        }else{
            const resData = await res.json()
            const session: Session = {
                tokensInfo: {
                    accessToken: resData.tokensInfo.access_token,
                    ATExpiredTime: resData.tokensInfo.ATExpiredTime,
                    refreshToken: resData.tokensInfo.refresh_token,
                    RTExpiredTime: resData.tokensInfo.RTExpiredTime
                },
                userInfo: {
                    nome : resData.userData.nome,
                    cognome : resData.userData.cognome,
                    email: resData.userData.email,
                    role: resData.userData.ruolo,
                    dateOfAccess: new Date()
                }
            }
            localStorage.setItem("__session", JSON.stringify(session))
        }
    }catch(error){
        console.log(error)
    }

    return !errorRes ? null : errorRes
}