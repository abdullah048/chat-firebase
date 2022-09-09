import { useContext } from 'react'
import Home from '../components/Home'
import { AuthContext } from '../context/AuthContext'
import Login from './login'

export default function Index() {
  const { currentUser } = useContext(AuthContext)
  return <div>{currentUser ? <Home /> : <Login />}</div>
}
