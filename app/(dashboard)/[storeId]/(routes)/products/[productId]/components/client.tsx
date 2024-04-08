'use client'
import ActionTooltip from '@/components/Tooltip'
 
import { Button } from '@/components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import { useModal } from '@/hooks/use-modal-store' 
import { useParams, useRouter,   } from 'next/navigation'
import prismadb from '@/lib/prismadb'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Billboard } from '@prisma/client'
import { Separator } from '@radix-ui/react-separator'
import { DataTable } from '@/components/ui/data-table'
import { ProductDataType, columns } from './columns'
import Heading from '@/components/ui/Heading'
import ApiList from '@/components/ui/api-list'
 
interface ProductClientProps{
  products:ProductDataType[];
}
const ProductClient = ({
  products
}:ProductClientProps) => {
    const router = useRouter();
    const params = useParams(); 

  
     
   
     
 
  return (
      <div>
          <div className=" flex justify-between items-center">
     <Heading title={`products(${products?.length})`} desc="manage the billobards prefernces" />
       
     <Button  
     className='flex gap-2'
      onClick={()=>{router.push(`/${params.storeId}/products/new`)}}   >
     <PlusIcon />
    create New
    </Button> 
      
     </div>
     
     <Separator/>
       <DataTable searchKey='label' columns={columns} data={products}/>
       


       <Heading title={`Api`} desc="products Api" />
       <Separator/>
       <ApiList 
       entityName='products'
       entityNameId='productId'
        
       />
    </div>
  )
}

export default ProductClient
