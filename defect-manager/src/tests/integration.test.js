import projectService from '../services/projectService'
import defectService from '../services/defectService'
import storageService from '../services/storageService'

beforeEach(() => storageService.clear())

test('defect links to project', () => {
    const project = projectService.add({ name: 'House' })
    const defect = defectService.add({ title: 'Crack', projectId: project.id })
    expect(defect.projectId).toBe(project.id)
})

test('defect assigned to user', () => {
    storageService.set('users', [{ id: 1, email: 'e@test.com', password: '123', role: 'engineer' }])
    const defect = defectService.add({ title: 'Leak' })
    const updated = defectService.assign(defect.id, 1, null)
    expect(updated.assigneeId).toBe(1)
})
