import * as z from "zod"
import { newProductSchema } from "../zodSchema"
import { errorResponse } from "../types";

export async function CreateNewProduct(data : z.infer<typeof newProductSchema>) {

    const { marca, modello, descrizione, prezzo, quantita } = data

    const body = { marca, modello, descrizione, prezzo, quantita }

    try{
        const res = await fetch("http://localhost:3001/products/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
    
        if(!res.ok) {
            const errorData = await res.json()
            const errObj: errorResponse = { statusCode: errorData.statusCode, message: errorData.message }
            return errObj
        }
    
        return null;
    }catch(err){
        const errObj: errorResponse = { statusCode: 500, message: "Errore nell'elaborazione della richiesta" }
        return errObj
    }
}

// const readFileAsUint8Array = async (file: File): Promise<Uint8Array> => {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onload = () => {
//             const arrayBuffer = reader.result as ArrayBuffer;
//             const uint8Array = new Uint8Array(arrayBuffer);
//             resolve(uint8Array);
//         };
//         reader.onerror = () => {
//             reject(new Error("Errore durante la lettura del file"));
//         };
//         reader.readAsArrayBuffer(file);
//     });
// };