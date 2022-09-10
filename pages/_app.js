import { Toaster } from 'react-hot-toast'
import '../styles/globals.css'
import { AuthContextProvider } from '../context/AuthContext'
import { ChatContextProvider } from '../context/ChatContext'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Toaster />
      <AuthContextProvider>
        <ChatContextProvider>
          <Component {...pageProps} />
        </ChatContextProvider>
      </AuthContextProvider>
    </>
  )
}

export default MyApp
