'use client'
import ActionTooltip from '@/components/Tooltip'
import Heading from '@/components/ui/Heading'
import { Button } from '@/components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import { useModal } from '@/hooks/use-modal-store' 
import { useParams, useRouter,   } from 'next/navigation'
 

const BillbaordClient = () => {
    const router = useRouter();
    const params = useParams();
    const { isOpen} = useModal();
 
  return (
      <div>
          <div className=" flex justify-between items-center">
     <Heading title="Billbaord (0)" desc="manage the billobards prefernces" />
       
     <Button  
     className='flex gap-2'
      onClick={()=>{router.push(`/${params.storeId}/billboards/new`)}}   >
     <PlusIcon />
    create New
    </Button> 
      
     </div>
    </div>
  )
}

export default BillbaordClient
