"use client"
import React from "react";
import { Home, LogIn, Mail, Settings, Text } from "lucide-react";
import { SideBarDesktop } from "./sidebar-desktop";
import { SideBarItems } from "../types";

const userLinks = [
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
]

const dashboardLinks = [
    {
        label: "Home",
        href: "/",
        icon: Home
    },
    {
        label: "Prodotti",
        href: "/dashboard/prodotti",
    },
    {
        label: "Report",
        href: "/dashboard/report",
    }
]

export function SideBar() {

    const sideBarItems: SideBarItems = {
        links: {
            user: userLinks,
            admin: [
                ...userLinks,
                {
                    label: "Dashboard",
                    href: "/dashboard",
                }
            ]
        },
        linksDashboard: {
            admin: dashboardLinks,
            manager: [
                ...dashboardLinks,
                {
                    label: "Admin",
                    href: "/dashboard/admin",
                }
            ]
        },
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