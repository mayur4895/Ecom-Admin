'use client'
import React, { useState } from 'react'
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  
import { Button } from '../ui/button'
import { AiTwotoneShop } from "react-icons/ai";
import { store } from '@prisma/client' 
import { useParams, useRouter } from 'next/navigation'
import { PiCaretUpDownThin } from "react-icons/pi";
import { CheckIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'
import { IoIosAddCircleOutline } from "react-icons/io";
import StoreModal from '../Modals/store-modal'
import { PiCheckThin } from "react-icons/pi";

import { CiShop } from "react-icons/ci";
import { useModal } from '@/hooks/use-modal-store'

 
type PopoverTriggerProps =  React.ComponentPropsWithoutRef<typeof PopoverTrigger>
interface StoreSwitcherProps extends PopoverTriggerProps{
    items:store[];
}

const StoreSwithcer = ({
    items=[],
 ...props
}:StoreSwitcherProps) => {

const {onOpen} = useModal();
const params = useParams();
const router = useRouter();


const formatedItems = items.map((item)=>({
label:item.name,
value : item.id
}))

const currentStore = formatedItems.find((item)=>item.value === params.storeId);
 

const [ open,setOpen] = useState(false);
const onSelectStore = (store:{label:string, value:string})=>{
    setOpen(false)
    router.push(`/${store.value}`)
}

  return (
    <div>
<Popover open={open} onOpenChange={setOpen}>
  <PopoverTrigger asChild>
  <Button variant={"outline"} role='combobox'  aria-label='select store' className='w-[200px]'> 
   <AiTwotoneShop size={23} className='text-zinc-500' />
   <span className='ml-2 text-gray-500  w-[100px]  truncate'>{currentStore?.label}</span>
   <PiCaretUpDownThin  className="ml-auto"/>
</Button>
   </PopoverTrigger>
  <PopoverContent className=' w-[250px]'>
      <Command>
  <CommandInput placeholder="Store search..." />
  <CommandList className='text-zinc-600'>
    <CommandEmpty>No Store found.</CommandEmpty>
    <CommandGroup heading="Stores"> 
    {
      formatedItems.map((store)=>{
        return(
          <CommandItem key={store.value} onSelect={()=>onSelectStore(store)}>
             <CiShop size={18} className='text-zinc-500 mr-2' />
             <span className='ml-2 text-gray-600  w-[150px]  truncate'>{store?.label}</span>
         <PiCheckThin   size={20} className={cn("  ml-2",
         
         currentStore?.value === store.value ? " opacity-100 ":"opacity-0")}/>
          </CommandItem>
          
        )
      })
    }
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup  >
      <CommandItem className='text-gray-600' onSelect={()=>{
          setOpen(false)
           onOpen('CreateStore');
      }}>
        Create Store
        <IoIosAddCircleOutline className='ml-auto ' size={22} />
      </CommandItem>
     
    </CommandGroup>
  </CommandList>
</Command>
</PopoverContent>
</Popover>

    </div>
  )
}

export default StoreSwithcer
