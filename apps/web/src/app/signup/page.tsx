"use client"
import React, { useLayoutEffect, useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@web/src/components/ui/form';
import { z } from "zod";
import { useForm } from 'react-hook-form';
import { signupSchema }  from "@web/src/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from '@web/src/components/ui/input';
import { Button } from '@web/src/components/ui/button';
import { loginRedirect, signupRequest }  from "../../actions";
import { errorResponse } from '@web/src/types';
import Link from 'next/link';
import { useSession } from '@web/src/hooks';
import { redirect } from 'next/navigation';
import { LoadingScreen, ErrorScreen } from '@web/src/components';

function signup() {
    const [ isLoading, setLoading ] = useState(false);
    const [errorObj, setErrorObj] = useState<undefined | errorResponse>(undefined)
    const { session } = useSession()

    useLayoutEffect(() => {
        if(session) redirect("/")
      }, [session])


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

        if(!res){
            loginRedirect();
        }else{
            setErrorObj(res);
            setLoading(false);
        }
    }

    const handleCloseError = () => {
        setErrorObj(undefined);
    }

  return (
    <>
        {isLoading && <LoadingScreen />}
        {errorObj && <ErrorScreen errorObj={errorObj} onClose={handleCloseError} />}
        <main className=" min-h-screen flex flex-col justify-center items-center" >
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
            <p className='mt-4' >Hai gia un account? <Link href="/login" className="hover:underline" >Accedi</Link></p>
        </main>
    </>
  )
}

export default signup