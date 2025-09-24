import { Navigate } from 'react-router-dom'
import authService from '../services/authService'

export default function PrivateRoute({ children }) {
    const user = authService.currentUser()
    return user ? children : <Navigate to="/login" />
}
