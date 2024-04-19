
import React from 'react'
import MainNavbar from './MainNavbar'
import StoreSwithcer from './StoreSwithcer'
import { UserButton, auth } from '@clerk/nextjs'
import { redirect, useRouter } from 'next/navigation'
import prismadb from '@/lib/prismadb'
import { ModeToggle } from '../ModeToggle'

const Navbar = async() => {
 
  const {userId} = auth();

  if(!userId) {
   redirect("/sign-in")
  }

  const stores = await prismadb.store.findMany({
    where:{userId}
  });


  return (
    <div className='flex  h-16 items-center  px-4 justify border-b '>
       <StoreSwithcer  items={stores} />
      <MainNavbar /> 
      <div className='flex items-center gap-x-4'>
      <ModeToggle/>
      <UserButton/>
      </div>
       
    </div>
  )
}

export default Navbar
