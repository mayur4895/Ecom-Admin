import React from 'react'
import BillbaordClient from './components/client'

const Billboardpage = () => {
  return (
    <div className=' flex flex-col'>
      <div className='flex-1 space-x-8  p-8 pt-6'> 
       <BillbaordClient/>
       </div>
    </div>
  )
}

export default Billboardpage
