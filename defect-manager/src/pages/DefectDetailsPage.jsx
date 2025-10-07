import { useParams } from 'react-router-dom'
import defectService from '../services/defectService'
import userService from '../services/userService'
import projectService from '../services/projectService'

export default function DefectDetailsPage() {
    const { id } = useParams()
    const defect = defectService.getById(Number(id))
    if (!defect) return <div className="text-red-400">Дефект не найден</div>
    const assignee = userService.getById(defect.assigneeId)
    const project = projectService.getById(defect.projectId)

    return (
        <div className="space-y-6">
            <div className="card">
                <h1 className="text-2xl font-bold text-brand-accent">{defect.title}</h1>
                <p className="text-gray-300">{defect.description}</p>
                <div className="flex gap-6 mt-3 text-sm text-gray-400">
                    <div>Статус: {defect.status}</div>
                    <div>Проект: {project?.title || '—'}</div>
                    <div>Исполнитель: {assignee?.email || 'Не назначен'}</div>
                </div>
            </div>

            <div className="card">
                <h3 className="font-semibold mb-2">Комментарии</h3>
                {(defect.comments || []).length === 0 ? (
                    <p className="text-gray-400">Комментариев нет</p>
                ) : (
                    <ul className="space-y-2">
                        {defect.comments.map(c => (
                            <li key={c.id} className="bg-brand-dark p-3 rounded-md">{c.text}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}
