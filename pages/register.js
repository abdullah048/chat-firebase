import React, { useContext, useEffect, useState } from 'react'
import { FiEye } from 'react-icons/fi'
import { FiEyeOff } from 'react-icons/fi'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { toast } from 'react-hot-toast'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '../firebase'
import { db } from '../firebase'
import { doc, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { AuthContext } from '../context/AuthContext'
import Link from 'next/link'

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    if (currentUser) {
      router.push('/')
    }
  }, [currentUser])

  const handleSubmit = e => {
    e.preventDefault()
    let displayName = ''
    if (e.target[0].value.length <= 8) {
      displayName = e.target[0].value
    } else {
      return toast.error('Display Name could be of max 8 characters')
    }

    const email = e.target[1].value
    const password = e.target[2].value
    const file = e.target[3].files[0]

    let promise = createUserWithEmailAndPassword(auth, email, password).then(
      userCredentials => {
        const user = userCredentials.user
        const storageRef = ref(storage, `Profile/${user.uid}`)
        const uploadFile = uploadBytesResumable(storageRef, file)

        uploadFile.on(
          'state_changed',
          snapshot => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log('Upload is ' + progress + '% done')
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused')
                break
              case 'running':
                console.log('Upload is running')
                break
            }
          },
          error => {
            toast.error(`Error:${error}`)
          },
          () => {
            getDownloadURL(uploadFile.snapshot.ref).then(downloadURL => {
              updateProfile(user, {
                displayName,
                photoURL: downloadURL
              })
              setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                email,
                displayName,
                photoURL: downloadURL
              })
              setDoc(doc(db, 'userChat', user.uid), {})
              router.push('/')
            })
          }
        )
      }
    )

    toast.promise(promise, {
      loading: 'Creating User...',
      success: <b>User Created!</b>,
      error: <b>Something went wrong!</b>
    })
  }
  return (
    <div className='bg-[#a7bcff] h-[100vh] w-[100%] flex items-center justify-center'>
      <div className='bg-white py-4 px-20 rounded-lg flex flex-col gap-3 items-center'>
        <span className='text-[#5d5d8d] font-bold text-2xl'>Chat-Firebase</span>
        <span className='text-[#5d5d8d] font-bold text-lg'>Register</span>
        <form className='flex flex-col gap-5 relative' onSubmit={handleSubmit}>
          <input
            className='p-2 border-b border-b-[#a7bcff] outline-none placeholder:text-slate-300 w-[300px]'
            type='text'
            placeholder='Display name'
          />
          <input
            className='p-2 border-b border-b-[#a7bcff] outline-none placeholder:text-slate-300'
            type='email'
            placeholder='Email'
          />
          <input
            className='p-2 border-b border-b-[#a7bcff] outline-none placeholder:text-slate-300'
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className='w-[20px] h-[20px] absolute top-[48%] left-[90%] text-[#a7bcff]'
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
          <input
            className='p-2 border-b border-b-[#a7bcff] outline-none placeholder:text-slate-300 hidden'
            type='file'
            id='file'
          />
          <label htmlFor='file' className='flex items-center relative'>
            <img
              className='w-[30px] cursor-pointer'
              src='/img/addAvatar.png'
              alt=''
            />
            <span className='text-[#7b96ec] cursor-pointer absolute left-[15%]'>
              Add an avatar
            </span>
          </label>
          <button className='bg-[#7b96ec] p-3 rounded-lg text-white text-lg cursor-pointer'>
            Sign up
          </button>
        </form>
        <p className='text-[#5d5d8d] text-sm mt-2'>
          You have an account? <Link href={'/login'}>Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
