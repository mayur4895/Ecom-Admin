"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-actions";
 
export type ProductDataType = {
  id: string;
  name: string;
  desc:string;
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
    cell:({row})=><div className="w-max-40 truncate">{row.original.name}</div>
  },
  {
    accessorKey: "desc",
    header: "Description", 
    cell:({row})=><div className=" w-auto max-w-40 truncate">{row.original.desc}</div>
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
    cell:({row})=><div className=" whitespace-nowrap ">{row.original.createdAt}</div>
  },
  {
    id:"Actions",
    cell:({row})=><CellAction data={row.original}/>
  }
]
