"use client"
import { LucideIcon } from "lucide-react"
import React from "react"

interface CardDashboardProps {
    title: string,
    icon: LucideIcon,
    value: string | number
}

export function CardDashboard({ title, icon: Icon, value }: CardDashboardProps) {
    return(
        <div className=" bg-gray-600 rounded-lg shadow-md p-4 h-48 flex flex-col items-center justify-center">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-4"> <Icon size={48} /> </div> {/* Aggiunta corretta dell'icona */}
            <div>
              <h2 className="text-lg font-bold">{title}</h2>
              <p className="text-black">Numero: {value}</p>
            </div>
          </div>
        </div>
      </div>
    );
}