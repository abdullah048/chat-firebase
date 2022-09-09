import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { FiEye } from 'react-icons/fi'
import { FiEyeOff } from 'react-icons/fi'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { useRouter } from 'next/router'
import { AuthContext } from '../context/AuthContext'
import Link from 'next/link'

const Login = () => {
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
    let email
    let password
    if (e.target[0].value.length != 0 && e.target[1].value.length != 0) {
      email = e.target[0].value
      password = e.target[1].value
      const promise = signInWithEmailAndPassword(auth, email, password).then(
        userCredentials => {}
      )

      toast.promise(promise, {
        loading: 'Logging In...',
        success: <b>Logged In!</b>,
        error: <b>Please enter valid email & password!</b>
      })
    } else {
      toast.error('Please enter your email & password')
    }
  }
  return (
    <div className='bg-[#a7bcff] h-[100vh] w-[100%] flex items-center justify-center'>
      <div className='bg-white py-4 px-20 rounded-lg flex flex-col gap-3 items-center'>
        <span className='text-[#5d5d8d] font-bold text-2xl'>Chat-Firebase</span>
        <span className='text-[#5d5d8d] font-bold text-lg'>Login</span>
        <form className='flex flex-col gap-5 relative' onSubmit={handleSubmit}>
          <input
            className='p-2 border-b border-b-[#a7bcff] outline-none placeholder:text-slate-300 w-[300px]'
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
            className='w-[20px] h-[20px] absolute top-[43%] left-[90%] text-[#a7bcff]'
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>

          <button className='bg-[#7b96ec] p-3 rounded-lg text-white text-lg cursor-pointer'>
            Login
          </button>
        </form>
        <p className='text-[#5d5d8d] text-sm mt-2'>
          Don't have an account? <Link href={'/register'}>Register</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
