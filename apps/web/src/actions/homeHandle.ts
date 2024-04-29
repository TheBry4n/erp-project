"use server"
import { redirect } from "next/navigation"

export const loginHandle = () => {
    redirect("/login")
}

export const candidaturaHandle = () => {
    redirect("/signup")
}