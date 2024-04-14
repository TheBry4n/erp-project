"use client"
import { redirect } from "next/navigation"
import { Button } from "../components/ui/button";
import { candidaturaHandle, loginHandle } from "../actions";

export default function Home() {
  return (
    <>
      <div className="h-screen flex flex-col justify-start items-center pt-16">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 text-center">Scarpe&co</h1>
        <div className="flex flex-col items-center pt-60">
          <Button onClick={() => loginHandle()} size="lg" variant="outline" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
            Login
          </Button>
          <Button onClick={() => candidaturaHandle()} size="lg" variant="outline" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Candidati
          </Button>
        </div>
      </div> 
    </>
  );
}
