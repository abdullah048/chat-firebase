import { Toaster } from 'react-hot-toast'
import '../styles/globals.css'
import { AuthContextProvider } from '../context/AuthContext'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Toaster />
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </>
  )
}

export default MyApp
