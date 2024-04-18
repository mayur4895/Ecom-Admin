import prismadb from "@/lib/prismadb"

export const  getStocks= async(storeId:string)=>{
  
  

    const stocks = await prismadb.product.count({
        where:{
            storeId:storeId,
            isArchived:false
        }
    })


  return stocks;
}
 