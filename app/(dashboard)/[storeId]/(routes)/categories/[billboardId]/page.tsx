import prismadb from "@/lib/prismadb";
import BillbaordForm from "./components/BillbaordForm";

const BillboardPage = async ({
  params
}: {
  params: {
      billboardId: string;
  };
}) => {
  let Billboard;

  if (params.billboardId && params.billboardId !=="new") {
      Billboard = await prismadb.billboard.findFirst({
          where: {
              id: params.billboardId
          }
      });
  } else {
    
      Billboard = null;
  }

  return (
      <div>
          <BillbaordForm initialData={Billboard} />
      </div>
  );
};

export default BillboardPage;
