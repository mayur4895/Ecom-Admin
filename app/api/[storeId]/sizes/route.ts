
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

      const size = await  prismadb.size.create({
         
        data:{
          name,
          value, 
          storeId:params.storeId
    
        }
      })

      return   NextResponse.json(size);
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

   const sizes = await  prismadb.size.findMany({where: {storeId:params.storeId}});

   return   NextResponse.json(sizes);
  } catch (error) {
    console.log(error)
    return new NextResponse("server error",{status:500})
  }
}