import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req:Request, {params}:{params:{  colorId:string , storeId:string}}){
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
  
 
const color = await prismadb.color.updateMany({
    data:{
        name,
        value,
        storeId:params.storeId
    }
}) 

return  NextResponse.json(color,{status:200});


 } catch (error) {
   return new NextResponse("COLOR_SERVER_PATCH_ERROR",{status:500});
 }

}










export async function DELETE(req:Request, {params}:{params:{colorId:string, storeId:string}}){
    try {
       const {userId} =   auth();
       if(!userId){
         return new NextResponse("Unauthenticated",{status:400})
       } 
        if(!params.colorId){
            return new NextResponse("colorId is required",{status:400})
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

   const color = await prismadb.color.deleteMany({
       where:{
           id:params.colorId,  
           

       }
   })
   
   return  NextResponse.json(color,{status:200});
   
   
    } catch (error) {
      return new NextResponse("COLOR_SERVER_DELETE_ERROR",{status:500});
    }
   
   }





   

export async function GET(req:Request, {params}:{params:{colorId:string, storeId:string}}){
    try {  
        if(!params.colorId){
            return new NextResponse("colorId is required",{status:400})
        }

        

   const color = await prismadb.color.findFirst({
       where:{
           id:params.colorId,  
           

       }
   })
   
   return  NextResponse.json(color,{status:200});
   
   
    } catch (error) {
      return new NextResponse("color_SERVER_GET_ERROR",{status:500});
    }
   
   }