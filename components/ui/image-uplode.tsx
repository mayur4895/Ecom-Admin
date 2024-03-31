 import { TrashIcon } from '@radix-ui/react-icons';
import React, { useEffect, useState } from 'react'
import { Button } from './button';
import Image from 'next/image';
 import {CldUploadWidget} from "next-cloudinary" 
 import { LuImagePlus } from "react-icons/lu";

interface ImageUpoadProps{
  onChange:(value:string)=>void;
  disabled: boolean;
  onRemove:(value:string)=>void;
  value:string[];

}

 const Imageuplode = ({
  onChange,
  disabled,
  onRemove,
  value,
 }:ImageUpoadProps) => {



  const [mounted,setmounted] = useState(false)

  useEffect(()=>{
    setmounted(true)
},[setmounted])


const onUpload = (result:any)=>{
  onChange(result.info.secure_url);
 }

if(!mounted){
    return null;
}

 

   return (
     <div>
       <div className='mb-4 flex items-center gap-4'>
        {value.map((url)=>{
          return(
            <div className='w-[200px] h-[200px] rounded-md  relative  overflow-hidden'>
            
              <Button className='w-4 h-4 absolute' variant={"destructive"}  onClick={()=>onRemove(url)}>
                <TrashIcon className='w-4 h-4' />
              </Button>
              <Image
              fill
              src={url} alt='billboard'
              className='object-cover'
              />
            </div>
          )
        })}
       </div>
       <CldUploadWidget onUploadAdded={onUpload} uploadPreset='zccmp14j' >
        {({open})=>{
          const onClick=()=>{
            open();
          }
          return(
            <Button className='w-4 h-4 absolute' 
            disabled={disabled}
            variant={"outline"}  
            onClick={onClick}
            >
              <LuImagePlus size={23} className='text-zinc-500' />
              <span className='ml-2 text-gray-500  w-[100px]  truncate'>Upload</span>
             
            </Button>
          )
        }}
       </CldUploadWidget>
     </div>
   )
 }
 
 export default Imageuplode
 