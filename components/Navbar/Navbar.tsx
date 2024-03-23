'use client'
import React from 'react'
import MainNavbar from './MainNavbar'
import StoreSwithcer from './StoreSwithcer'
import { UserButton } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <div className='flex  h-16 items-center  px-4 justify border-b '>
       <StoreSwithcer />
      <MainNavbar className="mx-6"/>
      <div className='ml-auto flex space-x-4'>
      <UserButton/>
      </div>
    </div>
  )
}

export default Navbar
