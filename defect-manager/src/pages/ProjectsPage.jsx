import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import projectService from '../services/projectService'

export default function ProjectsPage() {
    const [projects, setProjects] = useState([])
    const [name, setName] = useState('')

    useEffect(() => {
        setProjects(projectService.getAll())
    }, [])

    const handleAdd = (e) => {
        e.preventDefault()
        if (!name.trim()) return
        projectService.add({ name })
        setProjects(projectService.getAll())
        setName('')
    }

    return (
        <Layout>
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Проекты</h2>
                <form onSubmit={handleAdd} className="flex gap-3">
                    <input
                        type="text"
                        placeholder="Название проекта"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700 transition"
                    >
                        Добавить
                    </button>
                </form>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projects.map((p) => (
                        <div key={p.id} className="bg-white shadow-md rounded-xl p-4 flex justify-between items-center">
                            <span className="font-medium">{p.name}</span>
                            <span className="text-gray-500 text-sm">ID: {p.id}</span>
                        </div>
                    ))}
                    {projects.length === 0 && (
                        <p className="text-gray-600">Нет проектов. Добавьте первый!</p>
                    )}
                </div>
            </div>
        </Layout>
    )
}
