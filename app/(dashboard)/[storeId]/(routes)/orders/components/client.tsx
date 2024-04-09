'use client'
 
import { Button } from '@/components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons' 
import { useParams, useRouter,   } from 'next/navigation' 
import { Separator } from '@radix-ui/react-separator'
import { DataTable } from '@/components/ui/data-table'
import { OrderDataType, columns } from './columns'
import Heading from '@/components/ui/Heading'
import ApiList from '@/components/ui/api-list'
 
interface OrderClientProps{
  orders:OrderDataType[];
}
const BillboardClient = ({
  orders
}:OrderClientProps) => {
    const router = useRouter();
    const params = useParams(); 

  
     
   
     
 
  return (
      <div>
          <div className=" flex justify-between items-center">
     <Heading title={`orders(${orders?.length})`} desc="Orders Are see Here" />
        
      
     </div>
     
     <Separator/>
       <DataTable searchKey='products' columns={columns} data={orders}/> 
    </div>
  )
}

export default BillboardClient
