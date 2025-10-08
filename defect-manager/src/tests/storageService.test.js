import storageService from '../services/storageService'

describe('storageService', () => {
    beforeEach(() => {
        localStorage.clear()
    })

    test('сохраняет и получает данные', () => {
        storageService.save('projects', [{ id: 1, title: 'Test' }])
        const result = storageService.get('projects')
        expect(result).toEqual([{ id: 1, title: 'Test' }])
    })

    test('возвращает пустой массив если ключ отсутствует', () => {
        expect(storageService.get('unknown')).toEqual([])
    })
})
