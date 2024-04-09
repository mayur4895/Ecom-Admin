"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-actions";
 
export type ProductDataType = {
  id: string;
  name: string;
  isFeatured: boolean;
  color: string;
  size: string;
  category: string;
  isArchived: boolean;
  price: string | number;
  createdAt:string
}

export const columns: ColumnDef<ProductDataType>[] = [
   
  {
    accessorKey: "name",
    header: "Name", 
  },
  {
    accessorKey: "price",
    header: "Price",
  },{
    accessorKey: "isFeatured", 
    header: "Featured", 
  },{
    accessorKey: "isArchived", 
    header: "Archived",
  },{
    accessorKey: "color",
    header: "Color",
    cell:({row})=><div className="flex gap-x-4 items-center w-32 justify-between">
    {row.original.color}
    <div>
    <div style={{background:row.original.color}} className=" p-4 border rounded-full shadow-md"></div>

    </div>
  </div>
  },{
    accessorKey: "size",
    header: "Size",
  },{
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id:"Actions",
    cell:({row})=><CellAction data={row.original}/>
  }
]
