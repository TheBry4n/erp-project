"use client"
import { SideBar, WithProtection } from "@web/src/components"
import { useSession } from "@web/src/hooks"
import { withProtectionProps } from "@web/src/types"
import React, { useEffect, useLayoutEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { homePageRedirect } from "../../actions"

export default function CandidaturaPage() {
    const routeProps: withProtectionProps = { sessionRequired: true }
    const {session, getSession, setUserSession: setSession } = useSession();
    const [isCandidate, setIsCandidate] = useState(false);
    const [canSubmit, setCanSubmit] = useState(false);

    useEffect(()=>{
        const newSession = getSession();
        if(!session && newSession){
        setSession(newSession)
        }

        const checkIfCandidate = async () => {
            
            try {
                const res = await fetch(`http://localhost:3001/user/controlloCandidatura?email=${session?.userInfo.email}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!res.ok) throw new Error('Errore nel fetch dei dati');

                const data = await res.json();
                setIsCandidate(data.isCandidate);
            } catch (err) {
                console.error("Errore nel fetch dei dati del candidato", err);
                toast.error("Errore nel fetch dei dati del candidato");
            }
        };

        if(newSession){
            checkIfCandidate();
            console.log(isCandidate)
        }
    },[session, getSession, setSession])

    // useLayoutEffect(() => {
    //     const checkIfCandidate = async () => {

    //         try {
    //             const res = await fetch(`http://localhost:3001/user/controlloCandidatura?email=${session?.userInfo.email}`, {
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 }
    //             });

    //             if (!res.ok) throw new Error('Errore nel fetch dei dati');

    //             const data = await res.json();
    //             setIsCandidate(data.isCandidate);
    //         } catch (err) {
    //             console.error("Errore nel fetch dei dati del candidato", err);
    //             toast.error("Errore nel fetch dei dati del candidato");
    //         }
    //     };

    //     checkIfCandidate();
    //     console.log(isCandidate)
    // }, [session]);

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCanSubmit(e.target.checked);
    };

    const handleSubmit = async () => {
        if (!session) return;

        try {
            const res = await fetch('http://localhost:3001/user/candidatura', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: session.userInfo.email })
            });

            if (!res.ok) throw new Error('Errore nell\'invio della candidatura');

            toast.success("Candidatura inviata con successo!");
            homePageRedirect()
        } catch (err) {
            console.error("Errore nell'invio della candidatura", err);
            toast.error("Errore nell'invio della candidatura");
        }
    };

    return(
        <WithProtection {...routeProps}>
            <div className="flex">
                <SideBar />
                <main className="ml-[300px] flex-1 p-4">
                    {session?.userInfo.role === "ADMIN" || session?.userInfo.role === "MANAGER" ? (
                        <div className="mt-12 flex flex-col justify-center items-center">
                            <h2 className="text-xl font-bold">Non puoi candidarti</h2>
                            <p>Sei già parte del team e non puoi candidarti.</p>
                        </div>
                    ) : isCandidate ? (
                        <div className="mt-12 flex flex-col justify-center items-center">
                            <h2 className="text-xl font-bold">Sei già candidato</h2>
                            <p>Hai già inviato una candidatura.</p>
                        </div>
                    ) : (
                        <div className="mt-12 flex flex-col justify-center items-center">
                            <h2 className="text-xl font-bold mb-8">Regole e responsabilità</h2>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit dignissimos laudantium dolore mollitia aperiam quos libero perferendis, est asperiores, ullam ea eius, iure consequatur eligendi tempora? Enim omnis dolor ducimus.</p>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis quasi iusto laborum qui? Eaque, hic! Maiores cupiditate officiis, ipsam aperiam magni autem laboriosam. Deserunt, voluptate aut tenetur explicabo quod atque!</p>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit dignissimos laudantium dolore mollitia aperiam quos libero perferendis, est asperiores, ullam ea eius, iure consequatur eligendi tempora? Enim omnis dolor ducimus.</p>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis quasi iusto laborum qui? Eaque, hic! Maiores cupiditate officiis, ipsam aperiam magni autem laboriosam. Deserunt, voluptate aut tenetur explicabo quod atque!</p>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit dignissimos laudantium dolore mollitia aperiam quos libero perferendis, est asperiores, ullam ea eius, iure consequatur eligendi tempora? Enim omnis dolor ducimus.</p>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis quasi iusto laborum qui? Eaque, hic! Maiores cupiditate officiis, ipsam aperiam magni autem laboriosam. Deserunt, voluptate aut tenetur explicabo quod atque!</p>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit dignissimos laudantium dolore mollitia aperiam quos libero perferendis, est asperiores, ullam ea eius, iure consequatur eligendi tempora? Enim omnis dolor ducimus.</p>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis quasi iusto laborum qui? Eaque, hic! Maiores cupiditate officiis, ipsam aperiam magni autem laboriosam. Deserunt, voluptate aut tenetur explicabo quod atque!</p>
                            
                            <div className="mt-8">
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox"
                                        onChange={handleCheckboxChange}
                                    />
                                    <span className="ml-2">Accetto le regole e responsabilità</span>
                                </label>
                            </div>
                            <div className="mt-4">
                                <button
                                    className={`bg-blue-500 text-white px-4 py-2 rounded ${canSubmit ? 'hover:bg-blue-700' : 'opacity-50 cursor-not-allowed'}`}
                                    onClick={handleSubmit}
                                    disabled={!canSubmit}
                                >
                                    Invia candidatura
                                </button>
                            </div>
                        </div>
                    )}
                </main>
            </div>
            <ToastContainer />
        </WithProtection>
    )
}