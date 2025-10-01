import Layout from '../components/Layout'

export default function ManagerPage() {
    return (
        <Layout>
            <div className="bg-white p-6 rounded-xl shadow max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Страница менеджера</h2>
                <p>Здесь менеджер может назначать задачи инженерам и формировать отчёты.</p>
            </div>
        </Layout>
    )
}
