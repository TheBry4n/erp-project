"use client"
import { SideBar, WithProtection } from "@web/src/components"
import { useSession } from "@web/src/hooks"
import { withProtectionProps } from "@web/src/types"
import React, { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Modal from "react-modal"

export default function AccountSettings() {
    const routeProps: withProtectionProps = { sessionRequired: true }
    const {session, getSession, setUserSession: setSession } = useSession();
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState('')
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)

    useEffect(()=>{
      const newSession = getSession();
      if(!session && newSession){
        setSession(newSession)
      }
    },[session])

    const handleUpdateEmail = async () => {
        if(session){
            console.log(email)
            if (email === session.userInfo.email) {
                toast.info('No changes to update for email', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                return
            }
    
            try {
                const response = await fetch(`http://localhost:3001/user/update?type=email&email=${session.userInfo.email}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email })
                })
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                toast.success('Email updated successfully', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                session.userInfo.email = email
                setSession(session)
                setIsEmailModalOpen(false)
            } catch (error) {
                console.error('There was an error updating the email!', error)
                toast.error('Error updating email', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }
        }
    }

    const handleUpdatePassword = async () => {
        if (!password) {
            toast.info('Please enter a new password', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            return
        }

        try {
            if(session){
                const response = await fetch(`http://localhost:3001/user/update?type=password&email=${session.userInfo.email}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ password })
                })
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                toast.success('Password updated successfully', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                setIsPasswordModalOpen(false)
            }
        } catch (error) {
            console.error('There was an error updating the password!', error)
            toast.error('Error updating password', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
    }


    return(
        <WithProtection {...routeProps} id="__next">
            <div className="flex">
                <SideBar />
                <main className="ml-[300px] flex-1 p-4">
                    {session ? (
                        <>
                            <ToastContainer />
                            <div className="flex justify-center text-center mt-4">
                                <h1 className="text-xl font-bold">Settings</h1>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-16">
                                <div className="p-4 border rounded shadow">
                                    <h2 className="text-lg font-semibold">First Name</h2>
                                    <p>{session.userInfo.nome}</p>
                                </div>
                                <div className="p-4 border rounded shadow">
                                    <h2 className="text-lg font-semibold">Last Name</h2>
                                    <p>{session.userInfo.cognome}</p>
                                </div>
                                <div className="p-4 border rounded shadow relative">
                                    <h2 className="text-lg font-semibold">Email</h2>
                                    <p>{session.userInfo.email}</p>
                                    <button
                                        className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                                        onClick={() => setIsEmailModalOpen(true)}
                                    >
                                        Update
                                    </button>
                                </div>
                                <div className="p-4 border rounded shadow relative">
                                    <h2 className="text-lg font-semibold">Password</h2>
                                    <p>*********</p>
                                    <button
                                        className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                                        onClick={() => setIsPasswordModalOpen(true)}
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>

                            {/* Email Update Modal */}
                            <Modal
                                isOpen={isEmailModalOpen}
                                onRequestClose={() => setIsEmailModalOpen(false)}
                                contentLabel="Update Email"
                                className="modal bg-white text-black p-4 rounded-lg border shadow-lg"
                                overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                                appElement={typeof document !== 'undefined' ? document.getElementById('__next') || undefined : undefined}
                            >
                                <h2 className="text-lg font-semibold mb-4">Update Email</h2>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-4"
                                    id="new-email"
                                    type="email"
                                    placeholder="Enter new email"
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
                                    onClick={handleUpdateEmail}
                                >
                                    Update Email
                                </button>
                            </Modal>

                            {/* Password Update Modal */}
                            <Modal
                                isOpen={isPasswordModalOpen}
                                onRequestClose={() => setIsPasswordModalOpen(false)}
                                contentLabel="Update Password"
                                className="modal bg-white text-black p-4 rounded-lg border shadow-lg"
                                overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                                appElement={typeof document !== 'undefined' ? document.getElementById('__next') || undefined : undefined}
                            >
                                <h2 className="text-lg font-semibold mb-4">Update Password</h2>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-4"
                                    id="new-password"
                                    type="password"
                                    placeholder="Enter new password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
                                    onClick={handleUpdatePassword}
                                >
                                    Update Password
                                </button>
                            </Modal>
                        </>
                    ): (
                        <div className="flex flex-wrap justify-center mt-8">
                            <h3>Loading...</h3>
                        </div>
                    )}
                </main>
            </div>
        </WithProtection>
    )
}