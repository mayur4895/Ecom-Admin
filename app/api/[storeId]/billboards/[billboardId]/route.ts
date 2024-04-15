import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req:Request, {params}:{params:{  billboardId:string , storeId:string}}){
 try {
    const {userId} =   auth();
    if(!userId){
      return new NextResponse("unauthenticated",{status:400})
    }

  
    const {label , imageUrl} = await req.json();
    if(!label || !imageUrl){
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
  
 
const billbaord = await prismadb.billboard.updateMany({
    data:{
        label,
        imageUrl,
        storeId:params.storeId
    }
}) 

return  NextResponse.json(billbaord,{status:200});


 } catch (error) {
   return new NextResponse("BILLBOARD_SERVER_PATCH_ERROR",{status:500});
 }

}










export async function DELETE(req:Request, {params}:{params:{billboardId:string, storeId:string}}){
    try {
       const {userId} =   auth();
       if(!userId){
         return new NextResponse("Unauthenticated",{status:400})
       } 
        if(!params.billboardId){
            return new NextResponse("billboardId is required",{status:400})
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

   const billbaord = await prismadb.billboard.deleteMany({
       where:{
           id:params.billboardId,  
           

       }
   })
   
   return  NextResponse.json(billbaord,{status:200});
   
   
    } catch (error) {
      return new NextResponse("BILLBOARD_SERVER_DELETE_ERROR",{status:500});
    }
   
   }





   

export async function GET(req:Request, {params}:{params:{billboardId:string, storeId:string}}){
    try {  
        if(!params.billboardId){
            return new NextResponse("billboardId is required",{status:400})
        }

        

   const billbaord = await prismadb.billboard.findFirst({
       where:{
           id:params.billboardId,  
           

       }
   })
   
   return  NextResponse.json(billbaord,{status:200});
   
   
    } catch (error) {
      return new NextResponse("BILLBOARD_SERVER_GET_ERROR",{status:500});
    }
   
   }