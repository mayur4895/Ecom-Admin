import { ColumnDef } from "@tanstack/react-table" 
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { BsThreeDotsVertical } from "react-icons/bs"
import { LuCopy, LuFileEdit, LuPen, LuTrash } from "react-icons/lu"
import { useParams, useRouter } from "next/navigation"
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"
import AlertDilog from "@/components/Modals/alert-moal"
import { useState } from "react"
import { CategoryDataType } from "./columns"
  


interface cellActionProps{
    data:CategoryDataType,
     
}

export const CellAction:React.FC<cellActionProps> = ({
    data, 
     
})=>{
    const params = useParams();
    const router = useRouter();

    const [IsLoading,setIsLoading] = useState(false);

    const [Open ,setOpen] = useState(false);
    const { toast } = useToast()

    
  async function DeleteStore() {
    try {
        setIsLoading(true);
       await axios.delete(`/api/${params?.storeId}/categories/${data.id}`)
       toast({
        variant:"success",
        title: "Category deleted successfully"
       }) 
       router.refresh();
       router.push(`/${params?.storeId}/categories`)
       
    } catch (error) {
        toast({
            variant:"danger",
            title:"Something went wrong"
        })
    }finally{
      setIsLoading(false);
    }
  }

       
    return(
    <>
    <AlertDilog 
     isOpen={Open}
     title="Are You Sure?"
     description="Are you sure you want to delete this store?"
     onConfirm={()=>{DeleteStore()}}
     Isloading={IsLoading}
     onClose={()=>{setOpen(false)}}
     />
    <DropdownMenu>
  <DropdownMenuTrigger>
  <BsThreeDotsVertical /> 
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Actions</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem
              className="flex gap-2"
              onClick={() => navigator.clipboard.writeText(data.id)}
            >
                <LuCopy/>
              Copy Category ID
    </DropdownMenuItem>
    <DropdownMenuItem className="flex gap-2"
    onClick={()=>{router.push(`/${params.storeId}/categories/${data.id}`)}}
    > <LuPen />Update</DropdownMenuItem>
    <DropdownMenuItem 
    onClick={()=>{setOpen(true)}}
    className="flex gap-2"> <LuTrash/> Delete</DropdownMenuItem> 
  </DropdownMenuContent>
</DropdownMenu>

    </>
        )
}
