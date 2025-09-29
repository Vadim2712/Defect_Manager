import storageService from './storageService'
const USERS_KEY = 'users'
const CURRENT_KEY = 'currentUser'
const authService = {
    register(user) {
        const users = storageService.get(USERS_KEY) || []
        if (users.find(u => u.email === user.email)) return null
        const newUser = { id: Date.now(), ...user }
        users.push(newUser)
        storageService.set(USERS_KEY, users)
        return newUser
    },
    login(email, password) {
        const users = storageService.get(USERS_KEY) || []
        const user = users.find(u => u.email === email && u.password === password)
        if (user) {
            storageService.set(CURRENT_KEY, user)
            return user
        }
        return null
    },
    logout() {
        storageService.remove(CURRENT_KEY)
    },
    currentUser() {
        return storageService.get(CURRENT_KEY)
    }
}
export default authService
