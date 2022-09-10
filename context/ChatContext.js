import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState
} from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'

export const ChatContext = createContext()

export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext)

  const INITIAL_STATE = {
    user: {},
    chatId: 'null'
  }

  const chatReducer = (state, action) => {
    switch (action.type) {
      case 'CHANGE_USER':
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid
        }
      default:
        break
    }
  }

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  )
}
