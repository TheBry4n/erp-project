"use client"
import React from "react"
import { Button } from "./ui/button"
import { Product } from "../types"

interface ModalProps {
    product: Product,
    onClose: () => void
}

export function Model({ product, onClose }:ModalProps) {
  const img = `data:image/jpeg;base64,${Buffer.from(product.immagine).toString("base64")}`;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
        <img src={img} alt={`${product.marca} ${product.modello}`} className="w-full h-64 object-cover rounded-t-lg" />
        <h2 className="text-xl font-bold mt-2">{product.marca} {product.modello}</h2>
        <p className="text-gray-700 mt-1">{product.descrizione}</p>
        <p className="text-green-600 font-bold mt-2">${product.prezzoUnitario.toFixed(2)}</p>
        <div className="flex justify-end mt-4">
          <Button onClick={onClose} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg mr-2">Indietro</Button>
          <Button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Aggiungi al carrello</Button>
        </div>
      </div>
    </div>
  );
}