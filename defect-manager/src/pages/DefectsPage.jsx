import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import defectService from '../services/defectService'
import projectService from '../services/projectService'
import authService from '../services/authService'
import { STATUSES } from '../utils/constants'

export default function DefectsPage() {
    const user = authService.getCurrentUser()
    const [defects, setDefects] = useState([])
    const [projects, setProjects] = useState([])
    const [search, setSearch] = useState('')
    const [status, setStatus] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [projectId, setProjectId] = useState('')

    useEffect(() => {
        setDefects(defectService.getAll())
        setProjects(projectService.getAll())
    }, [])

    const filtered = defects.filter(d => {
        const q = (d.title + ' ' + d.description).toLowerCase()
        if (search && !q.includes(search.toLowerCase())) return false
        if (status && d.status !== status) return false
        return true
    })

    const handleAddDefect = (e) => {
        e.preventDefault()
        if (!title || !description || !projectId) return
        const newDefect = defectService.create({
            title,
            description,
            projectId: Number(projectId),
            status: 'new'
        })
        setDefects(prev => [...prev, newDefect])
        setTitle('')
        setDescription('')
        setProjectId('')
    }

    return (
        <div className="space-y-6 text-white">
            <h1 className="text-2xl font-bold text-brand-accent">Дефекты</h1>

            {/* Только инженер может добавлять дефекты */}
            {user?.role === 'инженер' && (
                <form onSubmit={handleAddDefect} className="card space-y-3">
                    <h3 className="font-semibold text-lg text-brand-accent">Добавить дефект</h3>

                    <select
                        className="input"
                        value={projectId}
                        onChange={(e) => setProjectId(e.target.value)}
                        required
                    >
                        <option value="">Выберите проект</option>
                        {projects.map(p => (
                            <option key={p.id} value={p.id}>{p.title}</option>
                        ))}
                    </select>

                    <input
                        className="input"
                        placeholder="Название дефекта"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    <textarea
                        className="input h-24"
                        placeholder="Описание дефекта"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />

                    <button className="btn btn-primary w-full">Добавить</button>
                </form>
            )}

            {/* Панель фильтрации */}
            <div className="flex flex-wrap gap-3">
                <input
                    className="input flex-1 min-w-[220px]"
                    placeholder="Поиск..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    className="input w-48"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="">Все статусы</option>
                    {STATUSES.map(s => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                </select>
            </div>

            {/* Список дефектов */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.length === 0 && (
                    <div className="text-gray-400 italic">Дефектов пока нет</div>
                )}
                {filtered.map(d => (
                    <Link
                        key={d.id}
                        to={`/defects/${d.id}`}
                        className="card hover:shadow-lg transition block"
                    >
                        <h3 className="font-semibold text-lg text-brand-accent">{d.title}</h3>
                        <p className="text-gray-300 text-sm mb-2">{d.description}</p>
                        <div className="flex items-center justify-between text-xs text-gray-400">
                            <span>Статус: {d.status}</span>
                            <span className="text-brand-accent">Проект: {d.projectId}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
