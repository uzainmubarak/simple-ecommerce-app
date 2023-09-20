import React from 'react'


const SubmitButton = (props) => {
  return (
    <input className='
    w-full
    py-1
    cursor-pointer
    bg-none
    border-2
    border-solid
    border-red-100
    rounded-[5px] 
    text-red-900
    hover:bg-red-100
    ease-in duration-100
    ' 
    {...props} />
  )
}

export default SubmitButton