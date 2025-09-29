import { useState } from 'react'
import projectService from '../services/projectService'

export default function ProjectsPage() {
    const [projects, setProjects] = useState(projectService.getAll())
    const [name, setName] = useState('')

    const handleAdd = () => {
        if (!name) return
        projectService.add({ name })
        setProjects(projectService.getAll())
        setName('')
    }

    const handleDelete = (id) => {
        projectService.remove(id)
        setProjects(projectService.getAll())
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Проекты</h1>
            <div className="flex space-x-2 mb-4">
                <input
                    type="text"
                    placeholder="Название проекта"
                    className="border p-2 rounded w-64"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <button
                    onClick={handleAdd}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Добавить
                </button>
            </div>
            <ul className="space-y-2">
                {projects.map(p => (
                    <li key={p.id} className="flex justify-between items-center border p-2 rounded">
                        <span>{p.name}</span>
                        <button
                            onClick={() => handleDelete(p.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                            Удалить
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
