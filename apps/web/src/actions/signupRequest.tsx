
"use server"
import { z } from "zod"
import { signupSchema } from '../zodSchema'
import { errorResponse } from "../types";

type signupData = z.infer<typeof signupSchema>;

export async function signupRequest(data: signupData): Promise<errorResponse | null> {
  const apiURL = "http://localhost:3001/api/signup";
  let errorReturn = null;
  try {
    const res = await fetch(apiURL, {
        method: "post",
        headers: new Headers({
            "Content-Type": "application/json"
        }),
        body: JSON.stringify(data)
    })
    if(!res.ok){
        const errorData = await res.json()
        const error: errorResponse = { statusCode: res.status , message: errorData.message ? errorData.message : "Undefine error" }
        errorReturn = error;
    }
  } catch (error) {
    console.error(error)
  }

  return !errorReturn ? null : errorReturn;
}