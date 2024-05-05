"use server"
import { redirect } from "next/navigation"

export const homePageRedirect = () => {
    redirect("homePage");
}