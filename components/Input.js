import React from 'react'
import { BiSend } from 'react-icons/bi'
import { IoIosAttach } from 'react-icons/io'
import { ImFilePicture } from 'react-icons/im'

const Input = () => {
  return (
    <div className='h-[60px] w-[100%] bg-white p-2 absolute top-[89%] flex items-center justify-between'>
      <input
        type='text'
        className='border-none outline-none w-[75%]'
        placeholder='Type something'
      />
      <div className='flex gap-2 items-center'>
        <IoIosAttach className='text-[#5d5d8d] cursor-pointer w-[20px] h-[20px]' />
        <input type='file' id='file' className='hidden' />
        <label htmlFor='file'>
          <ImFilePicture className='text-[#5d5d8d] cursor-pointer w-[20px] h-[20px]' />
        </label>
        <BiSend className='text-[#5d5d8d] cursor-pointer w-[20px] h-[20px]' />
      </div>
    </div>
  )
}

export default Input
