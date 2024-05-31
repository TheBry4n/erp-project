"use client"
import React, { useEffect, useState } from "react"
import { ModalProd, SideBar, WithProtection } from "@web/src/components"
import { Product, withProtectionProps } from "@web/src/types"
import Link from "next/link"
import { Button } from "@web/src/components/ui/button"

const prodotti = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);   
    const routeProps: withProtectionProps = {sessionRequired: true, accessRole: ["ADMIN", "MANAGER"]}

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

    useEffect(() =>{
        const fetchProducts = async () => {
            try{
                const res = await fetch("http://localhost:3001/products/",{
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                if(!res.ok) throw new Error("Errore nel fetch dei dati");
                const text = await res.text();
                if (!text) {
                throw new Error('La risposta è vuota');
                }
                const data = JSON.parse(text);
                setProducts(data.products);
            }catch(err){
                throw new Error("Errore nel fetch dei dati")
            }
        }

        fetchProducts()
    },[])

    const handleOpenModal = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
        setIsModalOpen(false);
        setQuantity(1);
    };

    const handleReplenish = async () => {
        if (!selectedProduct) return;

        try {
            const res = await fetch(`http://localhost:3001/products/rifornisci?id=${selectedProduct.scarpaId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ quantity })
            });
            if (!res.ok) throw new Error("Errore nel rifornire il prodotto");
            else {
                const updatedProducts = products.map(product =>
                    product.scarpaId === selectedProduct.scarpaId ? { ...product, quantita: product.quantita + quantity } : product
                );
                setProducts(updatedProducts);
            }

        } catch (err) {
            console.error("Errore nel rifornire il prodotto", err);
        }

        handleCloseModal();
    };

    return (
        <WithProtection {...routeProps}>
            <div className="flex" >
                <SideBar />
                <main className="ml-[300px] flex-1"> 
                    <div className="flex justify-center text-center mt-4" >
                        <h1 className="text-xl font-bold" >Prodotti</h1>
                    </div>
                    <div className="mt-4">
                        {products.length === 0 ? (
                            <p>Nessun prodotto disponibile.</p>
                        ) : (
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <TableHeaderCell>Marca</TableHeaderCell>
                                        <TableHeaderCell>Modello</TableHeaderCell>
                                        <TableHeaderCell>Quantità</TableHeaderCell>
                                        <TableHeaderCell>Azioni</TableHeaderCell>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr key={product.scarpaId}>
                                            <TableCell>{product.marca}</TableCell>
                                            <TableCell>{product.modello}</TableCell>
                                            <TableCell>{product.quantita}</TableCell>
                                            <TableCell>
                                                <button
                                                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                                                    onClick={() => handleOpenModal(product)}
                                                >
                                                    Rifornisci
                                                </button>
                                            </TableCell>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                    <div className="fixed bottom-10 right-10">
                        <Link href="/dashboard/prodotti/aggiungi-prodotto">
                            <Button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
                                Aggiungi Prodotto
                            </Button>
                        </Link>
                    </div> 
                </main>
            </div>
            <ModalProd
                isOpen={isModalOpen}
                onReqClose={handleCloseModal}
                onConfirm={handleReplenish}
                quantity={quantity}
                setQuantity={setQuantity}
            />
        </WithProtection>
    )
}

export default prodotti