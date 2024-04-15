"use client";
import React, { useEffect, useState } from "react";
import Heading from "./ui/Heading";

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
import { useRouter } from "next/navigation"; 
import { Store } from "@prisma/client";
import { useToast } from "./ui/use-toast";
import axios from "axios";
import { PiTrashSimpleBold } from "react-icons/pi";
import AlertDilog from "./Modals/alert-moal";
import Apialert from "./ui/api-alert";
import ActionTooltip from "./Tooltip";
import useOrigin from "@/hooks/use-origin";
import { Separator } from "./ui/separator";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

interface SettingFormProps {
  store: Store;
}

const SettingForm = ({ store }: SettingFormProps) => {
     const origin = useOrigin();
     
    const router = useRouter();
    const { toast } = useToast()
  const [IsLoading,setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        setIsLoading(true);
       const response = await axios.patch(`/api/stores/${store.id}/`,values)
       toast({
        variant:"success",
        title:"Store name is Updated"
       })
       router.prefetch(`/${store.id}/settings`);
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
       const response = await axios.delete(`/api/stores/${store.id}/`)
       toast({
        variant:"success",
        title:"Store deleted successfully"
       })
       router.prefetch(`/${store.id}/settings`);
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
  useEffect(() => {
    if (store.name) {
      form.setValue("name", store.name);
    }
  }, [form]);


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
     <Heading title="Setting" desc="manage the store prefernces" />
     <ActionTooltip label='Delete Store' side='bottom' >   
     <Button size={'icon'}
      onClick={()=>{setOpen(true)}}
      variant={"destructive"}  >
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store Name</FormLabel>
                <FormControl>
                  <Input placeholder={store.name} {...field} />
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
      description={`${origin}/api/${store.id}`}
      variant="public"
      />
    </div>
  );
};

export default SettingForm;
