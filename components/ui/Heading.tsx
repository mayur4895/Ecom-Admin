import React from 'react'
import { PiTrashSimpleBold, PiTrashThin } from 'react-icons/pi';


interface HeadingProps{
    title: string;
    desc:string;
}

const Heading:React.FC<HeadingProps> = ({title,desc}) => {
  return (

     <div className=''>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{title}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>
   </div>
  )
}

export default Heading
