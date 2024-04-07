import React, { useState } from 'react' 
import prismadb from '@/lib/prismadb'
import axios from 'axios';
import { useParams } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-table'; 
import {format} from "date-fns";
import CategoryClient from './[categoryId]/components/client';
import { CategoryDataType } from './[categoryId]/components/columns';




const Categorypage = async({
  params
}:{params:{storeId:string}}) => {
  
  
const Categories = await prismadb.category.findMany({
  where:{
    storeId:params.storeId
  },include: {
billboard:true
  },
  orderBy:{
    createdAt: 'desc'
  }
})

console.log(Categories);



const formatedCategories:CategoryDataType[] = Categories.map((item)=>{
  return {
    id:item.id,
    name:item.name, 
    billboardLabel:item.billboard.label, 
    createdAt:format(item.createdAt,'MMMM do yyyy'), 
  }
})
  return (
    <div className=' flex flex-col'>
      <div className='flex-1 space-x-8  p-8 pt-6'> 
       <CategoryClient categories={formatedCategories}/> 
       </div>
    </div>
  )
}

export default Categorypage
