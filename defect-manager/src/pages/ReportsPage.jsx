import { useEffect, useState } from 'react'
import defectService from '../services/defectService'
import { STATUSES } from '../utils/constants'

export default function ReportsPage() {
    const [defects, setDefects] = useState([])
    const [stats, setStats] = useState({})

    useEffect(() => {
        const list = defectService.getAll()
        setDefects(list)
        const grouped = {}
        for (const s of STATUSES) grouped[s.value] = 0
        for (const d of list) {
            if (grouped[d.status] !== undefined) grouped[d.status]++
        }
        setStats(grouped)
    }, [])

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">Аналитика</h1>
            <div className="space-y-2">
                {STATUSES.map(s => (
                    <div key={s.value} className="flex justify-between border p-2 rounded">
                        <span>{s.label}</span>
                        <span>{stats[s.value]}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
