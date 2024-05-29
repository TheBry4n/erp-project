"use client"
import React, { useState } from "react"
import { Product } from "../types"

interface CartItemProps {
    product: Product,
    quantity: number,
    onRemove: (id: string) => void | Error,
    onUpdate: (id: string, newQuantity: number) => void | Error
}

export function CartItem({ product, quantity, onRemove, onUpdate }: CartItemProps){

    const img = `data:image/jpeg;base64,${Buffer.from(product.immagine).toString("base64")}`;
    const [currentQuantity, setCurrentQuantity] = useState(quantity);

    const handleIncrement = () => {
        if (currentQuantity < product.quantita) {
            setCurrentQuantity(currentQuantity + 1);
            onUpdate(product.scarpaId, currentQuantity + 1);
        }
    };

    const handleDecrement = () => {
        if (currentQuantity > 1) {
            setCurrentQuantity(currentQuantity - 1);
            onUpdate(product.scarpaId, currentQuantity - 1);
        }
    };

    return (
        <div className="flex items-center border-b border-gray-200 py-4">
            <img src={img} alt={`${product.marca} ${product.modello}`} className="w-20 h-20 object-cover rounded-lg mr-4" />
            <div>
                <h2 className="text-xl font-bold">{product.marca} {product.modello}</h2>
                <p className="text-gray-700">{product.descrizione}</p>
                <p className="text-green-600 font-bold mt-1">${product.prezzoUnitario.toFixed(2)}</p>
                <div className="flex items-center mt-1">
                    <button onClick={handleDecrement} className="text-gray-500 px-2 py-1 border rounded-l hover:bg-gray-100">-</button>
                    <p className="text-gray-600 px-2">{currentQuantity}</p>
                    <button onClick={handleIncrement} className="text-gray-500 px-2 py-1 border rounded-r hover:bg-gray-100">+</button>
                </div>
                <button onClick={() => onRemove(product.scarpaId)} className="text-red-600 mt-2">Rimuovi</button>
            </div>
        </div>
    );
}