"use client"
import React from "react"
import Modal from "react-modal"
import { User } from "../types"

interface ModalUserProps {
    isOpen: boolean
    onReqClose: () => void
    onFire: () => void
    onHire: () => void
    role: string | undefined
    user: User | null
}

export function ModalUser({ isOpen, onReqClose, onFire, role, user, onHire }: ModalUserProps) {
    if (!user || !role) return null;

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onReqClose}
            contentLabel="User Details"
            className="modal bg-white text-black p-4 rounded-lg border shadow-lg"
            overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            appElement={typeof document !== 'undefined' ? document.getElementById('__next') || undefined : undefined}
        >
            <h2 className="text-lg font-semibold mb-4">User Details</h2>
            <div className="mb-2">
                <strong>ID:</strong> {user.userId}
            </div>
            <div className="mb-2">
                <strong>Nome:</strong> {user.nome}
            </div>
            <div className="mb-2">
                <strong>Cognome:</strong> {user.cognome}
            </div>
            <div className="mb-2">
                <strong>Email:</strong> {user.email}
            </div>
            <div className="mb-2">
                <strong>Ruolo:</strong> {user.ruolo}
            </div>
            {role === "MANAGER" && user.ruolo === "ADMIN" && (
                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 mr-4"
                    onClick={onFire}
                >
                    Licenzia Utente
                </button>
            )}
            {role === "MANAGER" && user.ruolo === "UTENTE" && user.isCandidato && (
                <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 mr-4"
                onClick={onHire}
            >
                Assumi
            </button>
            )}
            <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
                onClick={onReqClose}
            >
                Annulla
            </button>
        </Modal>
    )
}