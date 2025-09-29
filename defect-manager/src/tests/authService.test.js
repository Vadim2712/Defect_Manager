import authService from '../services/authService'
import storageService from '../services/storageService'

beforeEach(() => storageService.clear())

test('register and login user', () => {
    authService.register({ email: 'a@a.com', password: '123', role: 'engineer' })
    const user = authService.login('a@a.com', '123')
    expect(user.email).toBe('a@a.com')
})
