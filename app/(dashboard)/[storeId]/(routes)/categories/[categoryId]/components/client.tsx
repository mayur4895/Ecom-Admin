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
 
interface CategoryClientProps{
  categories:CategoryDataType[];
}
const CategoryClient = ({
  categories
}:CategoryClientProps) => {
    const router = useRouter();
    const params = useParams();
    const { isOpen} = useModal();
 
      
   
     
 
  return (
      <div>
          <div className=" flex justify-between items-center">
     <Heading title={`Categories(${categories?.length})`} desc="manage the Categories prefernces" />
       
     <Button  
     className='flex gap-2'
      onClick={()=>{router.push(`/${params.storeId}/categories/new`)}}   >
     <PlusIcon />
    create New
    </Button> 
      
     </div>
     
     <Separator/>
       <DataTable searchKey='label' columns={columns} data={categories}/> 


       <Heading title={`Api`} desc="Categories Api" />
       <Separator/>
       <ApiList 
       entityName='categories'
       entityNameId='categoryId'
        
       />
    </div>
  )
}

export default CategoryClient
