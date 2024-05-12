// import React, { useEffect, useState } from 'react'
// import { redirect } from 'next/navigation';
// import { isAfter, addMinutes } from "date-fns";
// import { Session } from "../types"

// export const withAuth = (WrappedContent: any) => {
//     return function WithAuth(props: any)  {
//         const [ loading, setLoading ] = useState(true)
//         useEffect(() =>{
//             const sessionString  = typeof window !== "undefined" ? localStorage.getItem("__session") : null
//             const session = !sessionString ? null : JSON.parse(sessionString)
//             const checkAccessTokenValidation = async () => {
//               const accessTokenExpiry = addMinutes(session.userInfo.dateOfAccess, parseInt(session.tokensInfo.ATExpiredTime))
//               const body = { refreshToken: session.tokensInfo.refreshToken }
                  
//               if(isAfter(new Date(), accessTokenExpiry)){
//                 try{
//                     const res = await fetch("http://localhost:3001/api/refresh", {
//                         method: "POST",
//                         headers: {
//                             "Content-Type": "application/json",
//                             "Authorization": `Bearer ${session.tokensInfo.refreshToken}`
//                         },
//                         body: JSON.stringify(body)
//                     })
      
//                     if(!res.ok) throw new Error
      
//                     const resData = await res.json()
      
//                     const newSession: Session = {
//                         tokensInfo: {
//                           accessToken: resData.access_token,
//                           ATExpiredTime: resData.ATExpiredTime,
//                           refreshToken: resData.refresh_token,
//                           RTExpiredTime: resData.RTExpiredTime
//                         },
//                         userInfo: {
//                           nome : session.userInfo.nome,
//                           cognome : session.userInfo.cognome,
//                           email: session.userInfo.email,
//                           role: session.userInfo.ruolo,
//                           dateOfAccess: new Date()
//                         }
//                     }
//                     localStorage.setItem("__session",JSON.stringify(newSession))
//                 }catch(error){
//                     console.log(error)
//                 } 
//               }
//             }
    
//             if(!session) redirect("/");
//             else checkAccessTokenValidation();
//             setLoading(false)
//         }, []);

//         return (
//             <>
//             {loading && (
//               <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-lg"></div>
//             )}
//             <WrappedContent {...props} />
//             </>
//         );
//     }
// }