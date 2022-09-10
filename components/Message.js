import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

const Message = ({ message }) => {
  const [owner, setOwner] = useState(false)
  const [date, setDate] = useState(null)
  const { currentUser } = useContext(AuthContext)
  const ref = useRef(null)
  const {
    data: { user }
  } = useContext(ChatContext)

  useEffect(() => {
    if (message.senderId === currentUser.uid) {
      setOwner(true)
    }
  }, [message, currentUser])

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }, [message])

  useEffect(() => {
    setDate(new Date(message.date.seconds * 1000).toLocaleString())
  }, [message])

  console.log(date)
  return (
    <div
      ref={ref}
      className={
        owner ? 'flex flex-row-reverse gap-5 mb-3' : `flex gap-5 mb-3 `
      }
    >
      <div className='flex flex-col'>
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : user.photoURL
          }
          alt=''
          className='w-[40px] h-[40px] rounded-full object-cover'
        />
        <span className='text-sm text-slate-400'>{`${String(date).substr(
          10,
          17
        )}`}</span>
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
          {message.text}
        </p>
        {message.imgURL && (
          <img
            src={message.imgURL}
            alt=''
            className='object-cover w-[50%] rounded-md'
          />
        )}
      </div>
    </div>
  )
}

export default Message
