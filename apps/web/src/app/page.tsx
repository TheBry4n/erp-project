"use client"
import React, { useEffect, useState } from "react";
import { Card, Model, SideBar, WithProtection } from "../components";
import { Product, withProtectionProps } from "../types";
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

  const handleCarrello = (prodotto: Product) => {
    try{
      let carrello: Product[] = []
      const carrelloString = Cookies.get("carrello");
      if(carrelloString) {
        carrello = JSON.parse(carrelloString) as Product[]
      }
      carrello.push(prodotto)
      Cookies.remove("carrello")
      Cookies.set("carrello", JSON.stringify(carrello), {expires: 7})
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
