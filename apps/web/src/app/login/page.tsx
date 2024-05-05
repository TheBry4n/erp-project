"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@web/src/components/ui/form'
import { loginSchema } from '@web/src/zodSchema'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from '@web/src/components/ui/input'
import { Button } from '@web/src/components/ui/button'
import { loginRequest } from '@web/src/actions'
import { NavBar } from "../../components"
import { useState } from 'react'
import { errorResponse } from '@web/src/types'
import { homePageRedirect } from '@web/src/actions'

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [errorObj, setErrorObj] = useState<errorResponse | {statusCode: 0, message: ""}>({statusCode: 0, message: ""})
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
      setIsLoading(false)
      setError(true)
      setErrorObj(res)
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
      <main className='min-h-96 flex flex-col justify-center items-center p-24'>
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
      </main>
    </>
  )
}
