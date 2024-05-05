"use client"
import React, { useState } from 'react';
import { NavBar } from '@web/src/components';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@web/src/components/ui/form';
import { z } from "zod";
import { useForm } from 'react-hook-form';
import { signupSchema }  from "@web/src/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from '@web/src/components/ui/input';
import { Button } from '@web/src/components/ui/button';
import { signupRequest }  from "../../actions";
import { loginRedirect } from '../../actions';
import { errorResponse } from '@web/src/types';

function signup() {
    const [ isLoading, setLoading ] = useState(false);
    const [error, setError] = useState(false);
    const [errorObj, setErrorObj] = useState<{statusCode: 0, message: ""} | errorResponse>({statusCode: 0, message: ""})
    const form = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            nome: "",
            cognome: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    })

    const handleSubmit = async (data: z.infer<typeof signupSchema>): Promise<void> => {
        setLoading(true)
        const res = await signupRequest(data);
        console.log(res)

        if(!res){
            loginRedirect();
        }else{
            setErrorObj(res);
            setLoading(false);
            setError(true);
        }
    } 

  return (
    <>
        <NavBar />
        {isLoading && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-lg">
            <div className=" bg-gray-700 rounded-lg p-8">
              <div className="flex justify-center items-center p-8">
                 <svg className="animate-spin h-8 w-8 mr-3 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM16 12c0-3.042-1.135-5.824-3-7.938l-3 2.647A7.96 7.96 0 0112 4v8h4zm2 5.291c1.865-2.114 3-4.896 3-7.938h-4v8l1-2.647z"></path>
                 </svg>
               <span className="ml-2" >Caricamento...</span>
              </div>
            </div>
          </div>
        )}
        {error && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-lg">
            <div className=" bg-gray-700 rounded-lg p-8">
              <div className="flex flex-col justify-center items-center p-8">
                <h2 className="ml-2" >Error</h2>
                <p className="ml-2" >status code: {errorObj.statusCode}</p>
                <p className="ml-2" >message: {errorObj.message}</p>
                <Button onClick={() => setError(false)} variant="destructive">Close</Button>
              </div>
            </div>
          </div>
        )}
        <main className="min-h-96 flex flex-col justify-center items-center p-24" >
            <h1 className="capitalize md:uppercase text-4xl" >Signup</h1>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(handleSubmit)} className="max-w-md w-full flex flex-col gap-7" method='post' >
                    <FormField control={form.control} name="nome" render={({field}) => {
                        return <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                                <Input type='text' placeholder='Nome' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    }} ></FormField>
                    <FormField control={form.control} name="cognome" render={({field}) => {
                        return <FormItem>
                            <FormLabel>Cognome</FormLabel>
                            <FormControl>
                                <Input type='text' placeholder='Cognome' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    }} ></FormField>
                    <FormField control={form.control} name="email" render={({field}) => {
                        return <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type='email' placeholder='Email' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    }} ></FormField>
                    <FormField control={form.control} name="password" render={({field}) => {
                        return <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type='password' placeholder='Password' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    }} ></FormField>
                    <FormField control={form.control} name="confirmPassword" render={({field}) => {
                        return <FormItem>
                            <FormLabel>Confirm password</FormLabel>
                            <FormControl>
                                <Input type='password' placeholder='confim password' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    }} ></FormField>
                    <Button className='w-full' type='submit' >Signup</Button>
                </form>
            </Form>
        </main>
    </>
  )
}

export default signup