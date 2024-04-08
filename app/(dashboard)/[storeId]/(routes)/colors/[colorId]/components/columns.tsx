"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-actions";
 
export type ColorDataType = {
  id: string;
  name: string;
  value: string;
   createdAt:string
}

export const columns: ColumnDef<ColorDataType>[] = [
   
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Color",
    cell:({row})=><div className="flex gap-x-4 items-center w-40 justify-between">
      {row.original.value}
      <div>
      <div style={{background:row.original.value}} className=" p-4 border rounded-full shadow-md"></div>

      </div>
    </div>
  
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
