"use client";
import React, {   useState } from "react";
import Heading from "@/components/ui/Heading";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl, 
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { auth } from "@clerk/nextjs";
import { redirect, useParams, useRouter } from "next/navigation"; 
import { Billboard, Store } from "@prisma/client";
 
import axios from "axios";
import { PiTrashSimpleBold } from "react-icons/pi";
  
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import AlertDilog from "@/components/Modals/alert-moal";
import ActionTooltip from "@/components/Tooltip"; 
import Imageuplode from "@/components/ui/image-uplode";

const formSchema = z.object({
  label: z.string().min(1, {
    message: "required.",
  }),
  imageUrl: z.string().min(1, {
    message: "required",
  }),
});

interface BillboardProps {
  initialData: Billboard  | null;
   
}

 const BillboardForm:React.FC<BillboardProps> = ({initialData}) => {
     
     const params = useParams();
    const router = useRouter();
    const { toast } = useToast()
  const [IsLoading,setIsLoading] = useState(false);
 
 
  
  const title =  initialData ? "Edit Billboard" : "Create Billboard"; 
  const  description =  initialData ? "Edit a Billboard" : "Add  A new Billboard";
  const  action = initialData ? "Save Changes" : "Create";
  const ToastMessage = initialData ? "Billboard Updated" : "Billboard Created";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      imageUrl:""
    },
  });
 

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        setIsLoading(true);
        if(initialData){
         await  axios.patch(`/api/${params?.storeId}/billboards/${params?.billboardId}`,values)
        }
        else{
          await axios.post(`/api/${params?.storeId}/billboards/`,values)
        }
        toast({
        variant:"success",
        title:ToastMessage
       })
     
       router.refresh(); 
       
       window.location.assign(`/${params?.storeId}/billboards`) 
       form.reset();
    } catch (error) {
        toast({
            variant:"danger",
            title:"Something went wrong"
        })
    }finally{
      setIsLoading(false);
    }
  }

  async function DeleteStore() {
    try {
        setIsLoading(true);
       await axios.delete(`/api/${params?.storeId}/billboards/${params.billboardId}`)
       toast({
        variant:"success",
        title: "Billboard deleted successfully"
       })
       
       
       form.reset(); 
          window.location.assign(`/${params?.storeId}/billboards`) 
    } catch (error) {
        toast({
            variant:"danger",
            title:"Something went wrong"
        })
    }finally{
      setIsLoading(false);
    }
  }
  
 
 

const [Open ,setOpen] = useState(false);

  return (
    <div className="px-5 pt-10 flex flex-1 gap-10 flex-col ">
     <AlertDilog 
     isOpen={Open}
     title="Are You Sure?"
     description="Are you sure you want to delete this store?"
     onConfirm={()=>{DeleteStore()}}
     Isloading={IsLoading}
     onClose={()=>{setOpen(false)}}
     />
     <div className=" flex justify-between items-center">
     <Heading title={title} desc={description} />
     { params.billboardId != "new" &&(
       <ActionTooltip label='Delete Billboard' side='bottom' >   
       <Button size={'icon'}
        onClick={()=>{setOpen(true)}}
        variant={"destructive"}  >
      <PiTrashSimpleBold  size={16}/> 
      </Button>
    </ActionTooltip>)
     }
      
     </div>
     <Separator className="mt-0"/>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem> 
                <FormLabel>Background Image</FormLabel>
                <FormControl>
                     <Imageuplode
                     value={field.value ? [field.value]:[] }
                     onChange={(url)=>{field.onChange(url)}}
                     onRemove={()=>field.onChange("")}
                     disabled={IsLoading}  
                     />

                </FormControl>
                 
              
              </FormItem>
            )}
          />
            <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-8"> 
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Billboard</FormLabel>
                <FormControl>
                  <Input placeholder={"Enter label"} {...field} />
                </FormControl>
               
                
              </FormItem>
            )}
          />
          </div>
          <Button type="submit">{action}</Button>
        </form>
      </Form>
   
    </div>
  );
};
 


export default BillboardForm;