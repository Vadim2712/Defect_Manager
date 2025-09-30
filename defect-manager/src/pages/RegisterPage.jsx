import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import authService from '../services/authService'
import Layout from '../components/Layout'

export default function RegisterPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('engineer')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            authService.register({ email, password, role })
            navigate('/login')
        } catch (err) {
            setError('Пользователь с таким email уже существует')
        }
    }

    return (
        <Layout>
            <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-4 text-center">Регистрация</h2>
                {error && <p className="text-red-500 mb-3 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Пароль</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Роль</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                        >
                            <option value="engineer">Инженер</option>
                            <option value="manager">Менеджер</option>
                            <option value="tester">Тестировщик</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                    >
                        Зарегистрироваться
                    </button>
                </form>
                <p className="text-sm text-gray-600 mt-4 text-center">
                    Уже есть аккаунт? <Link to="/login" className="text-blue-600 hover:underline">Войти</Link>
                </p>
            </div>
        </Layout>
    )
}
