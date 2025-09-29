import storageService from './storageService'

const PROJECTS_KEY = 'projects'

const projectService = {
    getAll() {
        return storageService.get(PROJECTS_KEY) || []
    },
    add(project) {
        const projects = this.getAll()
        const newProject = { id: Date.now(), ...project }
        projects.push(newProject)
        storageService.set(PROJECTS_KEY, projects)
        return newProject
    },
    update(id, data) {
        let projects = this.getAll()
        projects = projects.map(p => (p.id === id ? { ...p, ...data } : p))
        storageService.set(PROJECTS_KEY, projects)
    },
    remove(id) {
        let projects = this.getAll()
        projects = projects.filter(p => p.id !== id)
        storageService.set(PROJECTS_KEY, projects)
    }
}

export default projectService
