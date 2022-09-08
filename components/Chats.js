import React from 'react'

const Chats = () => {
  return (
    <div>
      <div className='flex items-center p-3 gap-3 cursor-pointer hover:bg-[#2f2d52] hover:rounded-md text-white'>
        <img
          className='w-[50px] h-[50px] rounded-full object-cover'
          src='https://images.pexels.com/photos/13107430/pexels-photo-13107430.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          alt=''
        />
        <div>
          <span className='font-medium'>Abdullah Shahbaz</span>
          <p className='text-sm'>Latest message</p>
        </div>
      </div>
    </div>
  )
}

export default Chats
