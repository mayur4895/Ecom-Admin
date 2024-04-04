"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-actions";

export type CategoryDataType = {
  id: string;
  name: string;
  billboardLabel:string;
  createdAt: string;
};

export const columns: ColumnDef<CategoryDataType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    accessorKey: "billboard",
    header: "billbaord",
    cell: ({ row }) => row.original.billboardLabel
  },
  {
    id: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
