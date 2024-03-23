import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'

const RootLayout = async({children}:{children:React.ReactNode}) => {

 const {userId} =   auth();

 if(!userId){
     return redirect("/sign-in")
 }

 const store = await prismadb.store.findFirst({
    where:{userId}
 })

 if(store){
  redirect(`/${store.id}`)
 }

 

  return (
    <div>
      {children}
    </div>
  )
}

export default RootLayout
