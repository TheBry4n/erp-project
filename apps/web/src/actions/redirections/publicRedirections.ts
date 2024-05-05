"use server"
import { redirect } from "next/navigation"

export const loginRedirect = () => {
    redirect("/login")
}

export const signupRedirect = () => {
    redirect("/signup")
}

