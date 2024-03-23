'use client'
import StoreModal from '@/components/Modals/store-modal'
import Modal from '@/components/ui/modal'
import { UseModalStore } from '@/hooks/use-modal-store'
import React, { useEffect, useState } from 'react'

const Setuppage = () => {

    const {onOpen,isOpen} = UseModalStore();
  

 useEffect(()=>{
    if(!isOpen){
        onOpen();
    }
 },[onOpen,isOpen])


  return (
    <div>
      Root Page
    </div>
  )
}

export default Setuppage
