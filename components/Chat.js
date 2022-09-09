import React, { useContext } from 'react'
import Messages from './Messages'
import Input from './Input'
import { AuthContext } from '../context/AuthContext'

const Chat = () => {
  const { currentUser } = useContext(AuthContext)
  return (
    <div className='flex-[2] bg-[#ddddf7] relative'>
      <div className='h-[50px] bg-[#5d5d8d] text-white flex items-center justify-center font-medium text-lg p-2'>
        <span>{currentUser.displayName}</span>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat
