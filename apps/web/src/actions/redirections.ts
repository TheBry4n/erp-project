"use server"

import { redirect } from "next/navigation"

export const loginRedirect = () => {
    redirect("/login")
}

export const homePageRedirect = () => {
    redirect("/")
}

export const dashboardProductRidirect = () => {
    redirect("/dashboard/prodotti")
}