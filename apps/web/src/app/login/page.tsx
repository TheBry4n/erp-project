"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@web/src/components/ui/form'
import { loginSchema } from '@web/src/zodSchema'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from '@web/src/components/ui/input'
import { Button } from '@web/src/components/ui/button'
import { loginSubmit } from '@web/src/actions'

interface ErrorResponse {
  statusCode: number;
  message: string;
}

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ErrorResponse | null>(null)
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: ""
    }
  })

  const handleSubmit = async (data: z.infer<typeof loginSchema>) => {
    try{
      setLoading(true)
      await loginSubmit(data)
    }catch(error){
      if(error instanceof Object && "statusCode" in error && "message" in error){
        setError(error as ErrorResponse)
      }else {
        setError({statusCode: 500, message: "undefine Error"})
      }
    }finally{
      setLoading(false)
    }
  }

  return (
    <main className='flex flex-col justify-center min-h-screen items-center p-24'>
      <h1 className="capitalize md:uppercase text-4xl" >Login</h1>
      <Form {...form} >
        <form onSubmit={form.handleSubmit(loginSubmit)} className="max-w-md w-full flex flex-col gap-7" method='post' >
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong>{error.statusCode}</strong>: {error.message}
          </div>
        )}
          <FormField control={form.control} name="email" render={({field}) => {
            return <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='Email' type='email' {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          }} >
          </FormField>
          <FormField control={form.control} name="password" render={({field}) => {
            return <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type='password' placeholder='Password'/>
              </FormControl>
              <FormMessage />
            </FormItem>
          }} >
          </FormField>
          <FormField control={form.control} name="passwordConfirm" render={({field}) => {
            return <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input {...field} type='password' placeholder='Confirm password' />
              </FormControl>
              <FormMessage />
            </FormItem>
          }} >
          </FormField>
          <Button className='w-full' type='submit' >{loading ? "Loading..." : "Login"}</Button>
        </form>
      </Form>
    </main>
  )
}
