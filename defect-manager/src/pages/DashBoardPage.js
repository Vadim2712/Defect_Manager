import { useNavigate } from 'react-router-dom'
import authService from '../services/authService'

export default function DashboardPage() {
    const user = authService.currentUser()
    const navigate = useNavigate()

    const handleLogout = () => {
        authService.logout()
        navigate('/login')
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Панель управления</h1>
            <p className="mt-2">Вы вошли как: <b>{user?.email}</b> ({user?.role})</p>
            <button
                onClick={handleLogout}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
                Выйти
            </button>
        </div>
    )
}
