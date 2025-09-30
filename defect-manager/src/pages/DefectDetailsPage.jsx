import { useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import defectService from '../services/defectService'
import userService from '../services/userService'
import { STATUSES } from '../utils/constants'

export default function DefectDetailsPage() {
    const { id } = useParams()
    const defect = defectService.getById(Number(id))
    if (!defect) {
        return (
            <Layout>
                <p className="text-gray-600">Дефект не найден</p>
            </Layout>
        )
    }

    const assignee = defect.assigneeId ? userService.getById(defect.assigneeId) : null

    return (
        <Layout>
            <div className="bg-white shadow-lg rounded-xl p-6 space-y-4">
                <h2 className="text-2xl font-bold">{defect.title}</h2>
                <p className="text-gray-700">{defect.description}</p>
                <p>
                    <span className="font-semibold">Статус:</span>{' '}
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                        {STATUSES.find(s => s.value === defect.status)?.label}
                    </span>
                </p>
                <p>
                    <span className="font-semibold">Исполнитель:</span>{' '}
                    {assignee ? assignee.email : 'Не назначен'}
                </p>
                {defect.attachments?.length > 0 && (
                    <div>
                        <h3 className="font-semibold mb-2">Вложения:</h3>
                        <ul className="list-disc list-inside text-blue-600">
                            {defect.attachments.map((a, i) => (
                                <li key={i}>{a}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {defect.comments?.length > 0 && (
                    <div>
                        <h3 className="font-semibold mb-2">Комментарии:</h3>
                        <ul className="space-y-2">
                            {defect.comments.map((c, i) => (
                                <li key={i} className="border-b pb-2">
                                    <p className="text-sm text-gray-700">{c.text}</p>
                                    <span className="text-xs text-gray-500">Автор: {c.author}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </Layout>
    )
}
