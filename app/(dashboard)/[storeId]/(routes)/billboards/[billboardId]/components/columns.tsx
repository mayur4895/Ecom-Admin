"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-actions";
 
export type BillboardDataType = {
  id: string;
  label: string;
   createdAt:string
}

export const columns: ColumnDef<BillboardDataType>[] = [
   
  {
    accessorKey: "label",
    header: "Label",
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
