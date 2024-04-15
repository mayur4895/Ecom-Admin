import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req:Request, {params}:{params:{  categoryId:string , storeId:string}}){
 try {
    const {userId} =   auth();
    if(!userId){
      return new NextResponse("unauthenticated",{status:400})
    }

  
    const {name , billboardId} = await req.json();
    if(!name || ! billboardId){
      return new NextResponse("all fields arre required",{status:400})
}


   
const storebyUser = await prismadb.store.findFirst({
    where:{
      id:params.storeId,
      userId
    }
  })
  if(!storebyUser){
    return new NextResponse("unauthorized" ,{status:403});
  }
  
  
const category = await prismadb.category.updateMany({
    data:{
         name,
        billboardId,
        storeId:params.storeId
    }
}) 

return  NextResponse.json(category,{status:200});


 } catch (error) {
   return new NextResponse("category_SERVER_PATCH_ERROR",{status:500});
 }

}










export async function DELETE(req:Request, {params}:{params:{categoryId:string, storeId:string}}){
    try {
       const {userId} =   auth();
       if(!userId){
         return new NextResponse("Unauthenticated",{status:400})
       } 
        if(!params.categoryId){
            return new NextResponse("categoryId is required",{status:400})
        }

       const storebyUser = await prismadb.store.findFirst({
        where:{
          id:params.storeId,
          userId
        }
      })
      if(!storebyUser){
        return new NextResponse("unauthorized" ,{status:403});
      }

   const category = await prismadb.category.deleteMany({
       where:{
           id:params.categoryId,  
           

       }
   })
   
   return  NextResponse.json(category,{status:200});
   
   
    } catch (error) {
      return new NextResponse("category_SERVER_DELETE_ERROR",{status:500});
    }
   
   }





   

export async function GET(req:Request, {params}:{params:{categoryId:string, storeId:string}}){
    try {  
        if(!params.categoryId){
            return new NextResponse("categoryId is required",{status:400})
        } 

        

   const category = await prismadb.category.findFirst({
       where:{
           id:params.categoryId, 
             
       } ,   include:{billboard:true}
   }) 
    
   return  NextResponse.json(category,{status:200});
   
   
    } catch (error) {
      return new NextResponse("category_SERVER_GET_ERROR",{status:500});
    }
   
   }