"use cleint";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
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

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
});

import React, { useState } from "react";
import Modal from "../ui/modal";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";

const StoreModal = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "CreateStore";

  const { toast } = useToast();
  const [IsLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const res = await axios.post("/api/stores", values);
      form.reset();
      toast({
        variant: "success",
        title: "Store is Created",
      });
      window.location.assign(`/${res.data.id}`);
    } catch (error) {
      toast({
        variant: "danger",
        title: "Something went wrong",
      });
      setIsLoading(false);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Modal
      title="Create Your Store"
      isOpen={isModalOpen}
      onClose={onClose}
      description="Add New Store to manage products and categories">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Store Name" {...field} />
                </FormControl>
                <FormDescription>This is your Store name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className=" flex justify-end  space-x-2">
            <Button variant="outline" disabled={IsLoading} onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={IsLoading}>
              {IsLoading ? "Loadding..." : "Continue"}{" "}
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default StoreModal;
