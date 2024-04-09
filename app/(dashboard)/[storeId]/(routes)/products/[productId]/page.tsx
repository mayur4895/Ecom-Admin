import prismadb from "@/lib/prismadb"; 
import ProductForm from "./components/ProductForm"; 

const ProductPage = async ({
  params
}: {
  params: {
    storeId:string,
      productId: string;
  };
}) => {
  let Product;

  if (params.productId && params.productId !=="new") {
      Product = await prismadb.product.findFirst({
          where: {
              id: params.productId
          },include:{
           color:true,
           size:true,
           category:true,
           images:true
          }
      });
  } else {
    
      Product = null;
  }


  const sizes = await prismadb.size.findMany({
    where:{
      storeId:params.storeId
    },orderBy:{
      createdAt: 'desc'
    }
  })

  const categories = await prismadb.category.findMany({
    where:{
      storeId:params.storeId
    },orderBy:{
      createdAt: 'desc'
    }
  })


  const colors = await prismadb.color.findMany({
    where:{
      storeId:params.storeId
    },orderBy:{
      createdAt: 'desc'
    }
  })


  return (
      <div>
          <ProductForm initialData={Product} sizes={sizes} colors={colors} categories={categories} />
      </div>
  );
};

export default ProductPage;
