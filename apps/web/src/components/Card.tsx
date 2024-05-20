"use client"
import React from "react";
import { Product } from "../types";

type CardProps = {
    product: Product,
    onClick: (product: Product) => void
}

export function Card({ product, onClick }: CardProps){
    return (
        <div onClick={() => onClick(product)} className="border rounded-lg shadow-md p-4 m-4 w-64">
            <img src={product.urlImg} alt={product.nome} className="w-full h-32 object-cover rounded-t-lg" />
            <h2 className="text-xl font-bold mt-2">{product.nome}</h2>
            <p className="text-gray-700 mt-1">{product.descrzione}</p>
            <p className="text-green-600 font-bold mt-2">${product.prezzo.toFixed(2)}</p>
        </div>
    )
}