import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req:Request, {params}:{params:{  sizeId:string , storeId:string}}){
 try {
    const {userId} =   auth();
    if(!userId){
      return new NextResponse("unauthenticated",{status:400})
    }

  
    const {name , value} = await req.json();
    if(!name || !value){
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
  
 
const size = await prismadb.size.updateMany({
    data:{
        name,
        value,
        storeId:params.storeId
    }
})
console.log("Updated size",size);

return  NextResponse.json(size,{status:200});


 } catch (error) {
   return new NextResponse("Size_SERVER_PATCH_ERROR",{status:500});
 }

}










export async function DELETE(req:Request, {params}:{params:{sizeId:string, storeId:string}}){
    try {
       const {userId} =   auth();
       if(!userId){
         return new NextResponse("Unauthenticated",{status:400})
       } 
        if(!params.sizeId){
            return new NextResponse("sizeId is required",{status:400})
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

   const size = await prismadb.size.deleteMany({
       where:{
           id:params.sizeId,  
           

       }
   })
   
   return  NextResponse.json(size,{status:200});
   
   
    } catch (error) {
      return new NextResponse("size_SERVER_DELETE_ERROR",{status:500});
    }
   
   }





   

export async function GET(req:Request, {params}:{params:{sizeId:string, storeId:string}}){
    try {  
        if(!params.sizeId){
            return new NextResponse("sizeId is required",{status:400})
        }

        

   const size = await prismadb.size.findFirst({
       where:{
           id:params.sizeId,  
           

       }
   })
   
   return  NextResponse.json(size,{status:200});
   
   
    } catch (error) {
      return new NextResponse("size_SERVER_GET_ERROR",{status:500});
    }
   
   }