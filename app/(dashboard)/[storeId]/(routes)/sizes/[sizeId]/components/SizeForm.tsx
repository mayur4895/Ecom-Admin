"use client";
import React, { useState } from "react";
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input"; 
import { useParams, useRouter } from "next/navigation"; 
import { Size, Store } from "@prisma/client";
 
import axios from "axios";
import { PiTrashSimpleBold } from "react-icons/pi";
 
import useOrigin from "@/hooks/use-origin";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import AlertDilog from "@/components/Modals/alert-moal";
import ActionTooltip from "@/components/Tooltip";  

const formSchema = z.object({
  name: z.string().min(1, {
    message: "required.",
  }),
  value: z.string().min(1, {
    message: "required",
  }),
});

interface SizeProps {
  initialData: Size  | null;
   
}

 const SizeForm:React.FC<SizeProps> = ({initialData}) => {
     const origin = useOrigin();
     const params = useParams();
    const router = useRouter();
    const { toast } = useToast()
  const [IsLoading,setIsLoading] = useState(false);
 
 
  
  const title =  initialData ? "Edit Size" : "Create Size"; 
  const  description =  initialData ? "Edit a Size" : "Add  A new Size";
  const  action = initialData ? "Save Changes" : "Create";
  const ToastMessage = initialData ? "Size Updated" : "Size Created";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      value:""
    },
  });
 
 

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        setIsLoading(true);
        if(initialData){
         await  axios.patch(`/api/${params?.storeId}/sizes/${params?.sizeId}`,values)
        }
        else{
          await axios.post(`/api/${params?.storeId}/sizes/`,values)
        }
        toast({
        variant:"success",
        title:ToastMessage
       })
     
       form.reset();
       window.location.assign(`/${params?.storeId}/sizes`)
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
       await axios.delete(`/api/${params?.storeId}/sizes/${params.sizeId}`)
       toast({
        variant:"success",
        title: "Size deleted successfully"
       })
       
       form.reset();
       window.location.assign(`/${params?.storeId}/sizes`)
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
     { params.sizeId != "new" &&(
       <ActionTooltip label='Delete Size' side='bottom' >   
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

       
            <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-8"> 
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>name</FormLabel>
                <FormControl>
                  <Input placeholder={"Enter Size Name"} {...field} />
                </FormControl>
               
                
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Size</FormLabel>
                <FormControl>
                  <Input placeholder={"Enter Size value"} {...field} />
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
 


export default SizeForm;