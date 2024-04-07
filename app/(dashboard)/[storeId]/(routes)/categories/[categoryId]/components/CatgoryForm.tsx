"use client";
import React, { useEffect, useState } from "react";
import Heading from "@/components/ui/Heading";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { auth } from "@clerk/nextjs";
import { redirect, useParams, useRouter } from "next/navigation"; 
import { Billboard, Category, Store } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import axios from "axios";
import { PiTrashSimpleBold } from "react-icons/pi";
 
import useOrigin from "@/hooks/use-origin";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import AlertDilog from "@/components/Modals/alert-moal";
import ActionTooltip from "@/components/Tooltip"; 
import Imageuplode from "@/components/ui/image-uplode";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "required.",
  }),
  billboardId: z.string().min(1, {
    message: "required",
  }),
});

interface CategoryProps {
  initialData: Category  | null;
  billboards: Billboard[];
   
}

 const CategoryForm:React.FC<CategoryProps> = ({initialData ,billboards}) => {
     const origin = useOrigin();
     const params = useParams();
    const router = useRouter();
    const { toast } = useToast()
  const [IsLoading,setIsLoading] = useState(false);
 
 
  
  const title =  initialData ? "Edit Category" : "Create Category"; 
  const  description =  initialData ? "Edit a Category" : "Add  A new Category";
  const  action = initialData ? "Save Changes" : "Create";
  const ToastMessage = initialData ? "Category Updated" : "Category Created";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      billboardId:""
    },
  });
 

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        setIsLoading(true);
        if(initialData){
         await  axios.patch(`/api/${params?.storeId}/categories/${params?.categoryId}`,values)
        }
        else{
          await axios.post(`/api/${params?.storeId}/categories/`,values)
        }
        toast({
        variant:"success",
        title:ToastMessage
       })
     
       router.refresh();
       router.push(`/${params?.storeId}/categories`)
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
       await axios.delete(`/api/${params?.storeId}/categories/${params.categoryId}`)
       toast({
        variant:"success",
        title: "Billboard deleted successfully"
       })
       
       router.refresh();
       router.push(`/${params?.storeId}/categories`)
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
     { params.categoryId != "new" &&(
       <ActionTooltip label='Delete Store' side='bottom' >   
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
                <FormLabel>Categories</FormLabel>
                <FormControl>
                  <Input placeholder={"Enter Category Name"} {...field} />
                </FormControl> 
              </FormItem>
            )}
          />
          <div> 
          <FormField
          control={form.control}
          name="billboardId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Billboard</FormLabel>
              <Select disabled={IsLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Billboard" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {
                    billboards.map((billboard)=>{
                      return (
                        <SelectItem key={billboard.id}
                         value={billboard.id}
                        >
                          {billboard.label}
                        </SelectItem>
                      )
                    })
                  }
              
                </SelectContent>
              </Select> 
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
         
          </div>
          <Button type="submit">{action}</Button>
        </form>
      </Form>
   
    </div>
  );
};
 


export default CategoryForm;