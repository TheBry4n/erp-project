"use client"
import React from "react"
import Link from "next/link"

export function NavBar() {
    return (
        <nav className="flex justify-between items-center py-8 px-8 bg-gray-80 text-white" >
            <Link href="/" >
                <h1 className="text-3xl font-bold">Scarpe&co</h1>
            </Link>
        </nav>
    )
}