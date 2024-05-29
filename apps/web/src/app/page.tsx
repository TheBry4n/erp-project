"use client"
import React, { useEffect, useState } from "react";
import { Card, Model, SideBar, WithProtection } from "../components";
import { CarrelItemType, withProtectionProps, Product } from "../types";
import { useSession } from "../hooks";
import Cookies from "js-cookie";

export default function HomePage() {
  const routeProps: withProtectionProps = {asPublicRoute: true, sessionRequired: false};
  const {session, getSession, setUserSession: setSession } = useSession();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(()=>{
    const newSession = getSession();
    if(!session && newSession){
      setSession(newSession)
    }
  },[session])

  useEffect(() => {
    const fetchProducts = async () =>{
      try{
        const response = await fetch("http://localhost:3001/products/",{
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
        const text = await response.text();
        if (!text) {
          throw new Error('La risposta è vuota');
        }
        const data = JSON.parse(text);
        setProducts(data.products);
      }catch(err){
        console.error(err)
      }
    }

    fetchProducts()

  },[session])

  const handleCarrello = (item: CarrelItemType, maxQuantity: number) => {
    try{
      let carrello: CarrelItemType[] = []
      const carrelloString = Cookies.get("carrello");
      if(carrelloString) {
        carrello = JSON.parse(carrelloString) as CarrelItemType[]
      }
      const existingItemIndex = carrello.findIndex(cartItem => cartItem.id === item.id);
    
      if (existingItemIndex !== -1) {
        // Se l'elemento esiste, aggiorna la quantità
        const newQuantity = carrello[existingItemIndex].quantity + item.quantity;
        
        if (newQuantity > maxQuantity) {
          alert(`Errore: La quantità totale per questo prodotto non può superare ${maxQuantity}.`);
          return;
        }
        
        carrello[existingItemIndex].quantity = newQuantity;
      } else {
        // Se l'elemento non esiste, controlla la quantità prima di aggiungere
        if (item.quantity > maxQuantity) {
          alert(`Errore: La quantità totale per questo prodotto non può superare ${maxQuantity}.`);
          return;
        }else{
          carrello.push({ id: item.id, quantity: item.quantity });
        }
        
      }
      Cookies.remove("carrello")
      Cookies.set("carrello", JSON.stringify(carrello), {expires: 7})
      alert("Item aggiunto con successo al carrello!!")
      setSelectedProduct(null)
    }catch(err){
      console.error(err);
    }
  }


  return (
    <WithProtection {...routeProps}>
      <div className="flex" >
          <SideBar />
          <main className="ml-[300px] flex-1 flex flex-col items-center justify-center mt-20"> 
            <section className="flex flex-col items-center justify-center -mt-8 text-3xl font-bold" >
              <h1>
                {session ? `Bentornato ${session.userInfo.nome}` : `Benvenuto alla home page`}
              </h1>
              <div className="text-xs p-4" >
                {session ? "Buona permanenza" : (
                  <p><a href="/login" className="hover:underline text-blue-400" >Accedi</a> per goderti un'esperienza migliore. Se non hai un account <a href="/signup" className="hover:underline text-blue-400">Crealo</a>!</p>
                )}
              </div>
            </section>
            <div className="flex flex-wrap justify-center mt-8">
              {!products.length ? (
                <h3>Loading...</h3>
              ) : (
                <>
                  {products.map(product => (
                    <Card key={product.scarpaId} product={product} onClick={setSelectedProduct} />
                  ))}
                </>
              )}
            </div>
            {selectedProduct && (
              <Model product={selectedProduct} onClose={() => setSelectedProduct(null)} session={session} onAdd={handleCarrello} />
            )}   
          </main>
      </div>
    </WithProtection>
  );
}
