import prismadb from "@/lib/prismadb"; 
import SizeForm from "./components/SizeForm";

const SizePage = async ({
  params
}: {
  params: {
      storeId: string;
  };
}) => {
  let Size;

  if (params.storeId && params.storeId !=="new") {
      Size = await prismadb.size.findFirst({
          where: {
              id: params.storeId
          }
      });
  } else {
    
      Size = null;
  }

  return (
      <div>
          <SizeForm initialData={Size} />
      </div>
  );
};

export default SizePage;
