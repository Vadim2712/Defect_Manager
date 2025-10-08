import authService from '../services/authService'

describe('authService', () => {
    beforeEach(() => {
        localStorage.clear()
    })

    test('регистрирует пользователя и сохраняет в Local Storage', () => {
        const user = { username: 'test', password: '1234', role: 'инженер' }
        authService.register(user)
        const saved = authService.getAllUsers()
        expect(saved[0].username).toBe('test')
    })

    test('выполняет вход для существующего пользователя', () => {
        authService.register({ username: 'user', password: 'pass', role: 'менеджер' })
        const logged = authService.login('user', 'pass')
        expect(logged.username).toBe('user')
    })

    test('возвращает null при неверных данных', () => {
        expect(authService.login('wrong', 'data')).toBe(null)
    })

    test('getCurrentUser возвращает активного пользователя', () => {
        authService.register({ username: 'admin', password: '123', role: 'руководитель' })
        authService.login('admin', '123')
        const current = authService.getCurrentUser()
        expect(current.username).toBe('admin')
    })
})
