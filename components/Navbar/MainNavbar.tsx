'use client'
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React from 'react'


 

const MainNavbar = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) => {
const pathname = usePathname();
const params = useParams(); 

const routes=[
    {   
        href:`/${params.storeId}/overview`,
        label:"Overview",
        active:`/${params.storeId}/overview` === pathname  
       
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
        href:`/${params.storeId}/settings`,
        label:"Settings",
        active:`/${params.storeId}/settings` === pathname  
       
    }
]
  return (
    <div className={cn("flex item-center lg:mx-6  space-x-4",className)}>
       {
        routes.map((route,index)=>{
            return(  <Link  
             className={cn("text-zinc-500 text-sm", route.active ? "text-zinc-900" : "")}
            key={index} 
            href={route.href}>
                {route.label}
                </Link>
            )
        })
       }
     
    </div>
  )
}

export default MainNavbar
