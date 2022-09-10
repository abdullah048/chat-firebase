import React, { useContext, useState } from 'react'
import { BiSend } from 'react-icons/bi'
import { IoIosAttach } from 'react-icons/io'
import { ImFilePicture } from 'react-icons/im'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc
} from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { db, storage } from '../firebase'
import { v4 as uuid } from 'uuid'
import { toast } from 'react-hot-toast'

const Input = () => {
  const [text, setText] = useState('')
  const [img, setImg] = useState(null)

  const { currentUser } = useContext(AuthContext)
  const {
    data: { user, chatId }
  } = useContext(ChatContext)

  const handleSubmit = async () => {
    if (img) {
      const storageRef = ref(storage, `ChatImg/${currentUser.uid}`)
      const uploadFile = uploadBytesResumable(storageRef, img)
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
          getDownloadURL(uploadFile.snapshot.ref).then(async downloadURL => {
            await updateDoc(doc(db, 'chats', chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                imgURL: downloadURL,
                senderId: currentUser.uid,
                date: Timestamp.now()
              })
            })
          })
        }
      )
    } else {
      await updateDoc(doc(db, 'chats', chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now()
        })
      })
    }

    await updateDoc(doc(db, 'userChat', currentUser.uid), {
      [chatId + '.latestMessage']: {
        text
      },
      [chatId + '.date']: serverTimestamp()
    })
    await updateDoc(doc(db, 'userChat', user.uid), {
      [chatId + '.latestMessage']: {
        text
      },
      [chatId + '.date']: serverTimestamp()
    })
    setText('')
    setImg(null)
  }

  return (
    <div className='h-[60px] w-[100%] bg-white p-2 absolute top-[89%] flex items-center justify-between'>
      <input
        type='text'
        className='border-none outline-none w-[75%]'
        placeholder='Type something'
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <div className='flex gap-2 items-center'>
        <IoIosAttach className='text-[#5d5d8d] cursor-pointer w-[20px] h-[20px]' />
        <input
          type='file'
          id='file'
          className='hidden'
          onChange={e => setImg(e.target.files[0])}
        />
        <label htmlFor='file'>
          <ImFilePicture className='text-[#5d5d8d] cursor-pointer w-[20px] h-[20px]' />
        </label>
        <BiSend
          onClick={handleSubmit}
          className='text-[#5d5d8d] cursor-pointer w-[20px] h-[20px]'
        />
      </div>
    </div>
  )
}

export default Input
