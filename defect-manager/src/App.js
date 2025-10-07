import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetailsPage from './pages/ProjectDetailsPage'
import DefectsPage from './pages/DefectsPage'
import DefectDetailsPage from './pages/DefectDetailsPage'
import ReportsPage from './pages/ReportsPage'
import PrivateRoute from './components/PrivateRoute'

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={<PrivateRoute><DashboardPage /></PrivateRoute>}
          />
          <Route
            path="/projects"
            element={<PrivateRoute><ProjectsPage /></PrivateRoute>}
          />
          <Route
            path="/projects/:id"
            element={<PrivateRoute><ProjectDetailsPage /></PrivateRoute>}
          />
          <Route
            path="/defects"
            element={<PrivateRoute><DefectsPage /></PrivateRoute>}
          />
          <Route
            path="/defects/:id"
            element={<PrivateRoute><DefectDetailsPage /></PrivateRoute>}
          />
          <Route
            path="/reports"
            element={<PrivateRoute><ReportsPage /></PrivateRoute>}
          />
          {/* Старые страницы убираем */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Layout>
    </Router>
  )
}
