import React from 'react'

const Authlayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className=' flex justify-center items-center h-[100vh] w-full'>
      {children}
    </div>
  )
}

export default Authlayout
