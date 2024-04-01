 import { ImageIcon, TrashIcon } from '@radix-ui/react-icons';
import React, { useEffect, useState } from 'react'
import { Button } from './button';
import Image from 'next/image';
 import {CldUploadWidget} from "next-cloudinary" 
 import { LuImagePlus } from "react-icons/lu";
import { PiTrashSimpleBold } from 'react-icons/pi';

interface ImageUpoadProps{
  onChange:(value:string)=>void;
  disabled?: boolean;
  onRemove:(value:string)=>void;
  value: string[];

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
            <div key={url} className='w-[200px] h-[200px] rounded-md  relative  overflow-hidden'>
             <div className='absolute z-10 top-2 right-2'>
              
             <Button size={"icon"} variant={"destructive"}  onClick={()=>onRemove(url)}>
                <PiTrashSimpleBold size={16} className='w-4 h-4' />
              </Button>
              </div>
              <Image
              fill
              src={url}
               alt='billboard'
              className='object-cover'
              />
            </div>
          )
        })}
       </div>
        
       <CldUploadWidget  onUpload={onUpload}  uploadPreset='yj6fsb0y' >
        {({open})=>{
          const onClick=()=>{
            open();
          }
          return( 
          <Button
           className=" border border-dashed border-gray-500/50  text-gray-500"
          disabled={disabled}
          onClick={onClick}
          variant={"secondary"}
          >
            <ImageIcon  className='h-4 w-4 mr-2'/>
            upload an Image</Button>
            )

        }}
       </CldUploadWidget>
     </div>
   )
 }
 
 export default Imageuplode
 