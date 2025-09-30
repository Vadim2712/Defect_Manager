import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import defectService from '../services/defectService'
import { STATUSES } from '../utils/constants'

export default function DefectsPage() {
    const [defects, setDefects] = useState([])
    const [search, setSearch] = useState('')
    const [status, setStatus] = useState('')

    useEffect(() => {
        setDefects(defectService.getAll())
    }, [])

    const filtered = defects.filter(d =>
        d.title.toLowerCase().includes(search.toLowerCase()) &&
        (status === '' || d.status === status)
    )

    return (
        <Layout>
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Дефекты</h2>

                <div className="flex flex-col md:flex-row gap-3">
                    <input
                        type="text"
                        placeholder="Поиск по названию..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                    />
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                    >
                        <option value="">Все статусы</option>
                        {STATUSES.map(s => (
                            <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filtered.map((d) => (
                        <Link
                            key={d.id}
                            to={`/defects/${d.id}`}
                            className="block bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition"
                        >
                            <h3 className="font-bold text-lg">{d.title}</h3>
                            <p className="text-gray-600 text-sm">{d.description}</p>
                            <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                                {STATUSES.find(s => s.value === d.status)?.label}
                            </span>
                        </Link>
                    ))}
                    {filtered.length === 0 && (
                        <p className="text-gray-600">Нет дефектов по выбранным условиям</p>
                    )}
                </div>
            </div>
        </Layout>
    )
}
