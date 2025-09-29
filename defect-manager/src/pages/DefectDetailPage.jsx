import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import defectService from '../services/defectService'
import projectService from '../services/projectService'
import userService from '../services/userService'
import { STATUSES } from '../utils/constants'

export default function DefectDetailsPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [defect, setDefect] = useState(null)
    const [project, setProject] = useState(null)
    const [assignee, setAssignee] = useState(null)
    const [users, setUsers] = useState([])
    const [status, setStatus] = useState('')
    const [commentText, setCommentText] = useState('')
    const [fileToAdd, setFileToAdd] = useState(null)

    useEffect(() => {
        setUsers(userService.getAll())
        const d = defectService.getById(Number(id))
        setDefect(d)
        if (d) {
            setProject(projectService.getAll().find(p => p.id === d.projectId) || null)
            setAssignee(userService.getById(d.assigneeId))
            setStatus(d.status)
        }
    }, [id])

    function reload() {
        const d = defectService.getById(Number(id))
        setDefect(d)
        if (d) {
            setAssignee(userService.getById(d.assigneeId))
            setStatus(d.status)
        }
    }

    function handleDelete() {
        defectService.remove(Number(id))
        navigate('/defects')
    }

    function handleStatusChange() {
        const current = JSON.parse(localStorage.getItem('currentUser')) || null
        defectService.changeStatus(Number(id), status, current?.id || null, '')
        reload()
    }

    function handleAssign(e) {
        const val = e.target.value ? Number(e.target.value) : null
        const current = JSON.parse(localStorage.getItem('currentUser')) || null
        defectService.assign(Number(id), val, current?.id || null)
        reload()
    }

    function handleAddComment() {
        if (!commentText) return
        const current = JSON.parse(localStorage.getItem('currentUser')) || null
        defectService.addComment(Number(id), { text: commentText, authorId: current?.id || null })
        setCommentText('')
        reload()
    }

    async function handleAddFile() {
        if (!fileToAdd) return
        const current = JSON.parse(localStorage.getItem('currentUser')) || null
        const f = fileToAdd[0]
        const dataUrl = await new Promise(res => {
            const r = new FileReader()
            r.onload = e => res(e.target.result)
            r.readAsDataURL(f)
        })
        defectService.addAttachment(Number(id), { name: f.name, dataUrl, authorId: current?.id || null })
        setFileToAdd(null)
        reload()
    }

    if (!defect) return <div className="p-6">Дефект не найден</div>

    return (
        <div className="p-6 space-y-4">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold">{defect.title}</h1>
                    <div className="text-sm text-gray-600">{defect.description}</div>
                    <div className="text-xs text-gray-500">{project?.name || 'Без проекта'}</div>
                </div>
                <div className="flex space-x-2">
                    <button onClick={handleDelete} className="bg-red-500 text-white px-3 py-1 rounded">Удалить</button>
                    <button onClick={() => navigate('/defects')} className="bg-gray-200 px-3 py-1 rounded">Назад</button>
                </div>
            </div>

            <div className="flex space-x-4">
                <div className="flex flex-col space-y-2">
                    <label>Статус</label>
                    <select value={status} onChange={e => setStatus(e.target.value)} className="border p-2 rounded">
                        {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                    <button onClick={handleStatusChange} className="bg-blue-500 text-white px-3 py-1 rounded">Изменить статус</button>
                </div>

                <div className="flex flex-col space-y-2">
                    <label>Исполнитель</label>
                    <select value={defect.assigneeId || ''} onChange={handleAssign} className="border p-2 rounded">
                        <option value="">Не назначен</option>
                        {users.map(u => <option key={u.id} value={u.id}>{u.email} ({u.role})</option>)}
                    </select>
                </div>

                <div className="flex flex-col space-y-2">
                    <label>Вложения</label>
                    <div className="space-y-2">
                        {(defect.attachments || []).map(a => (
                            <a key={a.id} href={a.dataUrl} target="_blank" rel="noreferrer" className="block text-blue-600">{a.name}</a>
                        ))}
                    </div>
                    <input type="file" onChange={e => setFileToAdd(e.target.files)} />
                    <button onClick={handleAddFile} className="bg-green-500 text-white px-3 py-1 rounded">Добавить вложение</button>
                </div>
            </div>

            <div className="space-y-2">
                <h2 className="text-lg font-semibold">Комментарии</h2>
                {(defect.comments || []).map(c => (
                    <div key={c.id} className="border p-2 rounded">
                        <div className="text-sm text-gray-700">{c.text}</div>
                        <div className="text-xs text-gray-500">{userService.getById(c.authorId)?.email || 'Аноним'} · {new Date(c.createdAt).toLocaleString()}</div>
                    </div>
                ))}
                <div className="flex space-x-2">
                    <input value={commentText} onChange={e => setCommentText(e.target.value)} className="border p-2 rounded w-full" placeholder="Новый комментарий" />
                    <button onClick={handleAddComment} className="bg-blue-500 text-white px-3 py-1 rounded">Добавить</button>
                </div>
            </div>

            <div>
                <h2 className="text-lg font-semibold">История</h2>
                <ul className="space-y-2">
                    {(defect.history || []).map(h => (
                        <li key={h.id} className="text-sm text-gray-600">
                            {new Date(h.createdAt).toLocaleString()} · {userService.getById(h.userId)?.email || 'Система'} · {h.action} {h.data ? JSON.stringify(h.data) : ''}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
