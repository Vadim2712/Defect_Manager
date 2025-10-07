import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import defectService from '../services/defectService'
import authService from '../services/authService'
import { STATUSES } from '../utils/constants'

export default function DefectsPage() {
    const user = authService.getCurrentUser()
    const [defects, setDefects] = useState([])
    const [search, setSearch] = useState('')
    const [status, setStatus] = useState('')

    useEffect(() => {
        setDefects(defectService.getAll())
    }, [])

    const filtered = defects.filter(d => {
        const q = (d.title + ' ' + d.description).toLowerCase()
        if (search && !q.includes(search.toLowerCase())) return false
        if (status && d.status !== status) return false
        return true
    })

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-brand-accent">Дефекты</h1>

            <div className="flex gap-3">
                <input className="input" placeholder="Поиск..." value={search} onChange={e => setSearch(e.target.value)} />
                <select className="input w-48" value={status} onChange={e => setStatus(e.target.value)}>
                    <option value="">Все статусы</option>
                    {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.length === 0 && <div className="text-gray-400 italic">По запросу ничего не найдено</div>}
                {filtered.map(d => (
                    <Link key={d.id} to={`/defects/${d.id}`} className="card block hover:shadow-lg transition">
                        <h3 className="font-semibold text-lg">{d.title}</h3>
                        <p className="text-gray-300 text-sm mb-2">{d.description}</p>
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-400">Статус: {d.status}</span>
                            <span className="text-xs text-brand-accent font-medium">Проект: {d.projectId || '—'}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
