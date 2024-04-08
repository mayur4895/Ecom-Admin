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
import { Category, Color, Image, Product, Size } from "@prisma/client";

import axios from "axios";
import { PiTrashSimpleBold } from "react-icons/pi";

import useOrigin from "@/hooks/use-origin";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import AlertDilog from "@/components/Modals/alert-moal";
import ActionTooltip from "@/components/Tooltip";
import Imageuplode from "@/components/ui/image-uplode";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  name: z.string().min(1),
  images: z.object({ url: z.string() }).array(),
  price: z.coerce.number().min(1),
  categoryId: z.string().min(1),
  sizeId: z.string().min(1),
  storeId: z.string().min(1),
  colorId: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});

interface ProductProps {
  initialData:
    | (Product & {
        images: Image[];
      })
    | null;
  categories:Category[];
  colors:Color[];
  sizes:Size[];
}

const ProductForm: React.FC<ProductProps> = ({ 
  initialData ,
  categories,
  sizes,
  colors


}) => {
  const origin = useOrigin();
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [IsLoading, setIsLoading] = useState(false);

  const title = initialData ? "Edit Product" : "Create Product";
  const description = initialData ? "Edit a Product" : "Add  A new Product";
  const action = initialData ? "Save Changes" : "Create";
  const ToastMessage = initialData ? "Product Updated" : "Product Created";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          price: parseFloat(String(initialData.price)),
        }
      : {
          name: "",
          images: [],
          price: 0,
          categoryId: "",
          sizeId: "",
          colorId: "",
          isFeatured: false,
          isArchived: false,
        },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      console.log(values);
      
      if (initialData) {
        await axios.patch(
          `/api/${params?.storeId}/products/${params?.productId}`,
          values
        );
      } else {
        await axios.post(`/api/${params?.storeId}/products/`, values);
      }
      toast({
        variant: "success",
        title: ToastMessage,
      });

      router.refresh();

      window.location.assign(`/${params?.storeId}/products`);
      form.reset();
    } catch (error) {
      toast({
        variant: "danger",
        title: "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function DeleteStore() {
    try {
      setIsLoading(true);
      await axios.delete(
        `/api/${params?.storeId}/products/${params.productId}`
      );
      toast({
        variant: "success",
        title: "Billboard deleted successfully",
      });

      form.reset();
      window.location.assign(`/${params?.storeId}/products`);
    } catch (error) {
      toast({
        variant: "danger",
        title: "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const [Open, setOpen] = useState(false);

  return (
    <div className="px-5 pt-10 flex flex-1 gap-10 flex-col ">
      <AlertDilog
        isOpen={Open}
        title="Are You Sure?"
        description="Are you sure you want to delete this store?"
        onConfirm={() => {
          DeleteStore();
        }}
        Isloading={IsLoading}
        onClose={() => {
          setOpen(false);
        }}
      />
      <div className=" flex justify-between items-center">
        <Heading title={title} desc={description} />
        {params.productId != "new" && (
          <ActionTooltip label="Delete Billboard" side="bottom">
            <Button
              size={"icon"}
              onClick={() => {
                setOpen(true);
              }}
              variant={"destructive"}>
              <PiTrashSimpleBold size={16} />
            </Button>
          </ActionTooltip>
        )}
      </div>
      <Separator className="mt-0" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Images</FormLabel>
                <FormControl>
                  <Imageuplode
                    value={field.value.map((image) => image.url)}
                    onChange={(url) => {
                      field.onChange([...field.value, { url }]);
                    }}
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((current) => current.url != url),
                      ])
                    }
                    disabled={IsLoading}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder={"Enter Product Name"} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder={"99.9"} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />


<FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>category</FormLabel>
              <Select disabled={IsLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {
                    categories.map((category)=>{
                      return (
                        <SelectItem key={category.id}
                         value={category.id}
                        >
                          {category.name}
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


<FormField
          control={form.control}
          name="sizeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Size</FormLabel>
              <Select disabled={IsLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a size" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {
                    sizes.map((size)=>{
                      return (
                        <SelectItem key={size.id}
                         value={size.id}
                        >
                          {size.name}
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


<FormField
          control={form.control}
          name="colorId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <Select disabled={IsLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Color" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {
                    colors.map((color)=>{
                      return (
                        <SelectItem key={color.id}
                         value={color.id}
                        >
                          {color.name}
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
          
          <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem> 
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                  <FormControl>  
                    <div className=" flex items-center gap-x-4">
                      
                    <Checkbox id="featured" checked={field.value} onCheckedChange={field.onChange}/>
                    <div>
                      
                    <FormLabel htmlFor="featured">Featured</FormLabel><br />
                    <FormDescription>This product will display on Home page</FormDescription>
                    </div>
                    </div>
                  </FormControl>
                  </FormItem>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="isArchived"
              render={({ field }) => (
                <FormItem> 
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                  <FormControl>  
                    <div className=" flex items-center gap-x-4">
                      
                    <Checkbox id="Archived" checked={field.value} onCheckedChange={field.onChange}/>
                    
                    <div>
                      
                    <FormLabel htmlFor="Archived">Archived</FormLabel><br />
                    <FormDescription>This product will remove and not see anywhere</FormDescription>
                    </div>
                    </div>
                  </FormControl>
                  </FormItem>
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

export default ProductForm;
