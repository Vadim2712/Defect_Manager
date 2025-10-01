import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../services/authService'
import Layout from '../components/Layout'

export default function RegisterPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('инженер')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            authService.register({ email, password, role })
            navigate('/login')
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <Layout>
            <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">
                <h2 className="text-2xl font-bold mb-4">Регистрация</h2>
                {error && <p className="text-red-600 mb-2">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border p-2 rounded"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border p-2 rounded"
                        required
                    />
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full border p-2 rounded"
                    >
                        <option value="инженер">Инженер</option>
                        <option value="менеджер">Менеджер</option>
                        <option value="руководитель">Руководитель</option>
                    </select>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                        Зарегистрироваться
                    </button>
                </form>
            </div>
        </Layout>
    )
}
