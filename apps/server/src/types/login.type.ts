import { tokensInfo } from "./tokensInfo.type"

export type loginRes = {
    tokensInfo: tokensInfo,
    userData: {
        nome:string,
        cognome:string,
        email:string,
        role: string
    }
}