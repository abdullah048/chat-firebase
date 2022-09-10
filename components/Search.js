import React, { useContext, useState } from 'react'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where
} from 'firebase/firestore'
import { db } from '../firebase'
import { toast } from 'react-hot-toast'
import { AuthContext } from '../context/AuthContext'

const Search = () => {
  const [userName, setUserName] = useState('')
  const [user, setUser] = useState(null)
  const { currentUser } = useContext(AuthContext)

  const handleSelect = async user => {
    const chatId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid
    try {
      const res = await getDoc(doc(db, 'chats', chatId))
      if (!res.exists()) {
        await setDoc(doc(db, 'chats', chatId), { messages: [] })
        await updateDoc(doc(db, 'userChat', currentUser.uid), {
          [chatId + '.userInfo']: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },
          [chatId + '.date']: serverTimestamp()
        })
        await updateDoc(doc(db, 'userChat', user.uid), {
          [chatId + '.userInfo']: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [chatId + '.date']: serverTimestamp()
        })
      }
    } catch (error) {
      toast.error(`${error}`)
    }
    setUser(null)
    setUserName('')
  }

  const handleSearch = async () => {
    const collectionRef = collection(db, 'users')
    const q = query(collectionRef, where('displayName', '==', userName))
    try {
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach(doc => {
        setUser(doc.data())
      })
      querySnapshot.docs.length === 0 && toast.error('User not found!')
    } catch (error) {
      toast.error(`${error}`)
    }
  }

  const handleFunction = e => {
    e.code === 'Enter' && handleSearch()
  }

  return (
    <div className='border-b border-b-slate-300 text-white'>
      <div className='p-3'>
        <input
          type='text'
          className='outline-none border-none bg-transparent'
          placeholder='Find a user'
          value={userName}
          onChange={e => {
            setUserName(e.target.value)
          }}
          onKeyDown={handleFunction}
        />
      </div>
      {user && (
        <div
          className='flex items-center p-3 gap-3 cursor-pointer hover:bg-[#2f2d52] hover:rounded-md'
          onClick={() => handleSelect(user)}
        >
          <img
            className='w-[50px] h-[50px] rounded-full object-cover'
            src={`${user.photoURL}`}
            alt=''
          />
          <span className='font-medium'>{user.displayName}</span>
        </div>
      )}
    </div>
  )
}

export default Search
