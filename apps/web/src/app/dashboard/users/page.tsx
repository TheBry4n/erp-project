"use client"
import { ModalUser, SideBar, WithProtection } from "@web/src/components"
import { useSession } from "@web/src/hooks"
import { User, withProtectionProps } from "@web/src/types"
import React, { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


export default function UsersPage() {
    const routeProps: withProtectionProps = {sessionRequired: true, accessRole: ["ADMIN", "MANAGER"]}
    const [users, setUsers] = useState<User[]>([])
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const {session, getSession, setUserSession: setSession } = useSession();

    useEffect(()=>{
        const newSession = getSession();
        if(!session && newSession){
          setSession(newSession)
        }
      },[session])

    const TableHeaderCell = ({ children }: any) => (
        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
            {children}
        </th>
    );

    const TableCell = ({ children }: any) => (
        <td className="px-6 py-4 text-center align-middle">
            {children}
        </td>
    );

    useEffect(() => {
        const fetchUsers = async () => {
            try{
                const res = await fetch("http://localhost:3001/user",{
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                if(!res.ok) throw new Error("Errore nella risposta");

                const data = await res.json()

                setUsers(data.users)
            }catch(err) {
                throw new Error("Errore nel fetch")
            }
        }

        fetchUsers()
    },[])

    const handleOpenModal = (user: User) => {
        setSelectedUser(user)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setSelectedUser(null)
        setIsModalOpen(false)
    }

    const handleFireUser = async () => {
        if (!selectedUser) return

        try {
            const res = await fetch(`http://localhost:3001/user/fire?id=${selectedUser.userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (!res.ok) throw new Error("Errore nell'aggiornamento del ruolo");
            else{
                const updatedUsers = users.map(user =>
                    user.userId === selectedUser.userId ? { ...user, ruolo: "UTENTE" } : user
                )
    
                setUsers(updatedUsers)
                toast.success("Utente licenziato con successo", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }


        } catch (err) {
            console.error("Errore nel licenziamento dell'utente", err)
            toast.error("Errore nell'aggiornamento del ruolo", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }

        handleCloseModal()
    }

    const handleHireUser = async () => {
        if (!selectedUser) return

        try {
            const res = await fetch(`http://localhost:3001/user/hire?id=${selectedUser.userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (!res.ok) throw new Error("Errore nell'assunzione");
            else{
                const updatedUsers = users.map(user =>
                    user.userId === selectedUser.userId ? { ...user, ruolo: "ADMIN" } : user
                )
    
                setUsers(updatedUsers)
                toast.success("Utente assunto con successo", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }


        } catch (err) {
            console.error("Errore nell'assunzione dell'utente", err)
            toast.error("Errore nell'aggiornamento del ruolo", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }

        handleCloseModal()
    }

    return (
        <WithProtection {...routeProps}>
            <div className="flex">
                <SideBar />
                <main className="ml-[300px] flex-1">
                    <div className="flex justify-center text-center mt-4">
                        <h1 className="text-xl font-bold">Utenti</h1>
                    </div>
                    <div className="mt-4">
                        {users.length === 0 ? (
                            <p>Nessun utente disponibile.</p>
                        ) : (
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <TableHeaderCell>ID</TableHeaderCell>
                                        <TableHeaderCell>Nome</TableHeaderCell>
                                        <TableHeaderCell>Cognome</TableHeaderCell>
                                        <TableHeaderCell>Email</TableHeaderCell>
                                        <TableHeaderCell>Ruolo</TableHeaderCell>
                                        <TableHeaderCell>Azioni</TableHeaderCell>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                        <tr key={user.userId}>
                                            <TableCell>{user.userId}</TableCell>
                                            <TableCell>{user.nome}</TableCell>
                                            <TableCell>{user.cognome}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.ruolo}</TableCell>
                                            <TableCell>
                                                <button
                                                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                                                    onClick={() => handleOpenModal(user)}
                                                >
                                                    Visualizza
                                                </button>
                                            </TableCell>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </main>
            </div>
            <ModalUser
                isOpen={isModalOpen}
                onReqClose={handleCloseModal}
                onFire={handleFireUser}
                role={session?.userInfo.role}
                user={selectedUser}
                onHire={handleHireUser}
            />
            <ToastContainer />
        </WithProtection>
    )
}