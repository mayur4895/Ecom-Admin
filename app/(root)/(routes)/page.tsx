'use client'
import StoreModal from '@/components/Modals/store-modal'
import Modal from '@/components/ui/modal'
import {  useModal } from '@/hooks/use-modal-store'
import prismadb from '@/lib/prismadb'
import React, { useEffect, useState } from 'react'

const Setuppage = () => {

    const {onOpen,isOpen} = useModal();
  
 useEffect(()=>{
    if(!isOpen){
        onOpen("CreateStore");
    }
 },[onOpen,isOpen])


  return (
    <div>
      Root Page
    </div>
  )
}

export default Setuppage
