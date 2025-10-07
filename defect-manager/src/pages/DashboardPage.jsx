import { Link, useNavigate } from 'react-router-dom'
import authService from '../services/authService'

export default function DashboardPage() {
    const navigate = useNavigate()
    const user = authService.getCurrentUser()

    if (!user) return navigate('/login')

    const commonCards = [
        { title: 'Проекты', desc: 'Просмотр проектов', to: '/projects' },
    ]

    const roleCards = {
        инженер: [
            { title: 'Мои дефекты', desc: 'Просмотр и работа с дефектами', to: '/defects' },
            { title: 'Проекты', desc: 'Список проектов', to: '/projects' }
        ],
        менеджер: [
            { title: 'Создать проект', desc: 'Добавить новый проект', to: '/projects' },
            { title: 'Управление дефектами', desc: 'Назначать исполнителей', to: '/defects' },
            { title: 'Аналитика', desc: 'Просмотр отчётов', to: '/reports' }
        ],
        руководитель: [
            { title: 'Аналитика', desc: 'Просмотр прогресса', to: '/reports' },
            { title: 'Проекты', desc: 'Просмотр проектов', to: '/projects' }
        ]
    }

    const cards = roleCards[user.role] || commonCards

    return (
        <div className="space-y-6">
            <div className="card flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-brand-accent">Добро пожаловать, {user.email}</h1>
                    <p className="text-gray-300">Роль: {user.role}</p>
                </div>
                <div className="flex gap-3">
                    <Link to="/dashboard" className="btn btn-ghost">Профиль</Link>
                    <button onClick={() => { authService.logout(); navigate('/login') }} className="btn btn-primary">Выйти</button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {cards.map(c => (
                    <Link key={c.to} to={c.to} className="card hover:shadow-lg transition block">
                        <h3 className="font-semibold text-lg text-brand-accent">{c.title}</h3>
                        <p className="text-gray-300">{c.desc}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}
