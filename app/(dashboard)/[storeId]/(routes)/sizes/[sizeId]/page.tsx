import prismadb from "@/lib/prismadb"; 
import SizeForm from "./components/SizeForm";

const SizePage = async ({
  params
}: {
  params: {
      sizeId: string;
  };
}) => {
  let Size;

  if (params.sizeId && params.sizeId !=="new") {
      Size = await prismadb.size.findFirst({
          where: {
              id: params.sizeId
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
