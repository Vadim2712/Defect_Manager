import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import projectService from '../services/projectService'
import authService from '../services/authService'

export default function ProjectsPage() {
    const [projects, setProjects] = useState([])
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [deadline, setDeadline] = useState('')
    const user = authService.getCurrentUser()

    useEffect(() => {
        setProjects(projectService.getAll())
    }, [])

    const handleAdd = (e) => {
        e.preventDefault()
        const newProject = projectService.create({ name, description, deadline })
        setProjects([...projects, newProject])
        setName('')
        setDescription('')
        setDeadline('')
    }

    return (
        <Layout>
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Проекты</h2>

                {user?.role === 'менеджер' && (
                    <form onSubmit={handleAdd} className="space-y-3 bg-white p-4 rounded-xl shadow">
                        <input
                            type="text"
                            placeholder="Название проекта"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border p-2 rounded"
                            required
                        />
                        <textarea
                            placeholder="Описание"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border p-2 rounded"
                            required
                        />
                        <input
                            type="date"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            className="w-full border p-2 rounded"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Добавить проект
                        </button>
                    </form>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projects.map(p => (
                        <div key={p.id} className="bg-white p-4 rounded-xl shadow">
                            <h3 className="text-lg font-bold">{p.name}</h3>
                            <p className="text-gray-700">{p.description}</p>
                            <p className="text-sm text-gray-500">Дедлайн: {p.deadline}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}
