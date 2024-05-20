"use client"
import React from "react"
import { SideBar, WithProtection } from "../../components"
import { withProtectionProps } from "../../types"
import { useSession } from "@web/src/hooks"

export default function dashboard() {
    const { session } = useSession();

    const routeProps: withProtectionProps = {sessionRequired: true, accessRole: ["ADMIN", "MANAGER"]}

    return (
        <WithProtection {...routeProps} >
          <div className="flex" >
            <SideBar />
            <main className="ml-[300px] flex-1"> 
              <h1>Bentornato {session?.userInfo.nome}</h1>
            </main>
          </div>
        </WithProtection>
    )
}