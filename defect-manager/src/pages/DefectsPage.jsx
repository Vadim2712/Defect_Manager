import { useEffect, useState } from 'react'
import defectService from '../services/defectService'
import projectService from '../services/projectService'
import userService from '../services/userService'
import DefectForm from '../components/DefectForm'
import { STATUSES } from '../utils/constants'
import { exportToCsv } from '../utils/csv'
import { Link } from 'react-router-dom'

export default function DefectsPage() {
    const [defects, setDefects] = useState([])
    const [projects, setProjects] = useState([])
    const [users, setUsers] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [filterProject, setFilterProject] = useState('')
    const [filterStatus, setFilterStatus] = useState('')
    const [q, setQ] = useState('')

    useEffect(() => {
        setDefects(defectService.getAll())
        setProjects(projectService.getAll())
        setUsers(userService.getAll())
    }, [])

    function reload() {
        setDefects(defectService.getAll())
    }

    function handleCreate(payload) {
        const user = payload.authorId || null
        defectService.add({ ...payload, authorId: user })
        reload()
        setShowForm(false)
    }

    function handleDelete(id) {
        defectService.remove(id)
        reload()
    }

    function filtered() {
        return defects.filter(d => {
            if (filterProject && String(d.projectId) !== String(filterProject)) return false
            if (filterStatus && d.status !== filterStatus) return false
            if (q) {
                const s = (d.title + ' ' + d.description).toLowerCase()
                if (!s.includes(q.toLowerCase())) return false
            }
            return true
        })
    }

    function handleExport() {
        const rows = defects.map(d => ({
            id: d.id,
            title: d.title,
            project: projects.find(p => p.id === d.projectId)?.name || '',
            status: d.status,
            priority: d.priority,
            assignee: users.find(u => u.id === d.assigneeId)?.email || '',
            createdAt: new Date(d.createdAt).toLocaleString()
        }))
        exportToCsv('defects.csv', rows)
    }

    return (
        <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Дефекты</h1>
                <div className="space-x-2">
                    <button onClick={() => setShowForm(s => !s)} className="bg-blue-500 text-white px-3 py-1 rounded">Добавить</button>
                    <button onClick={handleExport} className="bg-gray-700 text-white px-3 py-1 rounded">Экспорт CSV</button>
                </div>
            </div>

            {showForm && <DefectForm projects={projects} users={users} onSave={handleCreate} onCancel={() => setShowForm(false)} />}

            <div className="flex space-x-2">
                <select value={filterProject} onChange={e => setFilterProject(e.target.value)} className="border p-2 rounded">
                    <option value="">Все проекты</option>
                    {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
                <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="border p-2 rounded">
                    <option value="">Все статусы</option>
                    {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
                <input placeholder="Поиск" value={q} onChange={e => setQ(e.target.value)} className="border p-2 rounded w-64" />
            </div>

            <ul className="space-y-2">
                {filtered().map(d => (
                    <li key={d.id} className="border p-3 rounded flex justify-between items-start">
                        <div>
                            <Link to={`/defects/${d.id}`} className="text-lg font-semibold text-blue-600">{d.title}</Link>
                            <div className="text-sm text-gray-600">{d.description}</div>
                            <div className="text-xs text-gray-500">
                                {projects.find(p => p.id === d.projectId)?.name || 'Без проекта'} · {d.priority} · {d.status}
                            </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                            <div className="text-sm">{userService.getById(d.assigneeId)?.email || 'Не назначен'}</div>
                            <div className="flex space-x-2">
                                <button onClick={() => handleDelete(d.id)} className="bg-red-500 text-white px-3 py-1 rounded">Удалить</button>
                                <Link to={`/defects/${d.id}`} className="bg-gray-200 px-3 py-1 rounded">Открыть</Link>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
