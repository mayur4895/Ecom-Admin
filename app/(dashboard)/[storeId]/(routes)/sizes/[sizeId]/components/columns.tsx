"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-actions";
 
export type SizeDataType = {
  id: string;
  name: string;
  value: string;
   createdAt:string
}

export const columns: ColumnDef<SizeDataType>[] = [
   
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Size",
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
