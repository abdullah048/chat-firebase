import React, { useState } from 'react'

const Message = () => {
  const [owner, setOwner] = useState(false)
  return (
    <div
      className={
        owner ? 'flex flex-row-reverse gap-5 mb-3' : `flex gap-5 mb-3 `
      }
    >
      <div className='flex flex-col'>
        <img
          src='https://images.pexels.com/photos/13107430/pexels-photo-13107430.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          alt=''
          className='w-[40px] h-[40px] rounded-full object-cover'
        />
        <span className='text-sm text-slate-400'>Just Now</span>
      </div>

      <div
        className={
          owner
            ? 'max-w-[80%] flex flex-col gap-2 justify-center items-end'
            : ' max-w-[80%] flex flex-col gap-2 justify-center'
        }
      >
        <p
          style={{
            borderRadius: owner ? '10px 0px 10px 10px' : '0px 10px 10px 10px'
          }}
          className={
            owner
              ? 'py-2 px-5 bg-[#8da4f1] text-white max-w-max'
              : 'py-2 px-5 max-w-max bg-white'
          }
        >
          Hello
        </p>
        <img
          src='https://images.pexels.com/photos/13107430/pexels-photo-13107430.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          alt=''
          className='object-cover w-[50%] rounded-md'
        />
      </div>
    </div>
  )
}

export default Message
