import SettingForm from '@/components/SettingForm'
import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'


interface SettingsProps{
    params:{storeId:string};
    
}

const Settings = async({params}:SettingsProps) => {
         
    const {userId} =   auth();
    if(!userId){
      redirect("/sign-in")
    }

    const store = await prismadb.store.findFirst({
      where:{
          id:params.storeId,
          userId
      }
    })

    if(!store){
        redirect("/")
    }

  return (
    <div>
       <SettingForm store={store}/>
    </div>
  )
}

export default Settings
