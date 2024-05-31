"use client"
import React, { useLayoutEffect, useState } from "react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@web/src/components/ui/form'
import { newProductSchema } from '@web/src/zodSchema'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from '@web/src/components/ui/input'
import { Button } from '@web/src/components/ui/button'
import { homePageRedirect, loginRequest } from '@web/src/actions'
import { errorResponse, withProtectionProps } from '@web/src/types'
import Link from 'next/link'
import { useSession } from '@web/src/hooks'
import { redirect } from 'next/navigation'
import { LoadingScreen, ErrorScreen } from '@web/src/components'
import { SideBar } from '@web/src/components'
import { WithProtection } from '@web/src/components'

export default function AggiungiProdotto() {
    const [isLoading, setIsLoading] = useState(false)
  const [errorObj, setErrorObj] = useState<errorResponse | undefined>(undefined)

  const form = useForm<z.infer<typeof newProductSchema>>({
    resolver: zodResolver(newProductSchema),
    defaultValues: {
      marca: "",
      modello: "",
      quantita: 100,
      prezzo: 5,
      descrizione: "",
      immagine: null // Inizializza il campo immagine a null
    }
  })

  useLayoutEffect(() => {
    if (errorObj) {
      window.scrollTo(0, 0); // Scrolla in cima alla pagina se si verifica un errore
    }
  }, [errorObj])

//   const handleSubmit = async (data: z.infer<typeof newProductSchema>) => {
//     setIsLoading(true)
//     const res = await createProductRequest(data);

//     if(!res){
//       redirect("/dashboard/prodotti")
//     }else{
//       setErrorObj(res)
//       setIsLoading(false)
//     }
//   }

  const handleCloseError = () => {
    setErrorObj(undefined)
  }

  const routeProps: withProtectionProps = { sessionRequired: true, accessRole: ["ADMIN", "MANAGER"] }

  return (
    <WithProtection {...routeProps}>
      <div className="flex">
        <SideBar />
        <main className="ml-[300px] flex-1 mt-4">
          {isLoading && <LoadingScreen />}
          {errorObj && <ErrorScreen errorObj={errorObj} onClose={handleCloseError} />}
          <main className='min-h-screen flex flex-col justify-center items-center'>
            <h1 className="capitalize md:uppercase text-xl">Inserisci un nuovo prodotto</h1>
            <Form {...form} >
              <form className="max-w-md w-full flex flex-col gap-7 mb-4" method='post' encType="multipart/form-data" >
                <FormField control={form.control} name="marca" render={({field}) => {
                  return <FormItem>
                    <FormLabel>Marca</FormLabel>
                    <FormControl>
                      <Input placeholder='Marca' type='text' {...field}/>
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
                      <Input placeholder='Quantita' type='number' min="5"  {...field}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                }} >
                </FormField>
                <FormField control={form.control} name="immagine" render={({field}) => {
                    return (
                        <FormItem>
                            <FormLabel>Immagine</FormLabel>
                            <FormControl>
                            <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-500 hover:text-white">
                                <span className="mt-2 text-base leading-normal">Seleziona un file</span>
                                <input
                                    type='file' 
                                    accept='.png,.jpg,.jpeg' 
                                    {...field}
                                    className="hidden"
                                    required
                                />
                            </label>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    );
                }}>
                </FormField>
                <Button className='w-full' type='submit'>Aggiungi Prodotto</Button>
              </form>
            </Form>
          </main>
        </main>
      </div>
    </WithProtection>
  )
}