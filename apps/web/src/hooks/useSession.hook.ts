import { useEffect, useLayoutEffect, useState } from "react"
import { Session } from "../types";
import { redirect, usePathname } from "next/navigation";
import { useLocalStorage } from "./useLocalStorage.hook";

 export const useSession = () => {
    const [ session, setSession ] = useState<undefined | Session>(undefined);
    const { getItem, setItem, removeItem } = useLocalStorage("__session")
    const pathName = usePathname()

    useLayoutEffect(() => {
        const item = getItem()
        if(item) setSession(item)
    }, [])

    return session
 }