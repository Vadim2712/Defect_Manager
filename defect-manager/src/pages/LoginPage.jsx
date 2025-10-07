import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import authService from '../services/authService'

export default function LoginPage() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleLogin = (e) => {
        e.preventDefault()
        try {
            authService.login(email, password)
            navigate('/dashboard')
        } catch {
            setError('Неверный логин или пароль')
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-brand-dark text-white">
            <form onSubmit={handleLogin} className="bg-brand-medium p-8 rounded-2xl w-full max-w-md shadow-lg space-y-4">
                <h1 className="text-2xl font-bold text-center text-brand-accent mb-2">Вход в систему</h1>
                {error && <div className="text-red-400 text-center text-sm">{error}</div>}

                <input
                    className="input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    className="input"
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button className="btn btn-primary w-full">Войти</button>

                <p className="text-sm text-center text-gray-400">
                    Нет аккаунта?{' '}
                    <Link to="/register" className="text-brand-accent hover:underline">
                        Зарегистрироваться
                    </Link>
                </p>
            </form>
        </div>
    )
}
