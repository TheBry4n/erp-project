import React, { useLayoutEffect, useEffect } from 'react'
import { redirect } from 'next/navigation';
import useSession from '../hooks/useSession.hook';

export const withAuth = (WrappedContent: any) => {
    return function WithAuth(props: any)  {
        const { session } = useSession()
        useEffect(() =>{
            if(!session){
                redirect("/")
            }
        }, [session])

        return <WrappedContent {...props} />;
    }
}