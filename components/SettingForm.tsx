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
import { auth } from "@clerk/nextjs";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { store } from "@prisma/client";
import { useToast } from "./ui/use-toast";
import axios from "axios";
import { PiTrashSimpleBold } from "react-icons/pi";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

interface SettingFormProps {
  store: store;
}

const SettingForm = ({ store }: SettingFormProps) => {
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
    }
  }

  async function DeleteStore() {
    try {
        console.log("hiii");
        
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
    }
  }
  useEffect(() => {
    if (store.name) {
      form.setValue("name", store.name);
    }
  }, [form]);
  return (
    <div className="px-5 pt-10 flex flex-1 gap-10 flex-col ">
     <div className=" flex justify-between items-center">
     <Heading title="Setting" desc="manage the store" />
     <Button size={'icon'}
      onClick={()=>{DeleteStore()}}
      variant={"outline"} className=' bg-red-600 cursor-pointer  hover:bg-red-500 hover:text-white rounded-md text-white   w-10 h-10 flex items-center justify-center' >
    <PiTrashSimpleBold  size={22}/>
 
    </Button>
     </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-8"> 
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
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
    </div>
  );
};

export default SettingForm;
