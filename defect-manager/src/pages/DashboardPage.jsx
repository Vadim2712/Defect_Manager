import { Link, useNavigate } from 'react-router-dom'
import authService from '../services/authService'

export default function DashboardPage() {
    const user = authService.currentUser()
    const navigate = useNavigate()
    const handleLogout = () => {
        authService.logout()
        navigate('/login')
    }
    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">Панель управления</h1>
            <p>Вы вошли как: <b>{user?.email}</b> ({user?.role})</p>
            <nav className="space-x-4">
                <Link to="/projects" className="text-blue-500">Проекты</Link>
                <Link to="/defects" className="text-blue-500">Дефекты</Link>
            </nav>
            <button onClick={handleLogout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Выйти</button>
        </div>
    )
}
