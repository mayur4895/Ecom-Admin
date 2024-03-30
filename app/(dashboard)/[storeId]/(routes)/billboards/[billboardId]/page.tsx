import prismadb from "@/lib/prismadb"
import BillbaordForm from "../components/BillbaordForm";

 

const BillboardPage = async({
    params
}:{
    params:{
        billboardId:string
    }
}) => {
    

     

//  const Billboard = await prismadb.billboard.findFirst({
//     where:{
//         id:params.billboardId
//     }
//  })


  return (
    <div>
        <BillbaordForm 
         intialData={null}
        />
 
    </div>
  )
}

export default BillboardPage
