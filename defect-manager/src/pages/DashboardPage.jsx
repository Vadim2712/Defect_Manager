import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import authService from '../services/authService'

export default function DashboardPage() {
    const user = authService.getCurrentUser()

    return (
        <Layout>
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Добро пожаловать, {user?.email}</h2>
                <p className="text-gray-600">Вы вошли как: <span className="font-semibold">{user?.role}</span></p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link to="/projects" className="block bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition">
                        <h3 className="text-lg font-bold mb-2">Проекты</h3>
                        <p className="text-gray-600">Управление проектами и объектами</p>
                    </Link>
                    <Link to="/defects" className="block bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition">
                        <h3 className="text-lg font-bold mb-2">Дефекты</h3>
                        <p className="text-gray-600">Создание и контроль дефектов</p>
                    </Link>
                    <Link to="/reports" className="block bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition">
                        <h3 className="text-lg font-bold mb-2">Аналитика</h3>
                        <p className="text-gray-600">Статистика и отчёты по дефектам</p>
                    </Link>
                </div>
            </div>
        </Layout>
    )
}
