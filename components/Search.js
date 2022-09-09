import React, { useContext, useState } from 'react'
import { collection, doc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../firebase'
import { toast } from 'react-hot-toast'
import { AuthContext } from '../context/AuthContext'

const Search = () => {
  const [userName, setUserName] = useState('')
  const [user, setUser] = useState(null)
  const { currentUser } = useContext(AuthContext)

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
        <div className='flex items-center p-3 gap-3 cursor-pointer hover:bg-[#2f2d52] hover:rounded-md'>
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
