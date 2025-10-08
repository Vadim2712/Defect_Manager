import storageService from './storageService'

const USERS_KEY = 'users'
const CURRENT_KEY = 'currentUser'

function getAllUsers() {
    return storageService.get(USERS_KEY)
}

function saveUsers(users) {
    storageService.save(USERS_KEY, users)
}

function register({ username, password, role }) {
    const users = getAllUsers()
    const exists = users.find(u => u.username.toLowerCase() === username.toLowerCase())
    if (exists) throw new Error('Пользователь уже существует')

    const newUser = { id: Date.now(), username, password, role }
    users.push(newUser)
    saveUsers(users)
    return newUser
}

function login(username, password) {
    const users = getAllUsers()
    const user = users.find(
        u => u.username.toLowerCase() === username.toLowerCase() && u.password === password
    )
    if (!user) return null
    storageService.save(CURRENT_KEY, user)
    return user
}


function getCurrentUser() {
    const user = storageService.get(CURRENT_KEY)
    return user || null
}

function logout() {
    storageService.clear(CURRENT_KEY)
}

export default {
    register,
    login,
    logout,
    getCurrentUser,
    getAllUsers
}
