import React from 'react'
import Messages from './Messages'
import Input from './Input'

const Chat = () => {
  return (
    <div className='flex-[2] bg-[#ddddf7] relative'>
      <div className='h-[50px] bg-[#5d5d8d] text-white flex items-center justify-center font-medium text-lg p-2'>
        <span>Abdullah</span>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat
