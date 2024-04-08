import React, { useState } from 'react' 
import prismadb from '@/lib/prismadb'
import axios from 'axios';
import { useParams } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-table'; 
import {format} from "date-fns";
import { ProductDataType } from './[productId]/components/columns';
import ProductClient from './[productId]/components/client';
import { formatter } from '@/lib/utils';




const Productpage = async({
  params
}:{params:{storeId:string}}) => {
  
  
const products = await prismadb.product.findMany({
  where:{
    storeId:params.storeId
  },include:{
     color:true,
     size:true,
     category:true
  },orderBy:{
    createdAt: 'desc'
  }
})


const formatedProducts:ProductDataType[] = products.map((item)=>{
  return {
    id:item.id,
    name:item.name,  
    isArchived: item.isArchived,
    isFeatured: item.isFeatured,
    color:item.color.value,
    size:item.size.name,
    category:item.category.name,
    price:formatter.format(item.price), 
    createdAt:format(item.createdAt,'MMMM do yyyy'), 
  }
})
  return (
    <div className=' flex flex-col'>
      <div className='flex-1 space-x-8  p-8 pt-6'> 
       <ProductClient products={formatedProducts}/> 
       </div>
    </div>
  )
}

export default Productpage
