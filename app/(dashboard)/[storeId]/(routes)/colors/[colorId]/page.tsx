import prismadb from "@/lib/prismadb";  
import ColorForm from "./components/ColorForm";

const SizePage = async ({
  params
}: {
  params: {
      colorId: string;
  };
}) => {
  let Color;

  if (params.colorId && params.colorId !=="new") {
      Color = await prismadb.color.findFirst({
          where: {
              id: params.colorId
          }
      });
  } else {
    
      Color = null;
  }

  return (
      <div>
          <ColorForm initialData={Color} />
      </div>
  );
};

export default SizePage;
