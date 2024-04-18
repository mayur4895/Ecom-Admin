import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LuCreditCard, LuIndianRupee, LuStore } from "react-icons/lu";
import { formatter } from "@/lib/utils";
import { BsCreditCard } from "react-icons/bs";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import { getTotalSales } from "@/actions/get-sales";
import { getStocks } from "@/actions/get-stocks";


interface OverViewPageProps{
    params:{
        storeId:string
    }
}

const OverViewPage = async({params}:OverViewPageProps) => {
    
    const Sales = await getTotalSales(params.storeId) 
    const revenue = await getTotalRevenue(params.storeId)
    const stocks = await getStocks(params.storeId)
  return (
    <div className="flex flex-col">
      <div className="flex-1 p-8 pt-6">
        <Heading title="DashBoard" desc="Overview of Your Store" />
        <Separator />
        <div className=" grid grid-cols-3 gap-x-4">
          <Card className="border-none ">
            <CardHeader className="flex flex-row  justify-between  items-center">
              <CardTitle>Revenue</CardTitle>
              <CardDescription><LuIndianRupee/></CardDescription>
            </CardHeader> 
            <CardContent>
                <div className=" text-xl  font-bold">
                    {formatter.format(revenue)}
                </div>
            </CardContent>
          </Card>
          <Card className="border-none">
            <CardHeader className="flex flex-row  justify-between  items-center">
              <CardTitle>Sales</CardTitle>
              <CardDescription><BsCreditCard/></CardDescription>
            </CardHeader> 
            
            <CardContent>
                <div className=" text-xl  font-bold">
                    +{Sales}
                </div>
            </CardContent>
          </Card>

          <Card className="border-none  ">
            <CardHeader className="flex flex-row  justify-between items-center">
              <CardTitle className=" whitespace-nowrap">Product Stocks</CardTitle>
              <CardDescription><LuStore/></CardDescription>
            </CardHeader> 
            
            <CardContent>
                <div className=" text-xl  font-bold">
                    {stocks}
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OverViewPage;
