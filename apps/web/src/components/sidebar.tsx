"use client"
import React from "react";
import { Bug, Home, LayoutDashboard, List, LogIn, Mail, Settings, Text } from "lucide-react";
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
        label: "Bug report",
        href: "contattaci",
        icon: Mail
    }
]

const dashboardLinks = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard
    },
    {
        label: "Home",
        href: "/",
        icon: Home
    },
    {
        label: "Prodotti",
        href: "/dashboard/prodotti",
        icon: List
    },
    {
        label: "Report",
        href: "/dashboard/report",
        icon: Bug
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
                    icon: LayoutDashboard
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