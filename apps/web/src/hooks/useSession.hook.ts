import { Session } from "../types"
import Cookies from "js-cookie"
import { redirect } from "next/navigation"
import { useState, useEffect, useLayoutEffect } from "react"
import { addMinutes, isAfter } from "date-fns" 
import { setInterval } from "timers"

const useSession = () => {
    const [ session, setSession ] = useState<null | Session>(null)
    const sessionString = Cookies.get("__session")
    if(!sessionString) redirect("/");
    else {
        const sessionData = JSON.parse(sessionString)
        setSession(sessionData)
    }

    useLayoutEffect(() => {
    },[session])

    useLayoutEffect(() => {
        const checkAccessTokenValidation = async () => {
            if(!session) redirect("/");

            const accessTokenExpiry = addMinutes(session.userInfo.dateOfAccess, parseInt(session.tokensInfo.ATExpiredTime))
            
            if(isAfter(new Date(), accessTokenExpiry)){
                try{
                    const res = await fetch("http://localhost:3001/token/refresh", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${session.tokensInfo.refreshToken}`
                        },
                        body: JSON.stringify(session.tokensInfo.refreshToken)
                    })

                    if(!res.ok) throw new Error

                    const resData = await res.json()

                    const newSession: Session = {
                        tokensInfo: {
                            ...resData
                        },
                        userInfo: {
                            ...session.userInfo
                        }
                    }
                    Cookies.set("__session",JSON.stringify(newSession), { expires: 7, path:"/" })
                    setSession(newSession)
                }catch(error){
                    logout()
                }
            }
        }

        const interval = setInterval(checkAccessTokenValidation, 1000 * 60)
        return () => clearInterval(interval)
    }, [session])

    const saveSession = (sessionData: Session) => {
        Cookies.set("__session",JSON.stringify(sessionData), { expires: 7, path:"/" })
        setSession(sessionData)
    }

    const logout = () => {
        Cookies.remove("__session")
        setSession(null)
    }

    return { session, saveSession, logout }
}

export default useSession