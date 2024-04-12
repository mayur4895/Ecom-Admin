import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req:Request, {params}:{params:{  productId:string , storeId:string}}){
 try {
    const {userId} =   auth();
    if(!userId){
      return new NextResponse("unauthenticated",{status:400})
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
     


   
const storebyUser = await prismadb.store.findFirst({
    where:{
      id:params.storeId,
      userId
    }
  })
  if(!storebyUser){
    return new NextResponse("unauthorized" ,{status:403});
  }
  
 
 await prismadb.product.update({
  where:{
id:params.productId,
  },
  data:{
    name, 
    desc,
    price,
    categoryId,
    colorId,
    sizeId,
    images:{
      deleteMany:{}
    },
    isFeatured,
    isArchived
     

  }
})



 const product = await prismadb.product.update({
  where:{
    id:params.productId,
  },data:{
    images:{
      createMany:{
        data:[
          ...images.map((image:{url:string}) => image)
        ]
      }
    }
  }
 })

return  NextResponse.json(product,{status:200});


 } catch (error) {
   return new NextResponse("PRODUCT_SERVER_PATCH_ERROR",{status:500});
 }

}










export async function DELETE(req:Request, {params}:{params:{productId:string, storeId:string}}){
    try {
       const {userId} =   auth();
       if(!userId){
         return new NextResponse("Unauthenticated",{status:400})
       } 
        if(!params.productId){
            return new NextResponse("productId is required",{status:400})
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

   const product = await prismadb.product.deleteMany({
       where:{
           id:params.productId,   

       }
   })
   
   return  NextResponse.json(product,{status:200});
   
   
    } catch (error) {
      return new NextResponse("PRODUCT_SERVER_DELETE_ERROR",{status:500});
    }
   
   }





   

export async function GET(req:Request, {params}:{params:{productId:string, storeId:string}}){
    try {  
        if(!params.productId){
            return new NextResponse("productId is required",{status:400})
        }

        

   const product = await prismadb.product.findFirst({
       where:{
           id:params.productId,   

       },include:{
        images:true, 
        category:true,
        color:true,
        size:true
       }
   })
   
   return  NextResponse.json(product,{status:200});
   
   
    } catch (error) {
      return new NextResponse("PRODUCT_SERVER_GET_ERROR",{status:500});
    }
   
   }