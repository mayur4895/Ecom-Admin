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
import { Color} from "@prisma/client";
import axios from "axios";
import { PiTrashSimpleBold } from "react-icons/pi";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import AlertDilog from "@/components/Modals/alert-moal";
import ActionTooltip from "@/components/Tooltip";  

const formSchema = z.object({
  name: z.string().min(1, {
    message: "required.",
  }),
  value: z.string().min(4).regex(/^#/,{
    message:"String must be valid hex color code"
  }),
});

interface ColorProps {
  initialData: Color  | null; 
} 


 const ColorForm:React.FC<ColorProps> = ({initialData}) => { 
     const params = useParams();
    const router = useRouter();
    const { toast } = useToast()
  const [IsLoading,setIsLoading] = useState(false);
 
 
  
  const title =  initialData ? "Edit Color" : "Create Color"; 
  const  description =  initialData ? "Edit a Color" : "Add  A new Color";
  const  action = initialData ? "Save Changes" : "Create";
  const ToastMessage = initialData ? "Color Updated" : "Color Created";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:initialData || {
      name: "",
      value:""
    },
  });
 

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        setIsLoading(true);
        if(initialData){
         await  axios.patch(`/api/${params?.storeId}/colors/${params?.colorId}`,values)
        }
        else{
          await axios.post(`/api/${params?.storeId}/colors/`,values)
        }
        toast({
        variant:"success",
        title:ToastMessage
       })
     
       form.reset(); 
       window.location.assign(`/${params?.storeId}/colors`)
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
       await axios.delete(`/api/${params?.storeId}/colors/${params.colorId}`)
       toast({
        variant:"success",
        title: "Size deleted successfully"
       }) 
       router.refresh(); 
        window.location.assign(`/${params?.storeId}/colors`)
 
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
console.log(initialData);

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
     { params.colorId != "new" &&(
       <ActionTooltip label='Delete Color' side='bottom' >   
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
                  <Input placeholder={"Enter Color Name"} {...field} />
                </FormControl>
               
                
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <FormControl>
                  <div className="flex gap-x-4 items-centerp"> 
                  <Input placeholder={"Enter Color value"} {...field} />
                  <div style={{background:field.value}} className=" p-4 border rounded-full shadow-md"></div>
                  </div>
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
 


export default ColorForm;