
import React from 'react'
import MainNavbar from './MainNavbar'
import StoreSwithcer from './StoreSwithcer'
import { UserButton, auth } from '@clerk/nextjs'
import { redirect, useRouter } from 'next/navigation'
import prismadb from '@/lib/prismadb'

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
      <MainNavbar className="mx-6"/>
      <div className='ml-auto flex space-x-4'>
      <UserButton/>
      </div>
    </div>
  )
}

export default Navbar
