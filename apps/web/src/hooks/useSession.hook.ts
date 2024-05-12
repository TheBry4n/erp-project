import { useEffect, useLayoutEffect, useState } from "react"
import { Session } from "../types";
import { useLocalStorage } from "./useLocalStorage.hook";

 export const useSession = () => {
    const [ session, setSession ] = useState<undefined | Session>(undefined);
    const { getItem, setItem, removeItem } = useLocalStorage("__session")

    useLayoutEffect(() => {
        const item = getItem()
        if(item) setSession(item)
    }, [])

    const setUserSession = (data: Session) => {
        setItem(data)
        setSession(data)
    }

    const logoutUser = () => {
        removeItem()
        setSession(undefined)
    }

    return { session, setUserSession, logoutUser }
 }