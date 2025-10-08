const storageService = {
    save(key, value) {
        localStorage.setItem(key, JSON.stringify(value))
    },

    get(key) {
        const data = localStorage.getItem(key)
        try {
            return data ? JSON.parse(data) : []
        } catch {
            return []
        }
    },

    clear(key) {
        localStorage.removeItem(key)
    }
}

export default storageService
