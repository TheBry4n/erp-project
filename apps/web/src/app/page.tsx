"use client"
import React, { useEffect, useState } from "react";
import { SideBar, WithProtection } from "../components";
import { Product, withProtectionProps } from "../types";
import { useSession } from "../hooks";

export default function HomePage() {
  const routeProps: withProtectionProps = {asPublicRoute: true, sessionRequired: false};
  const {session, getSession, setUserSession: setSession } = useSession();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(()=>{
    const newSession = getSession();
    if(session != newSession && newSession ) setSession(newSession)
  },[session])

  useEffect(() => {
    const fetchProducts = async () =>{
      try{
        const response = await fetch("/api/products",{
          method: "GET"
        });
        if(!response.ok) throw new Error;

        const data = await response.json();
        setProducts(data);
      }catch(err){
        console.error(err)
      }
    }

    fetchProducts()
  },[])


  return (
    <WithProtection {...routeProps}>
      <div className="flex" >
          <SideBar />
          <main className="ml-[300px] flex-1 flex items-center justify-center mt-20"> 
            <section className="flex flex-col items-center justify-center -mt-8 text-3xl font-bold" >
              <h1>
                {session ? `Bentornato, ${session.userInfo.nome}` : `Benvenuto alla home page`}
              </h1>
              <div className="text-xs p-4" >
                {session ? "Buona permanenza" : (
                  <p><a href="/login" className="hover:underline text-blue-400" >Accedi</a> per goderti un'esperienza migliore. Se non hai un account <a href="/signup" className="hover:underline text-blue-400">Crealo</a>!</p>
                )}
              </div>
            </section>

          </main>
      </div>
    </WithProtection>
  );
}
