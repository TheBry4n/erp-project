"use client"
import React, { useEffect, useState } from "react"
import { CardDetailsForm, CartItem, SideBar, WithProtection } from "@web/src/components"
import { CarrelItemType, Product, withProtectionProps } from "@web/src/types"
import { useSession } from "@web/src/hooks";
import Cookies from "js-cookie";
import { Button } from "@web/src/components/ui/button";
import { ToastContainer } from "react-toastify";
import Modal from "react-modal"
import 'react-toastify/dist/ReactToastify.css';
import { SuccessToast, ErrorToast } from "@web/src/utils";



export default function Carrello() {
    const [products, setProducts] = useState<Product[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const {session, getSession, setUserSession: setSession } = useSession();

    useEffect(()=>{
        const newSession = getSession();
        if(!session && newSession){
          setSession(newSession)
        }
    },[session])

    useEffect(() => {
        const fetchCartItems = async () =>{
            const cartString = Cookies.get("carrello")
            let cart: CarrelItemType[] = []
            if(cartString){
                cart = JSON.parse(cartString) as CarrelItemType[]
            }else{
                return null;
            }
            const body: string[] = []
            cart.forEach((item) => {
                body.push(item.id)
            })
            try{
                fetch("http://localhost:3001/products/getCartItems", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ids:body})
                })
                .then(res => {
                    if(!res.ok) throw new Error("Errore nel fetch dei dati")
                        return res.json()
                })
                .then(data => {
                    setProducts(data.products)
                })
            }catch(err){
                throw new Error(`${err}`)
            }  
        }

        fetchCartItems()
    }, [])


    const handleRemove = (id: string) => {
        try{
            const cartString = Cookies.get("carrello")
            let cart: CarrelItemType[] = []
            if(cartString) cart = JSON.parse(cartString) as CarrelItemType[]
            const updatedCart = cart.filter(item => item.id !== id);
            Cookies.set("carrello", JSON.stringify(updatedCart), {expires: 7})
            setProducts(products.filter(item => item.scarpaId !== id))
            SuccessToast({ title: "Rimozione avvenuta con successo", expiredTime: 3000 })
        }catch(err){
            ErrorToast({ title: "Errore nella rimozione", expiredTime: 3000 })
            throw new Error("errore nella rimozione")
        }
    }

    const handleUpdate = (id: string, quantity: number) => {
        try {
            const cartString = Cookies.get("carrello");
            let cart: CarrelItemType[] = [];
    
            if (cartString) cart = JSON.parse(cartString) as CarrelItemType[];
    
            const updatedCart = cart.map(item => {
                if (item.id === id) {
                    const quantity2 = Math.max(1, Math.min(quantity, item.quantity));
                    return { ...item, quantity2 };
                }
                return item;
            });
    
            Cookies.set("carrello", JSON.stringify(updatedCart), { expires: 7 });
            SuccessToast({ title: "Quantita aggiornata con successo", expiredTime: 3000 })
        } catch (err) {
            ErrorToast({ title: "Errore nell'aggiornamento della quantità del prodotto", expiredTime: 3000 })
            throw new Error("Errore nell'aggiornamento della quantità del prodotto");
        }
    }

    const getItemQuantity = (id: string) => {
        try {
            const cartString = Cookies.get("carrello");
            let cart: CarrelItemType[] = [];
    
            if (cartString) cart = JSON.parse(cartString) as CarrelItemType[];
    
            const item = cart.find(item => item.id === id);
    
            return item ? item.quantity : 0;
        } catch (err) {
            ErrorToast({ title: "Errore nel recupero della quantità del prodotto", expiredTime: 5000 })
            throw new Error();
        }
    }

    const calculateTotal = () => {
        return products.reduce((total, product) => {
            const quantity = getItemQuantity(product.scarpaId);
            return total + (product.prezzoUnitario * quantity);
        }, 0);
    };

    const total = calculateTotal();
    const routeProps: withProtectionProps = {sessionRequired: true}

    const handleCheckout = () => {
        setShowModal(true);
    };
    
    const handleClose = () => {
        setShowModal(false)
    }

    const handleOrder = async (cardDetails: any) => {
        try {
            const res = await fetch("http://localhost:3001/products/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    cart: products.map((product) => ({
                        id: product.scarpaId,
                        quantita: getItemQuantity(product.scarpaId),
                    }))
                }),
            });
            if (!res.ok) throw new Error("Errore durante l'invio dell'ordine");
            Cookies.set("carrello", JSON.stringify([]));
            setProducts([]);
            SuccessToast({ title: "Ordine effettuato con successo!", expiredTime: 5000 })
            setShowModal(false);
        } catch (err) {
            console.error(err);
            ErrorToast({ title: "Errore durante l'invio dell'ordine", expiredTime: 5000 })
        }

        handleClose()
    };

    return(
        <WithProtection {...routeProps}>
            <div className="flex" >
                <SideBar />
                <main className="ml-[300px] flex-1"> 
                    <section className="flex flex-col items-center justify-center mt-4 text-3xl font-bold" >
                        <h1>
                            {`Carrello di ${session?.userInfo.nome}`}
                        </h1>
                    </section>
                    <div className="flex flex-col items-center flex-wrap justify-center mt-8">
                        {!products.length ? (
                            <h3>Nessun oggetto nel carrello</h3>
                        ) : (
                            <>
                                {products.map(product => (
                                    <CartItem key={product.scarpaId} product={product} quantity={getItemQuantity(product.scarpaId)} onRemove={handleRemove} onUpdate={handleUpdate}/>
                                ))}
                                <div className="mt-4 text-2xl font-semibold">
                                    Totale: €{total.toFixed(2)}
                                </div>
                                <Button onClick={handleCheckout} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                                    Vai alla cassa
                                </Button>
                            </>
                        )}
                        <Modal isOpen={showModal}
                            onRequestClose={() => setShowModal(false)}
                            contentLabel="Inserisci i dettagli della carta"
                            className="fixed inset-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-500 rounded-lg p-6 max-w-md w-full"
                            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
                        >
                            <CardDetailsForm onOrder={handleOrder} onClose={handleClose} />
                        </Modal>
                    </div>
                </main>
            </div>
            <ToastContainer/>
        </WithProtection>
    )
}