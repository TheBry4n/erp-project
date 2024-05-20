"use client"
import React, { ReactNode, useEffect, useState } from "react";
import { Session, withProtectionProps } from "../types";
import { redirect } from "next/navigation";
import { useSession } from "../hooks";

export const WithProtection: React.FC<withProtectionProps> = ({ sessionRequired, accessRole = ["UTENTE", "ADMIN", "MANAGER"], children, asPublicRoute }: withProtectionProps) => {
    const { getSession } = useSession()
    const [ check, setCheck ] = useState(true)
    let currentSession: Session | undefined = undefined

    useEffect(() => {
        let can = false
        currentSession = getSession()
        if(sessionRequired && !currentSession){
            can = false
        }
        else if(currentSession && !(accessRole.includes(currentSession?.userInfo.role))){
            can = false
        }else if(!sessionRequired && currentSession){
            can = false;
        }else can = true;

        can = asPublicRoute ? true : can;

        !can ? redirect("/") : setCheck(false)
    },[currentSession])

    return (
        <>
            {!check ? <>{children}</> : (
                <div className="inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-lg" />
            )}
        </>
    )
}