import projectService from '../services/projectService'
import storageService from '../services/storageService'

beforeEach(() => storageService.clear())

test('add project', () => {
    const p = projectService.add({ name: 'Test' })
    expect(p.name).toBe('Test')
})
