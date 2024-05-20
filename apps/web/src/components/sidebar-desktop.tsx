"use client"
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Session, SideBarItems } from "../types";
import Link from "next/link";
import { SideBarButton } from "./sidebar-button";
import { Separator } from "./ui/separator";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { User, MoreHorizontal, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSession } from "../hooks";
import { homePageRedirect } from "../actions";

interface SideBarDesktopProps {
    sideBarItems: SideBarItems;
}

export function SideBarDesktop(props: SideBarDesktopProps) {
    const pathName = usePathname()
    const [ dashboard, setDashboard ] = useState(false)
    const { session, setUserSession: setSession, logoutUser: logout, getSession } = useSession()

    useEffect(() => {
        if(!dashboard && pathName.includes("dashboard")){
            setDashboard(true)
        }else if(dashboard && !pathName.includes("dashboard")){
            setDashboard(false)
        }
    }, [pathName, dashboard])

    const handleLogOut = () => {
        if(pathName.includes("dashboard")){
            logout()
            homePageRedirect()
        }else{
            logout()
        }
    }

    return (
        <aside className="w-[270px] max-w-xs h-screen fixed top-0 left-0 z-40 border-r" >
            <div className="h-full px-3 py-4" >
                <h3 className="mx-3 text-lg font-semibold text-foreground" >
                    Scarpe&co
                </h3>
                <div className="mt-5" >
                    <div className="flex flex-col gap-1 w-full" >
                        {!dashboard ? (
                            <>
                                {session && (session.userInfo.role === "ADMIN" || session.userInfo.role === "MANAGER") ? (
                                    <>
                                        {props.sideBarItems.links.admin.map((link, index) => (
                                            <Link key={index} href={link.href} >
                                                <SideBarButton variant={pathName === link.href ? "secondary" : "ghost"} icon={link.icon} className="w-full" > 
                                                {link.label} 
                                                </SideBarButton>
                                            </Link>
                                        ))}
                                    </>
                                ) : (
                                    <>
                                        {props.sideBarItems.links.user.map((link, index) => (
                                            <Link key={index} href={link.href} >
                                                <SideBarButton variant={pathName === link.href ? "secondary" : "ghost"} icon={link.icon} className="w-full" > 
                                                {link.label} 
                                                </SideBarButton>
                                            </Link>
                                        ))}
                                    </>
                                )}
                                {props.sideBarItems.extras}
                            </>
                        ) : (
                            <>
                                {session?.userInfo.role === "ADMIN" ? (
                                    <>
                                        {props.sideBarItems.linksDashboard.admin.map((link, index) => (
                                            <Link key={index} href={link.href} >
                                                <SideBarButton variant={pathName === link.href ? "secondary" : "ghost"} icon={link.icon} className="w-full" > 
                                                {link.label} 
                                                </SideBarButton>
                                            </Link>
                                        ))}
                                    </>
                                ) : (
                                    <>
                                        {props.sideBarItems.linksDashboard.manager.map((link, index) => (
                                            <Link key={index} href={link.href} >
                                                <SideBarButton variant={pathName === link.href ? "secondary" : "ghost"} icon={link.icon} className="w-full" > 
                                                {link.label} 
                                                </SideBarButton>
                                            </Link>
                                        ))}
                                    </>
                                )}
                            </>
                        )}
                    </div>
                    <div className="absolute left-0 bottom-3 w-full px-3" >
                        <Separator className="absolute -top-3 left-0 w-full" />
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="ghost" className="w-full justify-start">
                                    <div className="flex justify-between items-center w-full" >
                                        <div className="flex gap-2" >
                                            <Avatar className="h-5 w-5">
                                                <AvatarFallback><User size={15} /></AvatarFallback>
                                            </Avatar>
                                            <span>{ session ? session.userInfo.nome : "user" }</span>
                                        </div>
                                        <MoreHorizontal/>
                                    </div>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="mb-2 w-56 p-3 rounded-[1rem]" >
                                <div className="spcae-y-1" >
                                    {session ? (
                                        <>
                                            {props.sideBarItems.accountLinks.loggend.map((link, index)=>(
                                                <Link key={index} href={link.href} >
                                                    <SideBarButton variant={pathName === link.href ? "secondary" : "ghost"} icon={link.icon} className="w-full" > 
                                                        {link.label} 
                                                    </SideBarButton>
                                                </Link>
                                            ))}
                                            <SideBarButton variant="ghost" icon={LogOut} className="w-full" onClick={() => handleLogOut()} >
                                                Logout
                                            </SideBarButton>
                                        </>
                                    ) : (
                                        <>
                                            {props.sideBarItems.accountLinks.notLogged.map((link, index)=>(
                                                <Link key={index} href={link.href} >
                                                    <SideBarButton variant={pathName === link.href ? "secondary" : "ghost"} icon={link.icon} className="w-full" > 
                                                        {link.label} 
                                                    </SideBarButton>
                                                </Link>
                                            ))}
                                        </>
                                    )}
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </div>
        </aside>
    );
}