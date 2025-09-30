import storageService from './storageService'

const USERS_KEY = 'users'
const CURRENT_USER_KEY = 'currentUser'

function getAll() {
    return storageService.get(USERS_KEY) || []
}

function saveAll(users) {
    storageService.set(USERS_KEY, users)
}

function register(user) {
    const users = getAll()
    if (users.find(u => u.email === user.email)) {
        throw new Error('User already exists')
    }
    const newUser = { ...user, id: Date.now() }
    users.push(newUser)
    saveAll(users)
}

function login(email, password) {
    const users = getAll()
    const user = users.find(u => u.email === email && u.password === password)
    if (!user) {
        throw new Error('Invalid credentials')
    }
    storageService.set(CURRENT_USER_KEY, user)
    return user
}

function logout() {
    storageService.remove(CURRENT_USER_KEY)
}

function getCurrentUser() {
    return storageService.get(CURRENT_USER_KEY)
}

const authService = {
    register,
    login,
    logout,
    getCurrentUser,
}

export default authService
