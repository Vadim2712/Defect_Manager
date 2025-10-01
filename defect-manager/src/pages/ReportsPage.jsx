import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import defectService from '../services/defectService'
import { STATUSES } from '../utils/constants'
import authService from '../services/authService'

export default function ReportsPage() {
    const [stats, setStats] = useState({})
    const user = authService.getCurrentUser()

    useEffect(() => {
        const defects = defectService.getAll()
        const grouped = {}
        for (const s of STATUSES) grouped[s.value] = 0
        for (const d of defects) {
            if (grouped[d.status] !== undefined) grouped[d.status]++
        }
        setStats(grouped)
    }, [])

    if (user?.role !== 'менеджер' && user?.role !== 'руководитель') {
        return (
            <Layout>
                <p className="text-red-600">У вас нет доступа к отчётам</p>
            </Layout>
        )
    }

    return (
        <Layout>
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Аналитика</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {STATUSES.map(s => (
                        <div key={s.value} className="bg-white shadow-md rounded-xl p-6 flex justify-between items-center">
                            <span className="font-semibold">{s.label}</span>
                            <span className="text-lg font-bold">{stats[s.value] ?? 0}</span>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}
