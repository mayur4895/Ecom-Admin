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
import { UseModalStore } from '@/hooks/use-modal-store'
import { useParams, useRouter } from 'next/navigation'
import { PiCaretUpDownThin } from "react-icons/pi";

 
type PopoverTriggerProps =  React.ComponentPropsWithoutRef<typeof PopoverTrigger>
interface StoreSwitcherProps extends PopoverTriggerProps{
    items?:store[];
}

const StoreSwithcer = ({
    items=[],
 ...props
}:StoreSwitcherProps) => {

const {} = UseModalStore();
const params = useParams();
const router = useRouter();


const formatedItems = items?.map((item)=>({
label:item.name,
value : item.id
}))

const currentStore = formatedItems.map((item)=>item.value === params.storeId);
const [ open,setOpen] = useState(false);
const onSelectStore = (store:{label:string, value:string})=>{
    setOpen(false)
    router.push(`/${store.value}`)
}

  return (
    <div>
<Popover open={open} onOpenChange={setOpen}>
  <PopoverTrigger>
  <Button variant={"outline"} role='combobox'  aria-label='select store' className='w-[200px]'> 
   <AiTwotoneShop size={23} />
   <PiCaretUpDownThin  className="ml-auto"/>

    </Button>
   </PopoverTrigger>
  <PopoverContent>
      <Command>
  <CommandInput placeholder="Type a command or search..." />
  <CommandList className='text-zinc-600'>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Calendar</CommandItem>
      <CommandItem>Search Emoji</CommandItem>
      <CommandItem>Calculator</CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Settings">
      <CommandItem>Profile</CommandItem>
      <CommandItem>Billing</CommandItem>
      <CommandItem>Settings</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>
</PopoverContent>
</Popover>

    </div>
  )
}

export default StoreSwithcer
