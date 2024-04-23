"use client"
import React from "react";
import { Button } from "./ui/button";

type CardProps = {
    title: string,
    descrption: string,
    buttonText: string,
    onClick: () => void
}

export function Card({ title, descrption, buttonText, onClick }: CardProps){
    return (
        <div className=" bg-slate-600 shadow-md rounded-lg p-6 m-4 max-w-md" >
            <h2 className="text-2xl font-semibold mb-2" >{title}</h2>
            <p className=" text-black font-semibold mb-4">{descrption}</p>
            <Button onClick={() => onClick()} className="hover:bg-slate-300 text-black font-bold py-2 px-4 rounded" >{buttonText}</Button>
        </div>
    )
}