import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req:Request, {params}:{params:{storeId:string}}){
 try {
    const {userId} =   auth();
    if(!userId){
      return new NextResponse("unauthorized",{status:400})
    }
    const {name} = await req.json();
    if(!name){
      return new NextResponse("name is required",{status:400})
}

const store = await prismadb.store.updateMany({
    where:{
        id:params.storeId,
        userId
    },data:{
        name
    }
})

return  NextResponse.json(store,{status:200});


 } catch (error) {
   return new NextResponse("SERVER_PATCH_ERROR",{status:500});
 }

}










export async function DELETE(req:Request, {params}:{params:{storeId:string}}){
    try {
       const {userId} =   auth();
       if(!userId){
         return new NextResponse("unauthorized",{status:400})
       }
    
   const store = await prismadb.store.deleteMany({
       where:{
           id:params.storeId,
           userId
       }
   })
   
   return  NextResponse.json(store,{status:200});
   
   
    } catch (error) {
      return new NextResponse("SERVER_DELETE_ERROR",{status:500});
    }
   
   }