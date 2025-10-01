import storageService from './storageService'

const PROJECTS_KEY = 'projects'

function getAll() {
    return storageService.get(PROJECTS_KEY) || []
}

function saveAll(projects) {
    storageService.set(PROJECTS_KEY, projects)
}

function create({ name, description, deadline }) {
    const projects = getAll()
    const newProject = {
        id: Date.now(),
        name,
        description,
        deadline,
    }
    projects.push(newProject)
    saveAll(projects)
    return newProject
}

function getById(id) {
    return getAll().find(p => p.id === id)
}

export default {
    getAll,
    create,
    getById,
}
