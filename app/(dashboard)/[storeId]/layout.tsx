import Navbar from '@/components/Navbar/Navbar';
import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'

interface DashboardLayoutProps{
    children:React.ReactNode;
    params:{storeId:string}
}

const DashboardLayout = async({children,params}:DashboardLayoutProps) => {

 const {userId} =  auth();  

 if(!userId){
     return redirect("/sign-in")
 }

 const store = await prismadb.store.findFirst({
    where:{
        id:params.storeId,
        userId:userId
    }
 })

 if(!store){
     return redirect("/")
 }

 

  return (
    <div>
       <Navbar/>
      {children}
    </div>
  )
}

export default DashboardLayout
