import storageService from './storageService'

const PROJECTS_KEY = 'projects'

function getAll() {
    return storageService.get(PROJECTS_KEY) || []
}

function saveAll(items) {
    storageService.set(PROJECTS_KEY, items)
}

function create({ title, description, deadline }) {
    const list = getAll()
    const newItem = {
        id: Date.now(),
        title: title || 'Без названия',
        description: description || '',
        deadline: deadline || null
    }
    list.push(newItem)
    saveAll(list)
    return newItem
}

function getById(id) {
    return getAll().find(p => Number(p.id) === Number(id)) || null
}

export default {
    getAll,
    create,
    getById
}
