"use client"
import React from "react"
import { Button } from "./ui/button"
import { Product } from "../types"

interface ModalProps {
    product: Product,
    onClose: () => void
}

export function Modal({ product, onClose }:ModalProps) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <img src={product.urlImg} alt={product.nome} className="w-full h-48 object-cover rounded-t-lg" />
        <h2 className="text-2xl font-bold mt-2">{product.nome}</h2>
        <p className="text-gray-700 mt-1">{product.descrzione}</p>
        <p className="text-green-600 font-bold mt-2">${product.prezzo.toFixed(2)}</p>
        <div className="mt-4 flex justify-between">
          <Button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={() => alert('Aggiunto al carrello')}>
            Aggiungi al carrello
          </Button>
          <Button className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400" onClick={onClose}>
            Indietro
          </Button>
        </div>
      </div>
    </div>
    )
}