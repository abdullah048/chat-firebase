import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCpkZmEjWWYGJFKLiALIf0P1kMxzen4ijQ',
  authDomain: 'chat-firebase-9fd82.firebaseapp.com',
  projectId: 'chat-firebase-9fd82',
  storageBucket: 'chat-firebase-9fd82.appspot.com',
  messagingSenderId: '975182508420',
  appId: '1:975182508420:web:af3c5b3138472f6e5dadd1'
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()
