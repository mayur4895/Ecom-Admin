import prismadb from "@/lib/prismadb"

export const getTotalRevenue= async(storeId:string)=>{
  
 
 const paidOrders = await prismadb.order.findMany({
    where:{
        storeId:storeId,
        isPaid:true,
    },include:{
        orderItems:{
            include:{
                product:true
            }
        }
    }
 }) 



 const TotalRevenue =  paidOrders.reduce((total,order)=>{
const orderTotal = order.orderItems.reduce((ordersum,item)=>{
return ordersum  + item.product.price
},0)
return total+orderTotal
 },0)
  
  
 return TotalRevenue;
}
 