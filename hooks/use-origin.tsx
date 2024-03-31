import { useEffect, useState } from "react"



const useOrigin = ()=>{

const [mounted,setmounted] = useState(false)

const origin = typeof window !== "undefined" && window.location.origin ? window.location.origin : "";

useEffect(()=>{
    setmounted(true)
},[setmounted])

if(!mounted){
    return null;
}

return origin;

}

export default useOrigin;