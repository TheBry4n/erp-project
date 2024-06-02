import React, { useState } from "react";

interface CardDetailsFormProps {
    onOrder: (cardDetails: any) => void;
    onClose: () => void
}

export function CardDetailsForm({ onOrder, onClose }: CardDetailsFormProps) {
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [securityCode, setSecurityCode] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const cardDetails = {
            cardNumber,
            expiryDate,
            securityCode,
        };
        onOrder(cardDetails);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-gray-500 p-8 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Inserisci i dettagli della carta</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Numero della carta"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:border-blue-500 text-black"
                    required
                />
                <input
                    type="text"
                    placeholder="Data di scadenza (MM/AA)"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:border-blue-500 text-black"
                    required
                />
                <input
                    type="text"
                    placeholder="Codice di sicurezza"
                    value={securityCode}
                    onChange={(e) => setSecurityCode(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:border-blue-500 text-black"
                    required
                />
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2"
                    >
                        Conferma ordine
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 border rounded text-black hover:bg-gray-100"
                    >
                        Annulla
                    </button>
                </div>
            </form>
        </div>
    </div>
    );
}