"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@web/src/components/ui/form'
import { loginSchema } from '@web/src/zodSchema'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from '@web/src/components/ui/input'
import { Button } from '@web/src/components/ui/button'
import { homePageRedirect, loginRequest } from '@web/src/actions'
import { useLayoutEffect, useState } from 'react'
import { errorResponse } from '@web/src/types'
import Link from 'next/link'
import { useSession } from '@web/src/hooks'
import { redirect } from 'next/navigation'
import { LoadingScreen, ErrorScreen } from '@web/src/components'

function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const [errorObj, setErrorObj] = useState<errorResponse | undefined>(undefined)
  const { session, setUserSession: setSession } = useSession()

  useLayoutEffect(() => {
    if(session) redirect("/")
  }, [session])

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const handleSubmit = async (data: z.infer<typeof loginSchema>) => {
    setIsLoading(true)
    const res = await loginRequest(data);

    if(!res){
      homePageRedirect()
    }else{
      setErrorObj(res)
      setIsLoading(false)
    }
  }

  const handleCloseError = () => {
    setErrorObj(undefined)
  }

  return (
    <>
      {isLoading && <LoadingScreen />}
      {errorObj && <ErrorScreen errorObj={errorObj} onClose={handleCloseError} />}
      <main className='min-h-screen flex flex-col justify-center items-center'>
        <h1 className="capitalize md:uppercase text-4xl" >Login</h1>
        <Form {...form} >
          <form onSubmit={form.handleSubmit(handleSubmit)} className="max-w-md w-full flex flex-col gap-7" method='post' >
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
            <Button className='w-full' type='submit' >Login</Button>
          </form>
        </Form>
        <p className='mt-4' >Non hai un account? <Link href="/signup" className="hover:underline" >Registrati</Link></p>
      </main>
    </>
  )
}

export default Login;