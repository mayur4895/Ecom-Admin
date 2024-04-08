import React from "react";
import Apialert from "./api-alert";
import { useParams } from "next/navigation";
import useOrigin from "@/hooks/use-origin";

interface ApiListProps {
  entityName: string;
  entityNameId: string;
}
const ApiList = ({ entityName, entityNameId }: ApiListProps) => {
  const params = useParams();
  const origin = useOrigin(); 

  return (
    <><div className="flex-col gap-2 flex mt-4"> 
      <Apialert
        variant="public"
        title="GET"
        description={`${origin}/api/${params.storeId}/${entityName}`}
      />
      <Apialert
        variant="public"
        title="GET"
        description={`${origin}/api/${params.storeId}/${entityName}/${entityNameId}`}
      />

      <Apialert
        variant="admin"
        title="POST"
        description={`${origin}/api/${params.storeId}/${entityName}`}
      />

      <Apialert
        variant="admin"
        title="PATCH"
        description={`${origin}/api/${params.storeId}/${entityName}/${entityNameId}`}
      />
      <Apialert
        variant="admin"
        title="Delete"
        description={`${origin}/api/${params.storeId}/${entityName}/${entityNameId}`}
      />
    </div>
    </>
    
  );
};

export default ApiList;
