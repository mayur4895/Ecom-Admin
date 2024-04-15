"use client" 
import { ColumnDef } from "@tanstack/react-table" 
 
export type OrderDataType = {
  id: string; 
  phone: string;
  address: string;
  isPaid: boolean;
  products: String;
  totalPrice: String;  

  createdAt:string
}

export const columns: ColumnDef<OrderDataType>[] = [
   
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
   
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
    },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  
]
