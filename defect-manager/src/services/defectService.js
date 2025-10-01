import storageService from './storageService'

const DEFECTS_KEY = 'defects'

function getAll() {
    return storageService.get(DEFECTS_KEY) || []
}

function saveAll(defects) {
    storageService.set(DEFECTS_KEY, defects)
}

function create({ projectId, title, description, status = 'open', assigneeId = null, deadline = null }) {
    const defects = getAll()
    const newDefect = {
        id: Date.now(),
        projectId,
        title,
        description,
        status,
        assigneeId,
        deadline,
        comments: [],
    }
    defects.push(newDefect)
    saveAll(defects)
    return newDefect
}

function getById(id) {
    return getAll().find(d => d.id === id)
}

function getByProject(projectId) {
    return getAll().filter(d => d.projectId === projectId)
}

function update(id, updates) {
    const defects = getAll()
    const index = defects.findIndex(d => d.id === id)
    if (index === -1) return null
    defects[index] = { ...defects[index], ...updates }
    saveAll(defects)
    return defects[index]
}

export default {
    getAll,
    create,
    getById,
    getByProject,
    update,
}
