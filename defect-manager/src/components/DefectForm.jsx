import { useState } from 'react'
import { PRIORITIES } from '../utils/constants'

export default function DefectForm({ initial = {}, projects = [], users = [], onSave, onCancel }) {
    const [title, setTitle] = useState(initial.title || '')
    const [description, setDescription] = useState(initial.description || '')
    const [projectId, setProjectId] = useState(initial.projectId || (projects[0] && projects[0].id) || null)
    const [priority, setPriority] = useState(initial.priority || 'medium')
    const [assigneeId, setAssigneeId] = useState(initial.assigneeId || '')
    const [dueDate, setDueDate] = useState(initial.dueDate ? new Date(initial.dueDate).toISOString().slice(0, 16) : '')

    async function readFiles(files) {
        const arr = []
        for (const f of Array.from(files)) {
            const dataUrl = await new Promise(res => {
                const r = new FileReader()
                r.onload = e => res(e.target.result)
                r.readAsDataURL(f)
            })
            arr.push({ name: f.name, dataUrl })
        }
        return arr
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const attachments = e.target.files?.files ? await readFiles(e.target.files.files) : []
        const payload = {
            title,
            description,
            projectId: projectId || null,
            priority,
            assigneeId: assigneeId || null,
            dueDate: dueDate ? new Date(dueDate).getTime() : null,
            attachments,
            authorId: initial.authorId || null
        }
        onSave(payload)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-3 p-4 border rounded">
            <div className="flex flex-col">
                <label>Заголовок</label>
                <input value={title} onChange={e => setTitle(e.target.value)} className="border p-2 rounded" required />
            </div>
            <div className="flex flex-col">
                <label>Описание</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} className="border p-2 rounded" rows="4" />
            </div>
            <div className="flex space-x-2">
                <select value={projectId || ''} onChange={e => setProjectId(Number(e.target.value))} className="border p-2 rounded">
                    <option value="">Без проекта</option>
                    {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
                <select value={priority} onChange={e => setPriority(e.target.value)} className="border p-2 rounded">
                    {PRIORITIES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                </select>
                <select value={assigneeId || ''} onChange={e => setAssigneeId(Number(e.target.value))} className="border p-2 rounded">
                    <option value="">Исполнитель</option>
                    {users.map(u => <option key={u.id} value={u.id}>{u.email} ({u.role})</option>)}
                </select>
            </div>
            <div className="flex space-x-2">
                <input type="datetime-local" value={dueDate} onChange={e => setDueDate(e.target.value)} className="border p-2 rounded" />
                <input type="file" name="files" multiple className="border p-2 rounded" />
            </div>
            <div className="flex space-x-2">
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Сохранить</button>
                <button type="button" onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded">Отмена</button>
            </div>
        </form>
    )
}
