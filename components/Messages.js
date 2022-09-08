import React from 'react'
import Message from './Message'

const Messages = () => {
  return (
    <div className='overflow-scroll h-[78%] px-2 py-2'>
      <Message />
      <Message />
    </div>
  )
}

export default Messages
