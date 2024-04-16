import { NextResponse } from "next/server";
import Stripe from "stripe";
import {stripe} from '@/lib/stripe'
import prismadb from "@/lib/prismadb";
import { url } from "inspector";



const CorsHeaders = {

        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
        "Access-Control-Allow-Headers": "Authorization,content-type",
        // "Access-Control-Allow-Credentials": true,

}


export async function OPTIONS(){
    return NextResponse.json({}, {headers: CorsHeaders})
}

export async function POST(req:Request,{params}:{params:{storeId:string}}){


 

       const {productIds} = await req.json();
       if(!productIds || productIds.length === 0){
          return new NextResponse("productIds not found",{status:400});
       }
       if(!params.storeId){
        return NextResponse.json({message: "storeId is not found"});
       } 
 

       const products = await prismadb.product.findMany({
        where:{
            id:{
                in:productIds
            }
        }
       })
      
       const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =[];
       
       products.forEach(product => {
        line_items.push({
            price_data: {
                currency: "INR",
                product_data: {
                    name: product.name,
                },
                unit_amount: product.price * 100,
            },
            quantity: 1,
        });
       })

      console.log(productIds.map((productId:string) => productId));
      
       
    const order = await prismadb.order.create({
        data: {
            storeId: params.storeId,
            isPaid: false,
            orderItems: {
                create: productIds.map((productId: string) => ({
                    product: {
                        connect: {
                            id: productId
                        }
                    }
                }))
            }
        }
    })
       

       const session = await stripe.checkout.sessions.create({
           line_items,
           mode: 'payment',
           billing_address_collection:"required",
           phone_number_collection:{
            enabled:true
           },

           success_url: `${process.env.FRONTEND_STORE_URL}/cart/success=1`,
           cancel_url: `${process.env.FRONTEND_STORE_URL}/cart/canceld=1`,
           metadata:{
            order_id:order.id
           }
       });
       
       return NextResponse.json({url:session.url},{
        headers:CorsHeaders,
       }); 
};