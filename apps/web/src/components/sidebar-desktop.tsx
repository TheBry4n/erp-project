"use client"
import React, { useLayoutEffect, useState } from "react";
import { SideBarItems } from "../types";
import Link from "next/link";
import { SideBarButton } from "./sidebar-button";
import { Separator } from "./ui/separator";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { User, MoreHorizontal, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { useLocalStorage } from "../hooks";

interface SideBarDesktopProps {
    sideBarItems: SideBarItems;
}

export function SideBarDesktop(props: SideBarDesktopProps) {
    const { getItem, setItem, removeItem } = useLocalStorage("__session")
    const pathName = usePathname()
    const [ session, setSession ] = useState<undefined | {id:number}>(undefined)
    
    useLayoutEffect(() => {
        const session = getItem()
        setSession(session)
    }, [])

    const handleLogOut = () => {
        removeItem()
        setSession(undefined)
    }

    return (
        <aside className="w-[270px] max-w-xs h-screen fixed top-0 left-0 z-40 border-r" >
            <div className="h-full px-3 py-4" >
                <h3 className="mx-3 text-lg font-semibold text-foreground" >
                    Scarpe&co
                </h3>
                <div className="mt-5" >
                    <div className="flex flex-col gap-1 w-full" >
                        {props.sideBarItems.links.map((link, index) => (
                            <Link key={index} href={link.href} >
                                <SideBarButton variant={pathName === link.href ? "secondary" : "ghost"} icon={link.icon} className="w-full" > 
                                {link.label} 
                                </SideBarButton>
                            </Link>
                        ))}
                        {props.sideBarItems.extras}
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
                                            <span>Username</span>
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