import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../services/authService'

export default function RegisterPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('engineer')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleRegister = () => {
        if (!email || !password) {
            setError('Введите email и пароль')
            return
        }
        authService.register({ email, password, role })
        navigate('/login')
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-4">
            <h1 className="text-2xl font-bold">Регистрация</h1>
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
            <select
                className="border p-2 rounded w-64"
                value={role}
                onChange={e => setRole(e.target.value)}
            >
                <option value="engineer">Инженер</option>
                <option value="manager">Менеджер</option>
                <option value="director">Руководитель</option>
            </select>
            {error && <p className="text-red-500">{error}</p>}
            <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleRegister}
            >
                Зарегистрироваться
            </button>
        </div>
    )
}
