import defectService from '../services/defectService'
import storageService from '../services/storageService'

beforeEach(() => storageService.clear())

test('create defect', () => {
    const d = defectService.add({ title: 'Bug', description: 'desc' })
    expect(d.title).toBe('Bug')
})
test('change status', () => {
    const d = defectService.add({ title: 'Bug2' })
    const updated = defectService.changeStatus(d.id, 'in_progress', null, '')
    expect(updated.status).toBe('in_progress')
})
