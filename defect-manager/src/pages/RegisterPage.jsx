import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import authService from '../services/authService'

export default function RegisterPage() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('инженер')
    const [error, setError] = useState('')

    const handleRegister = (e) => {
        e.preventDefault()
        try {
            authService.register(email, password, role)
            navigate('/login')
        } catch {
            setError('Ошибка регистрации, пользователь уже существует')
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-brand-dark text-white">
            <form onSubmit={handleRegister} className="bg-brand-medium p-8 rounded-2xl w-full max-w-md shadow-lg space-y-4">
                <h1 className="text-2xl font-bold text-center text-brand-accent mb-2">Регистрация</h1>
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

                <select
                    className="input"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                >
                    <option value="инженер">Инженер</option>
                    <option value="менеджер">Менеджер</option>
                    <option value="руководитель">Руководитель</option>
                </select>

                <button className="btn btn-primary w-full">Зарегистрироваться</button>

                <p className="text-sm text-center text-gray-400">
                    Уже есть аккаунт?{' '}
                    <Link to="/login" className="text-brand-accent hover:underline">
                        Войти
                    </Link>
                </p>
            </form>
        </div>
    )
}
