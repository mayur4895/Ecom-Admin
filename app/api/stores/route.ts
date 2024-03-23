
import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export   async function POST(req:Request) {

     try {
         
        
        const {userId} =   auth();
        if(!userId){
         return new NextResponse("unauthorized" ,{status:400})
        }

         const {name} = await req.json();
         if(!name){
           return new NextResponse("name is required" ,{status:400})
         }
      const store = await  prismadb.store.create({
        data:{
          name,
          userId
        }
      })

      return   NextResponse.json(store);
     } catch (error) {
       console.log(error)
       return new NextResponse("server error",{status:500})
     }
}