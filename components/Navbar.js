import React from 'react'

const Navbar = () => {
  return (
    <>
      <div className='text-center text-white font-bold text-xl my-1'>
        Chat-Firebase
      </div>
      <div className='flex items-center bg-[#2f2d52] h-[50px] text-white p-1 justify-between m-2 rounded-md'>
        <div className='flex items-center gap-2'>
          <img
            className='h-[24px] w-[24px] bg-white rounded-full object-cover'
            src='https://images.pexels.com/photos/13107430/pexels-photo-13107430.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
            alt=''
          />
          <span>Abdullah</span>
        </div>
        <button className='bg-[#5d5d8b] p-1 rounded-sm text-xs cursor-pointer'>
          Log Out
        </button>
      </div>
    </>
  )
}

export default Navbar
