'use client'
import ActionTooltip from '@/components/Tooltip'
 
import { Button } from '@/components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import { useModal } from '@/hooks/use-modal-store' 
import { useParams, useRouter,   } from 'next/navigation'
 
import { Separator } from '@radix-ui/react-separator'
import { DataTable } from '@/components/ui/data-table'
import { CategoryDataType, columns } from './columns'
import Heading from '@/components/ui/Heading'
import ApiList from '@/components/ui/api-list'
 
interface BillbaordClientProps{
  billboards:CategoryDataType[];
}
const BillbaordClient = ({
  billboards
}:BillbaordClientProps) => {
    const router = useRouter();
    const params = useParams();
    const { isOpen} = useModal();

  
     
   
     
 
  return (
      <div>
          <div className=" flex justify-between items-center">
     <Heading title={`Categories(${billboards?.length})`} desc="manage the Categories prefernces" />
       
     <Button  
     className='flex gap-2'
      onClick={()=>{router.push(`/${params.storeId}/billboards/new`)}}   >
     <PlusIcon />
    create New
    </Button> 
      
     </div>
     
     <Separator/>
       <DataTable searchKey='label' columns={columns} data={billboards}/>
       


       <Heading title={`Api`} desc="Categories Api" />
       <Separator/>
       <ApiList 
       entityName='billboards'
       entityNameId='billboardId'
        
       />
    </div>
  )
}

export default BillbaordClient
