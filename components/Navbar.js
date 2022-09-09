import React, { useContext } from 'react'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  const { currentUser } = useContext(AuthContext)
  console.log(currentUser)
  return (
    <>
      <div className='text-center text-white font-bold text-xl my-1'>
        Chat-Firebase
      </div>
      <div className='flex items-center bg-[#2f2d52] h-[50px] text-white p-1 justify-between m-2 rounded-md'>
        <div className='flex items-center gap-2'>
          <img
            className='h-[24px] w-[24px] bg-white rounded-full object-cover'
            src={`${currentUser.photoURL}`}
            alt=''
          />
          <span>{currentUser.displayName}</span>
        </div>
        <button
          className='bg-[#5d5d8b] p-1 rounded-sm text-xs cursor-pointer'
          onClick={() => auth.signOut()}
        >
          Log Out
        </button>
      </div>
    </>
  )
}

export default Navbar
