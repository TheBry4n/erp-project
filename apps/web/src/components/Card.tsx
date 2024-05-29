"use client"
import React from "react";
import { Product } from "../types";
import { cn } from "../lib/utils";

interface CardProps{
    product: Product,
    onClick: (product: Product) => void,
    className? : string
}

export function Card({ product, onClick, className }: CardProps){

    const img = `data:image/jpeg;base64,${Buffer.from(product.immagine).toString("base64")}`;

    return (
        <div onClick={() => onClick(product)} className={cn("border rounded-lg shadow-md p-4 m-4 w-64 cursor-pointer hover:shadow-lg transition-shadow", className)}>
          <img src={img} alt={`${product.marca} ${product.modello}`} className="w-full h-32 object-cover rounded-t-lg" />
          <h2 className="text-xl font-bold mt-2">{product.marca} {product.modello}</h2>
          <p className="text-gray-700 mt-1">{product.descrizione}</p>
          <p className="text-green-600 font-bold mt-2">${product.prezzoUnitario.toFixed(2)}</p>
          <p className="text-gray-600 mt-1">Quantità: {product.quantita}</p>
        </div>
      );
}