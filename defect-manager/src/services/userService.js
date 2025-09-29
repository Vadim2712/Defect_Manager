import storageService from './storageService'
const USERS_KEY = 'users'
const userService = {
    getAll() {
        return storageService.get(USERS_KEY) || []
    },
    getById(id) {
        const users = this.getAll()
        return users.find(u => u.id === id) || null
    }
}
export default userService
