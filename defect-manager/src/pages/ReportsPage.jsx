import { useEffect, useState } from 'react'
import authService from '../services/authService'
import defectService from '../services/defectService'
import { STATUSES } from '../utils/constants'

export default function ReportsPage() {
    const user = authService.getCurrentUser()
    const [stats, setStats] = useState({})

    useEffect(() => {
        const list = defectService.getAll()
        const grouped = {}
        STATUSES.forEach(s => grouped[s.value] = 0)
        list.forEach(d => { if (grouped[d.status] !== undefined) grouped[d.status]++ })
        setStats(grouped)
    }, [])

    if (!user || (user.role !== 'менеджер' && user.role !== 'руководитель')) {
        return <div className="text-red-400">У вас нет доступа к аналитике</div>
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-brand-accent">Аналитика</h1>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {STATUSES.map(s => (
                    <div key={s.value} className="card">
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="text-sm text-gray-300">{s.label}</div>
                                <div className="text-2xl font-bold mt-2">{stats[s.value] ?? 0}</div>
                            </div>
                            <div className="text-brand-accent text-xl">●</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
