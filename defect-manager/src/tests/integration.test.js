import authService from '../services/authService'
import projectService from '../services/projectService'
import defectService from '../services/defectService'

describe('интеграция сервисов', () => {
    beforeEach(() => {
        localStorage.clear()
    })

    test('менеджер создаёт проект, инженер добавляет дефект', () => {
        const manager = authService.register({ username: 'mgr', password: '123', role: 'менеджер' })
        const project = projectService.create({ title: 'Core System', description: 'Main logic' })

        const engineer = authService.register({ username: 'eng', password: '456', role: 'инженер' })
        authService.login('eng', '456')

        const defect = defectService.create({
            title: 'UI issue',
            description: 'Button not clickable',
            projectId: project.id,
            status: 'new'
        })

        expect(defect.projectId).toBe(project.id)
        expect(defectService.getAll().length).toBe(1)
    })
})
