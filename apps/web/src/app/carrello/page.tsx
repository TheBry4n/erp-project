"use client"
import React, { useEffect, useState } from "react"
import { CartItem, SideBar, WithProtection } from "@web/src/components"
import { CarrelItemType, Product, withProtectionProps } from "@web/src/types"
import { useSession } from "@web/src/hooks";
import Cookies from "js-cookie";



export default function Carrello() {
    const [products, setProducts] = useState<Product[]>([]);
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
        }catch(err){
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
        } catch (err) {
            throw new Error("Errore nell'aggiornamento della quantità del prodotto");
        }
    }

    const getItemQuantity = (id: string) => {
        try {
            const cartString = Cookies.get("carrello");
            let cart: CarrelItemType[] = [];
    
            if (cartString) cart = JSON.parse(cartString) as CarrelItemType[];
    
            // Trova l'elemento nel carrello con l'id corrispondente
            const item = cart.find(item => item.id === id);
    
            // Se l'elemento è presente nel carrello, restituisci la sua quantità, altrimenti restituisci 0
            return item ? item.quantity : 0;
        } catch (err) {
            throw new Error("Errore nel recupero della quantità del prodotto");
        }
    }


    const routeProps: withProtectionProps = {sessionRequired: true}
    return(
        <WithProtection {...routeProps}>
            <div className="flex" >
                <SideBar />
                <main className="ml-[300px] flex-1"> 
                    <section className="flex flex-col items-center justify-center mt-4 text-3xl font-bold" >
                        <h1>
                            {`Carrello di ${session?.userInfo.nome}`} a
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
                            </>
                        )}
                    </div>
                </main>
            </div>
        </WithProtection>
    )
}