'use client'
import ActionTooltip from '@/components/Tooltip'
 
import { Button } from '@/components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import { useModal } from '@/hooks/use-modal-store' 
import { useParams, useRouter,   } from 'next/navigation'
import prismadb from '@/lib/prismadb'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Size } from '@prisma/client'
import { Separator } from '@radix-ui/react-separator'
import { DataTable } from '@/components/ui/data-table'
import { ColorDataType, columns } from './columns'
import Heading from '@/components/ui/Heading'
import ApiList from '@/components/ui/api-list'
 
interface ColorClientProps{
  colors:ColorDataType[];
}
const ColorClient = ({
  colors
}:ColorClientProps) => {
    const router = useRouter();
    const params = useParams(); 

  
     
   
     
 
  return (
      <div>
          <div className=" flex justify-between items-center">
     <Heading title={`colors(${colors?.length})`} desc="manage the Colors prefernces" />
       
     <Button  
     className='flex gap-2'
      onClick={()=>{router.push(`/${params.storeId}/colors/new`)}}   >
     <PlusIcon />
    create New
    </Button> 
      
     </div>
     
     <Separator/>
       <DataTable searchKey='name' columns={columns} data={colors}/>
       


       <Heading title={`Api`} desc="colors Api" />
       <Separator/>
       <ApiList 
       entityName='colors'
       entityNameId='colorId'
        
       />
    </div>
  )
}

export default ColorClient
