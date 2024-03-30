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
import { redirect, useParams, useRouter, useSearchParams } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { Billboard, Store } from "@prisma/client";
 
import axios from "axios";
import { PiTrashSimpleBold } from "react-icons/pi";
 
import useOrigin from "@/hooks/use-origin";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import AlertDilog from "@/components/Modals/alert-moal";
import ActionTooltip from "@/components/Tooltip";
import Apialert from "@/components/ui/api-alert";

const formSchema = z.object({
  label: z.string().min(1, {
    message: "Username must be at least 2 characters.",
  }),
  imageUrl: z.string().min(1, {
    message: "Username must be at least 2 characters.",
  }),
});

interface BillbaordProps {
  intialData: Billboard  | null;
}

 const BillbaordForm = ({ intialData }: BillbaordProps) => {
     const origin = useOrigin();
     const params = useParams();
    const router = useRouter();
    const { toast } = useToast()
  const [IsLoading,setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: "",
      imageUrl:""
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        setIsLoading(true);
       const response = await axios.patch(`/api/stores/${params?.id}/`,values)
       toast({
        variant:"success",
        title:"Store name is Updated"
       })
       router.prefetch(`/${params?.id}/settings`);
       router.refresh();
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
       const response = await axios.delete(`/api/stores/${params?.id}/`)
       toast({
        variant:"success",
        title:"Store deleted successfully"
       })
       router.prefetch(`/${params?.id}/settings`);
       router.refresh();
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
  
//   useEffect(() => {
//     if (intialData?.name) {
//       form.setValue("name", intialData?.name);
//     }
//   }, [form]);



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
     <Heading title="Billbaords" desc="manage the billboards prefernces" />
     <ActionTooltip label='Delete Store' side='bottom' >   
     <Button size={'icon'}
      onClick={()=>{setOpen(true)}}
      variant={"outline"} className=' bg-red-600 cursor-pointer  hover:bg-red-500 hover:text-white rounded-md text-white   w-10 h-10 flex items-center justify-center' >
    <PiTrashSimpleBold  size={16}/> 
    </Button>
  </ActionTooltip>
      
     </div>
     <Separator className="mt-0"/>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-8"> 
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder={"hii"} {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
          <Button type="submit">Save Changes</Button>
        </form>
      </Form>
 
      <Apialert 
      title="NEXT_PUBLIC_API_URL"
      description={`${origin}/api/${params?.id}`}
      variant="public"
      />
    </div>
  );
};
 


export default BillbaordForm;