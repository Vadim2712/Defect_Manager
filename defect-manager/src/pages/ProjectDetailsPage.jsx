import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import projectService from '../services/projectService'
import defectService from '../services/defectService'
import authService from '../services/authService'
import { Link } from 'react-router-dom'

export default function ProjectDetailsPage() {
    const { id } = useParams()
    const project = projectService.getById(Number(id))
    const user = authService.getCurrentUser()
    const [defects, setDefects] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        if (project) {
            setDefects(defectService.getByProject(project.id))
        }
    }, [project])

    if (!project) return <div className="text-red-400">Проект не найден</div>

    const handleAddDefect = (e) => {
        e.preventDefault()
        if (!title || !description) return
        const d = defectService.create({ projectId: project.id, title, description })
        setDefects(prev => [...prev, d])
        setTitle(''); setDescription('')
    }

    return (
        <div className="space-y-6">
            <div className="card">
                <h1 className="text-2xl font-bold text-brand-accent">{project.title}</h1>
                <p className="text-gray-300 mb-2">{project.description}</p>
                <p className="text-xs text-gray-400">Дедлайн: {project.deadline || '—'}</p>
            </div>

            {user?.role === 'инженер' && (
                <form onSubmit={handleAddDefect} className="card space-y-3">
                    <h3 className="font-semibold text-lg">Добавить дефект</h3>
                    <input className="input" placeholder="Название дефекта" value={title} onChange={e => setTitle(e.target.value)} required />
                    <textarea className="input h-24" placeholder="Описание дефекта" value={description} onChange={e => setDescription(e.target.value)} required />
                    <button className="btn btn-primary">Добавить дефект</button>
                </form>
            )}

            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-brand-accent">Дефекты проекта</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                    {defects.map(d => (
                        <div key={d.id} className="card">
                            <h4 className="font-semibold text-white">{d.title}</h4>
                            <p className="text-gray-300 mb-2">{d.description}</p>
                            <p className="text-xs text-gray-400 mb-3">Статус: {d.status}</p>
                            <Link to={`/defects/${d.id}`} className="nav-pill-accent">Открыть дефект</Link>
                        </div>
                    ))}
                    {defects.length === 0 && <div className="text-gray-400 italic">Дефектов нет</div>}
                </div>
            </div>
        </div>
    )
}
