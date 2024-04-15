'use client' 
 
import { Button } from '@/components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons' 
import { useParams, useRouter,   } from 'next/navigation'
  
import { Separator } from '@radix-ui/react-separator'
import { DataTable } from '@/components/ui/data-table'
import { BillboardDataType, columns } from './columns'
import Heading from '@/components/ui/Heading'
import ApiList from '@/components/ui/api-list'
 
interface BillboardClientProps{
  billboards:BillboardDataType[];
}
const BillboardClient = ({
  billboards
}:BillboardClientProps) => {
    const router = useRouter();
    const params = useParams(); 

  
     
   
     
 
  return (
      <div>
          <div className=" flex justify-between items-center">
     <Heading title={`Billboards(${billboards?.length})`} desc="manage the billobards prefernces" />
       
     <Button  
     className='flex gap-2'
      onClick={()=>{router.push(`/${params.storeId}/billboards/new`)}}   >
     <PlusIcon />
    create New
    </Button> 
      
     </div>
     
     <Separator/>
       <DataTable searchKey='label' columns={columns} data={billboards}/>
       


       <Heading title={`Api`} desc="billboards Api" />
       <Separator/>
       <ApiList 
       entityName='billboards'
       entityNameId='billboardId'
        
       />
    </div>
  )
}

export default BillboardClient
