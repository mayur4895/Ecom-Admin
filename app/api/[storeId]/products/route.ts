
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
          desc,
          images,
          price,
          categoryId,
          colorId,
          sizeId,
          isFeatured,
          isArchived


         } = await req.json();
       
      if(!name){
        return new NextResponse("name is required" ,{status:400})
      }
      if(!desc){
        return new NextResponse("desc is required" ,{status:400})
      }
      if(!images){
        return new NextResponse("images is required" ,{status:400})
      }
      if(!price){
        return new NextResponse("price is required" ,{status:400})
      }
      if(!categoryId){
        return new NextResponse("categoryId is required" ,{status:400})
      }
      if(!colorId){
        return new NextResponse("colorId is required" ,{status:400})
      }
      if(!sizeId){
        return new NextResponse("sizeId is required" ,{status:400})
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
          desc,
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

    const {searchParams} = new URL(req.url);

    const categoryId = searchParams.get('categoryId') || undefined;
    const colorId = searchParams.get('colorId') || undefined;
    const sizeId = searchParams.get('sizeId') || undefined;
    const isFeatured =searchParams.get('isFeatured') ;

    console.log(categoryId);
    console.log(colorId);
    console.log(sizeId);
    console.log(isFeatured);
    
    

  
if(!params.storeId){
return new NextResponse("storeId is required",{status:400})
}  
 

   const products = await  prismadb.product.findMany({ 
    where:{
    storeId:params.storeId,
    categoryId,
    colorId,
    sizeId, 
    isFeatured:isFeatured ? true :undefined,
    isArchived:false
  },include:{
    images:true,
    color:true,
    size:true,
    category:true
  },orderBy:{
    createdAt: 'desc'
  }

});

console.log(products);


   return   NextResponse.json(products);
  } catch (error) {
    console.log(error)
    return new NextResponse("server error",{status:500})
  }
}