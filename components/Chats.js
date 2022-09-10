import { doc, onSnapshot } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { db } from '../firebase'

const Chats = () => {
  const [chats, setChats] = useState([])
  const { currentUser } = useContext(AuthContext)
  const { dispatch } = useContext(ChatContext)

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, 'userChat', currentUser.uid), doc => {
        setChats(doc.data())
      })
      return () => {
        unsub()
      }
    }
    currentUser.uid && getChats()
  }, [currentUser.uid])

  const handleSelect = user => {
    dispatch({ type: 'CHANGE_USER', payload: user })
  }
  return (
    <div>
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map(chat => (
          <div
            onClick={() => handleSelect(chat[1].userInfo)}
            key={chat[0]}
            className='flex items-center p-3 gap-3 cursor-pointer hover:bg-[#2f2d52] hover:rounded-md text-white'
          >
            <img
              className='w-[50px] h-[50px] rounded-full object-cover'
              src={chat[1].userInfo.photoURL}
              alt=''
            />
            <div>
              <span className='font-medium'>
                {chat[1].userInfo.displayName}
              </span>
              <p className='text-sm'>{chat[1].latestMessage?.text}</p>
            </div>
          </div>
        ))}
    </div>
  )
}

export default Chats
