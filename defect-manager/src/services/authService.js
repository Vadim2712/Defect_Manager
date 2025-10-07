import storageService from './storageService'

const USERS_KEY = 'users'
const CURRENT_KEY = 'currentUser'

function getAllUsers() {
    return storageService.get(USERS_KEY) || []
}

function saveUsers(users) {
    storageService.set(USERS_KEY, users)
}

function register(email, password, role) {
    const users = getAllUsers()

    // Проверяем, нет ли пользователя с таким email
    const exists = users.find(u => u.email.toLowerCase() === email.toLowerCase())
    if (exists) throw new Error('Пользователь уже существует')

    const newUser = {
        id: Date.now(),
        email,
        password,
        role
    }

    users.push(newUser)
    saveUsers(users)
    return newUser
}

function login(email, password) {
    const users = getAllUsers()
    const user = users.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    )
    if (!user) throw new Error('Неверный логин или пароль')

    storageService.set(CURRENT_KEY, user)
    return user
}

function logout() {
    localStorage.removeItem(CURRENT_KEY)
}

function getCurrentUser() {
    return storageService.get(CURRENT_KEY)
}

function clearAllUsers() {
    localStorage.removeItem(USERS_KEY)
    localStorage.removeItem(CURRENT_KEY)
}

export default {
    register,
    login,
    logout,
    getCurrentUser,
    clearAllUsers
}
