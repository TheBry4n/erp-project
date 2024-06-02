"use client"
import React, { useState } from "react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@web/src/components/ui/form'
import { newProductSchema } from '@web/src/zodSchema'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from '@web/src/components/ui/input'
import { Button } from '@web/src/components/ui/button'
import { CreateNewProduct, dashboardProductRidirect } from '@web/src/actions'
import { withProtectionProps } from '@web/src/types'
import { LoadingScreen } from '@web/src/components'
import { SideBar } from '@web/src/components'
import { WithProtection } from '@web/src/components'
import { SuccessToast, ErrorToast } from "../../../../utils"
import { ToastContainer } from "react-toastify"

export default function AggiungiProdotto() {
  const [isLoading, setIsLoading] = useState(false)
  //const [file, setFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof newProductSchema>>({
    resolver: zodResolver(newProductSchema),
    defaultValues: {
      marca: "",
      modello: "",
      quantita: 0,
      prezzo: 0,
      descrizione: ""
    }
  })

  const handleSubmit = async (data: z.infer<typeof newProductSchema>) => {
    const res = await CreateNewProduct(data)

    if (!res) {
      SuccessToast({ title: "Prodotto aggiunto con successo", expiredTime: 3000 })
      dashboardProductRidirect()
    } else {
      setIsLoading(false);
      ErrorToast({ title: "Errore nella richiesta", expiredTime: 3000 })
    }
  }

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0]
  //   if (file) {
  //     setFile(file);
  //   }
  // };

  const routeProps: withProtectionProps = { sessionRequired: true, accessRole: ["ADMIN", "MANAGER"] }

  return (
    <WithProtection {...routeProps}>
      <div className="flex">
        <SideBar />
        <main className="ml-[300px] flex-1 mt-4">
          {isLoading && <LoadingScreen />}
          <main className='min-h-screen flex flex-col justify-center items-center'>
            <h1 className="capitalize md:uppercase text-xl">Inserisci un nuovo prodotto</h1>
            <Form {...form} >
              <form onSubmit={form.handleSubmit(handleSubmit)} className="max-w-md w-full flex flex-col gap-7 mb-4" method='post' encType="multipart/form-data" >
                <FormField control={form.control} name="marca" render={({field}) => {
                  return <FormItem>
                    <FormLabel>Marca</FormLabel>
                    <FormControl>
                      <Input placeholder='Marca' type='text' {...field} required/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                }} >
                </FormField>
                <FormField control={form.control} name="modello" render={({field}) => {
                  return <FormItem>
                    <FormLabel>Modello</FormLabel>
                    <FormControl>
                      <Input placeholder='Modello' type='text' {...field}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                }} >
                </FormField>
                <FormField control={form.control} name="descrizione" render={({field}) => {
                  return <FormItem>
                    <FormLabel>Descrizione</FormLabel>
                    <FormControl>
                      <Input placeholder='Descrizione' type='text' {...field}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                }} >
                </FormField>
                <FormField control={form.control} name="prezzo" render={({field}) => {
                  return <FormItem>
                    <FormLabel>Prezzo</FormLabel>
                    <FormControl>
                      <Input placeholder='Prezzo' type="number" {...field}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                }} >
                </FormField>
                <FormField control={form.control} name="quantita" render={({field}) => {
                  return <FormItem>
                    <FormLabel>Qauntità</FormLabel>
                    <FormControl>
                      <Input placeholder='Quantita' type='number'  {...field}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                }} >
                </FormField>
                {/* <FormField control={form.control} name="immagine" render={() => {
                    return (
                        <FormItem>
                            <FormLabel>Immagine</FormLabel>
                            <FormControl>
                            <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-500 hover:text-white">
                                <span className="mt-2 text-base leading-normal">Seleziona un file</span>
                                <input
                                    type='file' 
                                    accept='.png,.jpg,.jpeg'
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </label>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    );
                }}>
                </FormField>
                {file ? ( <p className="text-green-500 -mt-4">Foto caricata con successo!</p> ) : ( <p className="text-red-500 -mt-4">Nessuna foto caricata</p> )} */}
                <Button className='w-full' type='submit'>Aggiungi Prodotto</Button>
              </form>
            </Form>
          </main>
        </main>
      </div>
      <ToastContainer/>
    </WithProtection>
  )
}