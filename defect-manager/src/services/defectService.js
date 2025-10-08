import storageService from './storageService'

const DEFECTS_KEY = 'defects'

function getAll() {
    return storageService.get(DEFECTS_KEY)
}

function getById(id) {
    return getAll().find(d => d.id === id)
}

function create(defect) {
    const defects = getAll()
    const newDefect = { id: Date.now(), ...defect }
    defects.push(newDefect)
    storageService.save(DEFECTS_KEY, defects)
    return newDefect
}

function updateStatus(id, status) {
    const defects = getAll()
    const updated = defects.map(d => (d.id === id ? { ...d, status } : d))
    storageService.save(DEFECTS_KEY, updated)
}

export default { getAll, getById, create, updateStatus }
