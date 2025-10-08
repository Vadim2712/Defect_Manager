import defectService from '../services/defectService'

describe('defectService', () => {
    beforeEach(() => {
        localStorage.clear()
    })

    test('создаёт дефект с projectId', () => {
        const defect = defectService.create({
            title: 'Ошибка в коде',
            description: 'Null reference',
            projectId: 1,
            status: 'new'
        })
        expect(defect.projectId).toBe(1)
    })

    test('возвращает все дефекты', () => {
        defectService.create({ title: '1', description: 'A', projectId: 1, status: 'new' })
        defectService.create({ title: '2', description: 'B', projectId: 2, status: 'in_progress' })
        const list = defectService.getAll()
        expect(list.length).toBe(2)
    })

    test('обновляет статус дефекта', () => {
        const d = defectService.create({ title: 'Bug', description: 'Fix', projectId: 1, status: 'new' })
        defectService.updateStatus(d.id, 'done')
        const updated = defectService.getById(d.id)
        expect(updated.status).toBe('done')
    })
})
