
import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs'; 
import { NextResponse } from 'next/server';

export   async function POST(req:Request,{params}:{params:{storeId:string}}) {

     try {
         
        
        const {userId} =  auth();
        if(!userId){
         return new NextResponse("Unauthenticated" ,{status:400})
        }

         const {name,value} = await req.json();
         if(!name || !value){
           return new NextResponse("name is required" ,{status:400})
         }
   if(!params.storeId){
  return new NextResponse("storeId is required",{status:400})
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

      const color = await  prismadb.color.create({
         
        data:{
          name,
          value, 
          storeId:params.storeId
    
        }
      })

      return   NextResponse.json(color);
     } catch (error) {
       console.log(error)
       return new NextResponse("COLOR_server_error",{status:500})
     }
}




export   async function GET(req:Request,{params}:{params:{storeId:string}}) {

  try { 
  
if(!params.storeId){
return new NextResponse("storeId is required",{status:400})
}  

   const colors = await  prismadb.color.findMany({where: {storeId:params.storeId}});

   return   NextResponse.json(colors);
  } catch (error) {
    console.log(error)
    return new NextResponse("server error",{status:500})
  }
}