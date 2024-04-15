'use client' 
import {  useModal } from '@/hooks/use-modal-store' 
import React, { useEffect } from 'react'

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
