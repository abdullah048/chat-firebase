import React from 'react'

const Search = () => {
  return (
    <div className='border-b border-b-slate-300 text-white'>
      <div className='p-3'>
        <input
          type='text'
          className='outline-none border-none bg-transparent'
          placeholder='Find a user'
        />
      </div>
      <div className='flex items-center p-3 gap-3 cursor-pointer hover:bg-[#2f2d52] hover:rounded-md'>
        <img
          className='w-[50px] h-[50px] rounded-full object-cover'
          src='https://images.pexels.com/photos/13107430/pexels-photo-13107430.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          alt=''
        />
        <span className='font-medium'>Abdullah Shahbaz</span>
      </div>
    </div>
  )
}

export default Search
