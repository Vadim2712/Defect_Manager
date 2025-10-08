import storageService from './storageService'

const PROJECTS_KEY = 'projects'

function getAll() {
    return storageService.get(PROJECTS_KEY)
}

function create({ title, description }) {
    const projects = getAll()
    const newProject = {
        id: Date.now(),
        title,
        description
    }
    projects.push(newProject)
    storageService.save(PROJECTS_KEY, projects)
    return newProject
}

function remove(id) {
    const projects = getAll().filter(p => p.id !== id)
    storageService.save(PROJECTS_KEY, projects)
}

export default { getAll, create, remove }
