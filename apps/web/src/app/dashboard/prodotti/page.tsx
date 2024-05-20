import React from "react"
import { SideBar, WithProtection } from "@web/src/components"
import { withProtectionProps } from "@web/src/types"

const prodotti = () => {

    const routeProps: withProtectionProps = {sessionRequired: true, accessRole: ["ADMIN", "MANAGER"]}

    return (
        <WithProtection {...routeProps}>
            <div className="flex" >
                <SideBar />
                <main className="ml-[300px] flex-1"> 
                    <h1>prodotti</h1>  
                </main>
            </div>
        </WithProtection>
    )
}

export default prodotti