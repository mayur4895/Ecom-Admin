import prismadb from "@/lib/prismadb"; 
import CategoryForm from "./components/CatgoryForm";

const CategoryPage = async ({
  params
}: {
  params: {
      categoryId: string;
      billboardId: string;
  };
}) => {
  let category;

  if (params.categoryId && params.categoryId !=="new") {
      category = await prismadb.category.findFirst({
          where: {
              id: params.categoryId
          }
      });
  } else {
    
      category = null;
  }


  const billboards = await prismadb.billboard.findMany({
    where:{
      id:params.billboardId
    },
    orderBy:{
      createdAt: 'desc'
    }
  })

  return (
      <div>
          <CategoryForm initialData={category}  billboards={billboards}/>
      </div>
  );
};

export default CategoryPage;
