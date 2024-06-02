"use client"
import React, { useEffect, useState } from "react"
import { CardDashboard, SideBar, WithProtection } from "../../components"
import { ElCount, withProtectionProps } from "../../types"
import { useLocalStorage, useSession } from "@web/src/hooks"
import { PackageSearch, UserIcon } from "lucide-react"
import Link from "next/link"

export default function dashboard() {
    const routeProps: withProtectionProps = {sessionRequired: true, accessRole: ["ADMIN", "MANAGER"]}
    const {session, getSession, setUserSession: setSession } = useSession();
    const [info, setInfo] = useState<null | ElCount>(null)

    useEffect(()=>{
      const newSession = getSession();
      if(!session && newSession){
        setSession(newSession)
      }
    },[session])

    useEffect(() => {
      const fetchInfo = async () => {
        try{
          const res = await fetch("http://localhost:3001/api/info", {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          })

          if(!res.ok) throw new Error("Errore nel fetch");

          const data = await res.json()

          setInfo(data.info)
        }catch(err){
          console.log(err)
        }
      }

      fetchInfo()
    },[])

    return (
      <WithProtection {...routeProps}>
        <div className="flex">
          <SideBar />
          <main className="ml-[300px] flex-1">
            <div className="flex justify-center items-center mt-7">
              <h1 className="capitalize md:uppercase text-3xl">
                Bentornato {session?.userInfo.nome}
              </h1>
            </div>
            {info ? (
              <div className="grid grid-cols-2 justify-center items-center gap-4 mt-8 mr-4">
                <Link href="/dashboard/users" >
                  <CardDashboard
                    title="Utenti"
                    icon={UserIcon}
                    value={info.numUser}
                  />
                </Link>
                <Link href="/dashboard/users" >
                  <CardDashboard
                    title="Admin"
                    icon={UserIcon}
                    value={info.numAdmin}
                  />
                </Link>
                <Link href="/dashboard/prodotti" >
                  <CardDashboard
                    title="Prodotti"
                    icon={PackageSearch}
                    value={info.numProd}
                  />
                </Link>
                <Link href="/dashboard/users" >
                  <CardDashboard
                    title="Candidati"
                    icon={UserIcon}
                    value={info.numCandidati}
                  />
                </Link>
              </div>
            ): (
              <div className="flex justify-center items-center mt-96" >
                <h1>Loading...</h1>
              </div>
            )}
          </main>
        </div>
      </WithProtection>
    );
}