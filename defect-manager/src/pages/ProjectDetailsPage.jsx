import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import projectService from '../services/projectService'
import defectService from '../services/defectService'
import authService from '../services/authService'

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

    const handleAddDefect = (e) => {
        e.preventDefault()
        const newDefect = defectService.create({
            projectId: project.id,
            title,
            description,
            status: 'open',
        })
        setDefects([...defects, newDefect])
        setTitle('')
        setDescription('')
    }

    if (!project) {
        return (
            <Layout>
                <p className="text-red-600">Проект не найден</p>
            </Layout>
        )
    }

    return (
        <Layout>
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-2xl font-bold">{project.name}</h2>
                    <p>{project.description}</p>
                    <p className="text-sm text-gray-500">Дедлайн: {project.deadline}</p>
                </div>

                <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Дефекты</h3>
                    {user?.role === 'инженер' && (
                        <form onSubmit={handleAddDefect} className="space-y-3 bg-white p-4 rounded-xl shadow">
                            <input
                                type="text"
                                placeholder="Название дефекта"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full border p-2 rounded"
                                required
                            />
                            <textarea
                                placeholder="Описание дефекта"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full border p-2 rounded"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Добавить дефект
                            </button>
                        </form>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {defects.map(d => (
                            <div key={d.id} className="bg-white p-4 rounded-xl shadow">
                                <h4 className="font-bold">{d.title}</h4>
                                <p>{d.description}</p>
                                <p className="text-sm text-gray-500">Статус: {d.status}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}
