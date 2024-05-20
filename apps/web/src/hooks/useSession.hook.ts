import { useEffect, useState } from "react"
import { Session } from "../types";
import { useLocalStorage } from "./useLocalStorage.hook";
import { addDays, addMinutes, isAfter } from "date-fns";

 export const useSession = () => {
    const [ session, setSession ] = useState<undefined | Session>(undefined);
    const { getItem, setItem, removeItem } = useLocalStorage("__session");

    useEffect(() => {
        const item = getItem()
        const checkAccessTokenValidation = async (session: Session): Promise<Session> => {
            const accessTokenExpiry = addMinutes(session.userInfo.dateOfAccess, parseInt(session.tokensInfo.ATExpiredTime))
            const refreshTokenExpiry = addDays(session.userInfo.dateOfAccess, parseInt(session.tokensInfo.RTExpiredTime))
            const currentDate = new Date()
            
            if(isAfter(currentDate, accessTokenExpiry) && !isAfter(currentDate, refreshTokenExpiry)){
                const body = { refreshToken: session.tokensInfo.refreshToken }
                try{
                    const res = await fetch("http://localhost:3001/api/refresh", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${session.tokensInfo.refreshToken}`
                        },
                        body: JSON.stringify(body)
                    })
                  
                    if(!res.ok) throw new Error
                  
                    const resData = await res.json()
                  
                    const newSession: Session = {
                        tokensInfo: {
                            accessToken: resData.access_token,
                            ATExpiredTime: resData.ATExpiredTime,
                            refreshToken: resData.refresh_token,
                            RTExpiredTime: resData.RTExpiredTime
                        },
                        userInfo: {
                            nome : session.userInfo.nome,
                            cognome : session.userInfo.cognome,
                            email: session.userInfo.email,
                            role: session.userInfo.role,
                            dateOfAccess: new Date()
                        }
                    }
                    return newSession
                }catch(error){
                    console.log(error)
                } 
            }
            return session
        }

        if(item){
            const itemChecked = checkAccessTokenValidation(item)
            itemChecked.then((el) => {
                setUserSession(el)
            }).catch((err) => {
                console.error(`Errore nella promise : ${err.message}`)
            })
        }

    }, [])

    const setUserSession = (data: Session) => {
        setItem(data)
        setSession(data)
    }

    const logoutUser = () => {
        removeItem()
        setSession(undefined)
    }

    const getSession = (): Session | undefined => {
        return getItem()
    }

    return { session, setUserSession, logoutUser, getSession }
 }