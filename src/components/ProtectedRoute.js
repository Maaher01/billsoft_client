import { Navigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { useContext } from 'react'
import DefaultLayout from '../layout/DefaultLayout'

const ProtectedRoute = () => {
  const { isLoggedIn } = useContext(AuthContext)

  return isLoggedIn ? <DefaultLayout /> : <Navigate to={'/login'} replace />
}

export default ProtectedRoute
