'use client'
import React, { useEffect, useState } from 'react'
import StoreModal from '../Modals/store-modal' 

const ModalProvider = () => {

const [IsMounted,setIsMounted] = useState(false);
 
useEffect(() =>{
  setIsMounted(true);
},[setIsMounted])
 
 if(!IsMounted){
  return null;
 }

  return (
  <StoreModal/>

  )
}

export default ModalProvider
