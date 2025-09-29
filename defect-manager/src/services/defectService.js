import storageService from './storageService'
const DEFECTS_KEY = 'defects'
function now() {
    return Date.now()
}
const defectService = {
    getAll() {
        return storageService.get(DEFECTS_KEY) || []
    },
    getById(id) {
        const list = this.getAll()
        return list.find(d => d.id === id) || null
    },
    add(payload) {
        const list = this.getAll()
        const def = {
            id: now(),
            title: payload.title || 'Без названия',
            description: payload.description || '',
            projectId: payload.projectId || null,
            priority: payload.priority || 'medium',
            assigneeId: payload.assigneeId || null,
            status: payload.status || 'new',
            attachments: payload.attachments || [],
            comments: [],
            history: [
                { id: now() + 1, userId: payload.authorId || null, action: 'create', data: { title: payload.title }, createdAt: now() }
            ],
            createdAt: now(),
            updatedAt: now(),
            dueDate: payload.dueDate || null
        }
        list.push(def)
        storageService.set(DEFECTS_KEY, list)
        return def
    },
    update(id, data) {
        let list = this.getAll()
        list = list.map(d => d.id === id ? { ...d, ...data, updatedAt: now() } : d)
        storageService.set(DEFECTS_KEY, list)
        return this.getById(id)
    },
    remove(id) {
        let list = this.getAll()
        list = list.filter(d => d.id !== id)
        storageService.set(DEFECTS_KEY, list)
    },
    addComment(defId, comment) {
        const list = this.getAll()
        const idx = list.findIndex(d => d.id === defId)
        if (idx === -1) return null
        const c = { id: now(), authorId: comment.authorId || null, text: comment.text || '', createdAt: now() }
        list[idx].comments = [...(list[idx].comments || []), c]
        list[idx].history = [...(list[idx].history || []), { id: now() + 1, userId: comment.authorId || null, action: 'comment', data: { text: comment.text }, createdAt: now() }]
        list[idx].updatedAt = now()
        storageService.set(DEFECTS_KEY, list)
        return c
    },
    changeStatus(defId, newStatus, userId, note) {
        const list = this.getAll()
        const idx = list.findIndex(d => d.id === defId)
        if (idx === -1) return null
        const from = list[idx].status
        list[idx].status = newStatus
        list[idx].history = [...(list[idx].history || []), { id: now() + 2, userId: userId || null, action: 'status_change', data: { from, to: newStatus, note }, createdAt: now() }]
        list[idx].updatedAt = now()
        storageService.set(DEFECTS_KEY, list)
        return list[idx]
    },
    addAttachment(defId, attachment) {
        const list = this.getAll()
        const idx = list.findIndex(d => d.id === defId)
        if (idx === -1) return null
        const att = { id: now(), name: attachment.name || 'file', dataUrl: attachment.dataUrl || '' }
        list[idx].attachments = [...(list[idx].attachments || []), att]
        list[idx].history = [...(list[idx].history || []), { id: now() + 3, userId: attachment.authorId || null, action: 'attachment_add', data: { name: att.name }, createdAt: now() }]
        list[idx].updatedAt = now()
        storageService.set(DEFECTS_KEY, list)
        return att
    },
    assign(defId, userId, actorId) {
        const list = this.getAll()
        const idx = list.findIndex(d => d.id === defId)
        if (idx === -1) return null
        const from = list[idx].assigneeId
        list[idx].assigneeId = userId
        list[idx].history = [...(list[idx].history || []), { id: now() + 4, userId: actorId || null, action: 'assignee_change', data: { from, to: userId }, createdAt: now() }]
        list[idx].updatedAt = now()
        storageService.set(DEFECTS_KEY, list)
        return list[idx]
    }
}
export default defectService
