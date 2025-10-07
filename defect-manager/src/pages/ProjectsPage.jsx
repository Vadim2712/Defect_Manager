import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import projectService from '../services/projectService'
import authService from '../services/authService'

export default function ProjectsPage() {
    const user = authService.getCurrentUser()
    const [projects, setProjects] = useState([])

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [deadline, setDeadline] = useState('')

    useEffect(() => {
        setProjects(projectService.getAll())
    }, [])

    const handleAdd = (e) => {
        e.preventDefault()
        if (!title || !description || !deadline) return
        const newP = projectService.create({ title, description, deadline })
        setProjects(prev => [...prev, newP])
        setTitle(''); setDescription(''); setDeadline('')
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-brand-accent">Проекты</h1>

            {user?.role === 'менеджер' && (
                <form onSubmit={handleAdd} className="card space-y-3">
                    <input className="input" placeholder="Название проекта" value={title} onChange={e => setTitle(e.target.value)} required />
                    <textarea className="input h-28" placeholder="Описание" value={description} onChange={e => setDescription(e.target.value)} required />
                    <input className="input" type="date" value={deadline} onChange={e => setDeadline(e.target.value)} required />
                    <div className="flex">
                        <button className="btn btn-primary">Добавить проект</button>
                    </div>
                </form>
            )}

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.length === 0 && <div className="text-gray-400 italic">Проектов пока нет</div>}
                {projects.map(p => (
                    <div key={p.id} className="card">
                        <h3 className="text-lg font-semibold text-brand-accent mb-2">{p.title}</h3>
                        <p className="text-gray-300 mb-3">{p.description}</p>
                        <p className="text-xs text-gray-400 mb-4">Дедлайн: {p.deadline || '—'}</p>
                        <Link to={`/projects/${p.id}`} className="text-sm nav-pill-accent inline-block">Открыть проект</Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
