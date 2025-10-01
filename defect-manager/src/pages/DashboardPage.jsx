import { useNavigate } from 'react-router-dom'
import authService from '../services/authService'
import Layout from '../components/Layout'

export default function DashboardPage() {
    const user = authService.getCurrentUser()
    const navigate = useNavigate()

    const handleLogout = () => {
        authService.logout()
        navigate('/login')
    }

    return (
        <Layout>
            <div className="bg-white p-6 rounded-xl shadow max-w-lg mx-auto space-y-4">
                <h2 className="text-2xl font-bold">Личный кабинет</h2>
                {user ? (
                    <>
                        <p><span className="font-semibold">Email:</span> {user.email}</p>
                        <p><span className="font-semibold">Роль:</span> {user.role}</p>
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                        >
                            Выйти
                        </button>
                    </>
                ) : (
                    <p>Пользователь не найден</p>
                )}
            </div>
        </Layout>
    )
}
