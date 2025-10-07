import { Link, useLocation } from 'react-router-dom'
import authService from '../services/authService'

export default function Layout({ children }) {
    const user = authService.getCurrentUser()
    const location = useLocation()

    const navItems = [
        { to: '/dashboard', label: 'Главная', show: !!user },
        { to: '/projects', label: 'Проекты', show: !!user },
        { to: '/defects', label: 'Дефекты', show: user && (user.role === 'инженер' || user.role === 'менеджер') },
        { to: '/reports', label: 'Аналитика', show: user && (user.role === 'менеджер' || user.role === 'руководитель') },
    ]

    function renderRoleLink() {
        if (!user) return null
        if (user.role === 'инженер') return { to: '/engineer', label: 'Инженер' }
        if (user.role === 'менеджер') return { to: '/manager', label: 'Менеджер' }
        if (user.role === 'руководитель') return { to: '/leader', label: 'Руководитель' }
        return null
    }

    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-brand-medium shadow-sm">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link to="/dashboard" className="text-brand-accent font-bold text-lg">Defect Manager</Link>
                        <nav className="flex items-center gap-3">
                            {navItems.filter(n => n.show).map(n => (
                                <Link
                                    key={n.to}
                                    to={n.to}
                                    className={location.pathname === n.to ? 'nav-pill-accent' : 'nav-pill'}
                                >
                                    {n.label}
                                </Link>
                            ))}

                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        {user ? (
                            <>
                                <span className="text-sm text-gray-300">Роль: {user.role}</span>
                                <Link to="/dashboard" className="text-xs text-gray-300 hover:text-white">Профиль</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="nav-pill">Войти</Link>
                                <Link to="/register" className="nav-pill">Регистрация</Link>
                            </>
                        )}
                    </div>
                </div>
            </header>

            <main className="flex-1 container mx-auto px-4 py-6">{children}</main>

            <footer className="bg-brand-medium text-center py-4 text-sm text-gray-400">
                © 2025 Defect Manager — корпоративная система учёта дефектов
            </footer>
        </div>
    )
}
