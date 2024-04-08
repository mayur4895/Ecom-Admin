import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const formatter  = new Intl.NumberFormat("en-IN" ,{
  style:'currency',
  currency:'INR',
  minimumFractionDigits:2,
  maximumFractionDigits:2,

})