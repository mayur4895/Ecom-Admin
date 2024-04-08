import React, { useState } from 'react' 
import prismadb from '@/lib/prismadb'
import axios from 'axios';
import { useParams } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-table'; 
import {format} from "date-fns"; 
import { ColorDataType } from './[colorId]/components/columns';
import ColorClient from './[colorId]/components/client';




const Colorpage = async({
  params
}:{params:{storeId:string}}) => {
  
  
const colors = await prismadb.color.findMany({
  where:{
    storeId:params.storeId
  },orderBy:{
    createdAt: 'desc'
  }
})


const formatedColors:ColorDataType[] = colors.map((item)=>{
  return {
    id:item.id,
    name:item.name, 
    value:item.value,
    createdAt:format(item.createdAt,'MMMM do yyyy'), 
  }
})
  return (
    <div className=' flex flex-col'>
      <div className='flex-1 space-x-8  p-8 pt-6'> 
       <ColorClient  colors={formatedColors}/> 
       </div>
    </div>
  )
}

export default Colorpage
