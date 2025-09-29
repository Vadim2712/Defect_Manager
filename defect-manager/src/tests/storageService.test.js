import storageService from '../services/storageService'

test('set and get item', () => {
    storageService.set('x', { a: 1 })
    expect(storageService.get('x')).toEqual({ a: 1 })
})
test('remove item', () => {
    storageService.set('y', 123)
    storageService.remove('y')
    expect(storageService.get('y')).toBeNull()
})
