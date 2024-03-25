'use client'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  
  import React from 'react'
  

interface ActionTooltipProps{
    label:string;
    children:React.ReactNode;
    side:"left"|"right"|"top"|"bottom";
}

  const ActionTooltip = ({children,label,side}:ActionTooltipProps) => {
    return (
        <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>{
            children
            }</TooltipTrigger>
          <TooltipContent side={side}>
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
    )
  }
  
  export default ActionTooltip
  