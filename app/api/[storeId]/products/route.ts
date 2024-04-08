
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

         const {
          name,
          images,
          price,
          categoryId,
          colorId,
          sizeId,
          isFeatured,
          isArchived


         } = await req.json();
         if(!name || !images || !price || !categoryId || !colorId || !sizeId || !isFeatured || !isArchived){
           return new NextResponse("required fields" ,{status:400})
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

      const product = await  prismadb.product.create({
         
        data:{
          name,
          storeId:params.storeId,
          images:{
            createMany:{
              data:[
                ...images.map((image:{url:string}) => image)
              ]
            }
          },
          price,
          categoryId,
          colorId,
          sizeId,
          isFeatured,
          isArchived
           
    
        }
      })

      return   NextResponse.json(product);
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

   const products = await  prismadb.product.findMany({where: {storeId:params.storeId}});

   return   NextResponse.json(products);
  } catch (error) {
    console.log(error)
    return new NextResponse("server error",{status:500})
  }
}