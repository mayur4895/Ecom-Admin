import React, { useState } from 'react'
import BillbaordClient from './components/client'
import prismadb from '@/lib/prismadb'
import axios from 'axios';
import { useParams } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-table';
import { OrderDataType, columns } from './components/columns';
import {format} from "date-fns";
import { formatter } from '@/lib/utils';




const OrderPage = async({
  params
}:{params:{storeId:string}}) => {
  
  
const orders = await prismadb.order.findMany({
  where:{
    storeId:params.storeId
  },include:{
    orderItems:{
      include:{
        product:true
      }
    } 
  },orderBy:{
    createdAt: 'desc'
  }
})


const formattedOrders:OrderDataType[] = orders.map((item)=>{
  return {
    id:item.id,
    isPaid:item.isPaid,
    phone:item.phone,
    address:item.address,
    products:item.orderItems.map((item)=> item.product.name).join(', '),
    totalPrice: formatter.format(item.orderItems.reduce((total,item)=>{ 
      return total + Number(item.product.price)
    },0)) ,
    createdAt:format(item.createdAt,'MMMM do yyyy'), 
  }
})
  return (
    <div className=' flex flex-col'>
      <div className='flex-1 space-x-8  p-8 pt-6'> 
       <BillbaordClient orders={formattedOrders}/> 
       </div>
    </div>
  )
}

export default OrderPage
