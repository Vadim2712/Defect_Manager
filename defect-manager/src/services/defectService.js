import storageService from './storageService'

const DEFECTS_KEY = 'defects'

function getAll() {
    return storageService.get(DEFECTS_KEY) || []
}
function saveAll(list) { storageService.set(DEFECTS_KEY, list) }

function create({ projectId = null, title = '', description = '', status = 'new', assigneeId = null, deadline = null }) {
    const list = getAll()
    const item = {
        id: Date.now(),
        projectId,
        title,
        description,
        status,
        assigneeId,
        deadline,
        comments: [],
        history: []
    }
    list.push(item)
    saveAll(list)
    return item
}

function getById(id) {
    return getAll().find(d => Number(d.id) === Number(id)) || null
}
function getByProject(projectId) {
    return getAll().filter(d => Number(d.projectId) === Number(projectId))
}
function update(id, updates) {
    const list = getAll()
    const idx = list.findIndex(d => Number(d.id) === Number(id))
    if (idx === -1) return null
    list[idx] = { ...list[idx], ...updates }
    saveAll(list)
    return list[idx]
}

export default {
    getAll, create, getById, getByProject, update
}
