"use client"
import React from "react";
import { Home, LogIn, LogOut, Mail, Settings, Text } from "lucide-react";
import { SideBarDesktop } from "./sidebar-desktop";
import { SideBarItems } from "../types";


export function SideBar() {

    const sideBarItems: SideBarItems = {
        links: [
            {
                label: "Home",
                href: "/",
                icon: Home
            },
            {
                label: "Chi siamo?",
                href: "chiSiamo",
                icon: Text
            },
            {
                label: "Contattaci",
                href: "contattaci",
                icon: Mail
            }
        ],
        accountLinks: {
            loggend: [
                {
                    label: "Account settings",
                    href: "/settings",
                    icon: Settings
                }
            ],
            notLogged: [
                {
                    label: "Login",
                    href: "/login",
                    icon: LogIn
                },
                {
                    label: "Sign up",
                    href: "/signup",
                    icon: LogIn
                }
            ]
        }
    }

    return (
        <SideBarDesktop 
            sideBarItems={sideBarItems}
        />
    )
}