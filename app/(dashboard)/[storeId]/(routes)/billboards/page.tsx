import React, { useState } from 'react'
import BillbaordClient from './[billboardId]/components/client'
import prismadb from '@/lib/prismadb'
import axios from 'axios';
import { useParams } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-table';
import { BillboardDataType, columns } from './[billboardId]/components/columns';
import {format} from "date-fns";




const Billboardpage = async({
  params
}:{params:{storeId:string}}) => {
  
  
const billboards = await prismadb.billboard.findMany({
  where:{
    storeId:params.storeId
  },orderBy:{
    createdAt: 'desc'
  }
})


const formatedBillboards:BillboardDataType[] = billboards.map((item)=>{
  return {
    id:item.id,
    label:item.label, 
    createdAt:format(item.createdAt,'MMMM do yyyy'), 
  }
})
  return (
    <div className=' flex flex-col'>
      <div className='flex-1 space-x-8  p-8 pt-6'> 
       <BillbaordClient billboards={formatedBillboards}/> 
       </div>
    </div>
  )
}

export default Billboardpage
