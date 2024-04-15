import React from 'react' 
import prismadb from '@/lib/prismadb' 
import {format} from "date-fns";
import { SizeDataType } from './[sizeId]/components/columns';
import SizeClient from './[sizeId]/components/client';




const Sizepage = async({
  params
}:{params:{storeId:string}}) => {
  
  
const sizes = await prismadb.size.findMany({
  where:{
    storeId:params.storeId
  },orderBy:{
    createdAt: 'desc'
  }
})


const formatedSizes:SizeDataType[] = sizes.map((item)=>{
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
       <SizeClient sizes={formatedSizes}/> 
       </div>
    </div>
  )
}

export default Sizepage
