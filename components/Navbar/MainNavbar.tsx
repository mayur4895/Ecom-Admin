'use client'
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { BsGrid3X3, BsGridFill, BsMenuButton } from 'react-icons/bs';
import { LuGrid, LuMenu } from 'react-icons/lu';
  

 

const MainNavbar = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) => {
const pathname = usePathname();
const params = useParams(); 

const routes=[
    {   
        href:`/${params.storeId}/`,
        label:"Overview",
        active:`/${params.storeId}` === pathname  
       
    },
    {   
        href:`/${params.storeId}/billboards`,
        label:"Billboards",
        active:`/${params.storeId}/billboards` === pathname  
       
    },
    {   
        href:`/${params.storeId}/categories`,
        label:"Categories",
        active:`/${params.storeId}/categories` === pathname  
       
    },
    {   
        href:`/${params.storeId}/sizes`,
        label:"Sizes",
        active:`/${params.storeId}/sizes` === pathname  
       
    },
    {   
        href:`/${params.storeId}/colors`,
        label:"Colors",
        active:`/${params.storeId}/colors` === pathname  
       
    },
    {   
        href:`/${params.storeId}/products`,
        label:"Products",
        active:`/${params.storeId}/products` === pathname  
       
    },
    {   
        href:`/${params.storeId}/orders`,
        label:"Orders",
        active:`/${params.storeId}/orders` === pathname  
       
    },
    {   
        href:`/${params.storeId}/settings`,
        label:"Settings",
        active:`/${params.storeId}/settings` === pathname  
       
    }
]
  return (
    <>
    <div className={cn("lg:flex item-center lg:mx-6  space-x-4 hidden",className)}>
       {
        routes.map((route,index)=>{
            return(  <Link  
                className={cn("text-zinc-500 dark:text-zinc-400 text-sm", route.active ? "text-zinc-900 dark:text-zinc-100" : "")}
            key={index} 
            href={route.href}>
                {route.label}
                </Link>
            )
        })
       }
     
    </div>
    <div className=' ml-auto mr-5'>
    <Sheet>
  <SheetTrigger className='lg:hidden text-xl items-center  h-16 '><BsGridFill/></SheetTrigger>
   
  <SheetContent>
  <SheetHeader className='mb-5'>
    <SheetTitle>
        <Link href={`/${params.storeId}/`}>
                             MStore 
            
        </Link>
    </SheetTitle>
  </SheetHeader> 
  <div className={cn("flex item-center lg:mx-6 space-y-4 flex-col",className)}>
       {
        routes.map((route,index)=>{
            return(  <Link  
             className={cn("text-zinc-500 text-sm dark:text-zinc-400", route.active ? "text-zinc-900 dark:text-zinc-100" : "")}
            key={index} 
            href={route.href}>
                {route.label}
                </Link>
            )
        })
       }
     
    </div>
  </SheetContent>
</Sheet>

    </div>
    </>

  )
}

export default MainNavbar
