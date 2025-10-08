import projectService from '../services/projectService'
import storageService from '../services/storageService'

describe('projectService', () => {
    beforeEach(() => {
        localStorage.clear()
    })

    test('создаёт проект', () => {
        const project = projectService.create({ title: 'Project A', description: 'Desc' })
        expect(project.title).toBe('Project A')
    })

    test('возвращает список проектов', () => {
        projectService.create({ title: 'A', description: 'Test' })
        const all = projectService.getAll()
        expect(all.length).toBe(1)
    })

    test('удаляет проект по id', () => {
        const p = projectService.create({ title: 'ToDelete', description: 'Remove' })
        projectService.remove(p.id)
        expect(projectService.getAll().length).toBe(0)
    })
})
