import { Link } from 'react-router-dom'

export default function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <header className="bg-blue-600 text-white shadow-md">
                <div className="container mx-auto flex justify-between items-center px-6 py-4">
                    <h1 className="text-lg font-bold">Defect Manager</h1>
                    <nav className="space-x-4">
                        <Link to="/dashboard" className="hover:underline">Главная</Link>
                        <Link to="/projects" className="hover:underline">Проекты</Link>
                        <Link to="/defects" className="hover:underline">Дефекты</Link>
                        <Link to="/reports" className="hover:underline">Аналитика</Link>
                    </nav>
                </div>
            </header>
            <main className="flex-1 container mx-auto px-6 py-6">
                {children}
            </main>
            <footer className="bg-gray-800 text-white text-center py-3 text-sm">
                © 2025 Defect Manager
            </footer>
        </div>
    )
}
