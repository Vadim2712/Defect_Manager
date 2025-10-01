import Layout from '../components/Layout'

export default function EngineerPage() {
    return (
        <Layout>
            <div className="bg-white p-6 rounded-xl shadow max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Страница инженера</h2>
                <p>Здесь инженер может регистрировать и обновлять дефекты.</p>
            </div>
        </Layout>
    )
}
