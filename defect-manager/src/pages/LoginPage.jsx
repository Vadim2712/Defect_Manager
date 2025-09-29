import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import authService from '../services/authService.js'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleLogin = () => {
        const user = authService.login(email, password)
        if (user) {
            navigate('/dashboard')
        } else {
            setError('Неверный email или пароль')
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-4">
            <h1 className="text-2xl font-bold">Вход</h1>
            <input
                type="email"
                placeholder="Email"
                className="border p-2 rounded w-64"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Пароль"
                className="border p-2 rounded w-64"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500">{error}</p>}
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleLogin}
            >
                Войти
            </button>
            <p>
                Нет аккаунта? <Link to="/register" className="text-blue-500">Регистрация</Link>
            </p>
        </div>
    )
}
