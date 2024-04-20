'use client'
import React from 'react'
import { Badge, BadgeProps } from './badge';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
 
import { CgDatabase } from "react-icons/cg";
import { Button } from './button';
import { BsCopy } from "react-icons/bs";
import ActionTooltip from '../Tooltip';
import { useToast } from './use-toast';

interface ApialertProps{
    title: string;
    description:string;
    variant:"admin" | "public";
}

 const TextMap:Record<ApialertProps["variant"] ,string> = {
    admin: "Admin",
    public: "Public"
 } 
 const VarientMap:Record<ApialertProps["variant"], BadgeProps['variant']> = {
    admin: "destructive",
    public: "secondary"
 }
const Apialert = ({
    title,
    description,
    variant
}:ApialertProps) => {

const {toast} = useToast();
const onCopy = ()=>{
    navigator.clipboard.writeText(description);
    toast({
        title:"Copied",
        variant:"success"
    })
}

  return (
    <Alert>
        < CgDatabase  size={18}/>
  <AlertTitle className='flex gap-2 items-center'>{title}
  <Badge variant={VarientMap[variant]}>{
     TextMap[variant]
    }</Badge>
  </AlertTitle>
   
  <AlertDescription className='flex items-center   justify-between'>
    <code className=' w-full truncate'>
        {description}
    </code>
    <ActionTooltip label='Copy' side='bottom' >
    <Button className='hover:bg-foreground/10'
    onClick={onCopy}
    variant={"outline"}><BsCopy /></Button></ActionTooltip>
  </AlertDescription>
</Alert>

  )
}

export default Apialert
