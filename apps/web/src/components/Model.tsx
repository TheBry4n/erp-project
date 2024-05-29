"use client"
import React, { useState } from "react"
import { Button } from "./ui/button"
import { CarrelItemType, Product, Session } from "../types"
import Link from "next/link"

interface ModalProps {
    product: Product,
    onClose: () => void,
    session: Session | undefined,
    onAdd: (item: CarrelItemType, maxQuantity: number) => void
}

export function Model({ product, onClose, session, onAdd }:ModalProps) {
  const img = `data:image/jpeg;base64,${Buffer.from(product.immagine).toString("base64")}`;
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < product.quantita) {
      setQuantity(quantity + 1);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
        <img src={img} alt={`${product.marca} ${product.modello}`} className="w-full h-64 object-cover rounded-t-lg" />
        <h2 className="text-xl text-gray-700 font-bold mt-2">{product.marca} {product.modello}</h2>
        <p className="text-gray-700 mt-1">{product.descrizione}</p>
        <p className="text-green-600 font-bold mt-2">${product.prezzoUnitario.toFixed(2)}</p>
        <p className="text-gray-600 mt-1">Quantità: {product.quantita}</p>
        <div className="flex items-center mt-4">
          <button 
            onClick={handleDecrement}
            disabled={quantity === 1}
            className={`px-4 py-2 mr-1 rounded ${quantity === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-400'}`}
          >
            -
          </button>
          <p
            className="w-12 text-center border border-gray-200 text-black"
          >{quantity}</p>
          <button 
            onClick={handleIncrement}
            disabled={quantity === product.quantita}
            className={`px-4 py-2 ml-1 rounded ${quantity === product.quantita ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-400'}`}
          >
            +
          </button>
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={onClose} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg mr-2 hover:bg-gray-300">Indietro</Button>
          {!session ? (
            <Link href="login">
              <Button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400" >Accedi</Button>
            </Link>
          ) : (
            <Button onClick={() => onAdd({id: product.scarpaId, quantity: quantity}, product.quantita)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400">Aggiungi al carrello</Button>
          )}
        </div>
      </div>
    </div>
  );
}