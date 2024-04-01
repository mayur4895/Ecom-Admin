
import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export   async function POST(req:Request,{params}:{params:{storeId:string}}) {

     try {
         
        
        const {userId} =  auth();
        if(!userId){
         return new NextResponse("Unauthenticated" ,{status:400})
        }

         const {label,imageUrl} = await req.json();
         if(!label || !imageUrl){
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

      const billboard = await  prismadb.billboard.create({
         
        data:{
          label,
          imageUrl, 
          
          storeId:params.storeId
    
        }
      })

      return   NextResponse.json(billboard);
     } catch (error) {
       console.log(error)
       return new NextResponse("server error",{status:500})
     }
}




export   async function GET(req:Request,{params}:{params:{storeId:string}}) {

  try {
      
  
if(!params.storeId){
return new NextResponse("storeId is required",{status:400})
}  

   const billboards = await  prismadb.billboard.findMany({where: {storeId:params.storeId}});

   return   NextResponse.json(billboards);
  } catch (error) {
    console.log(error)
    return new NextResponse("server error",{status:500})
  }
}