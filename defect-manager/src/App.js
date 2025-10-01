import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import ProjectsPage from './pages/ProjectsPage.jsx'
import DefectsPage from './pages/DefectsPage.jsx'
import DefectDetailsPage from './pages/DefectDetailsPage.jsx'
import ReportsPage from './pages/ReportsPage.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import EngineerPage from './pages/EngineerPage.jsx'
import ManagerPage from './pages/ManagerPage.jsx'
import LeaderPage from './pages/LeaderPage.jsx'
import authService from './services/authService.js'
import ProjectDetailsPage from './pages/ProjectDetailsPage.jsx'

function RoleRoute({ role, children }) {
  const user = authService.getCurrentUser()
  if (!user) return <Navigate to="/login" />
  return user.role === role ? children : <Navigate to="/dashboard" />
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/dashboard" element={
          <PrivateRoute><DashboardPage /></PrivateRoute>
        } />
        <Route path="/projects" element={
          <PrivateRoute><ProjectsPage /></PrivateRoute>
        } />
        <Route path="/defects" element={
          <PrivateRoute><DefectsPage /></PrivateRoute>
        } />
        <Route path="/defects/:id" element={
          <PrivateRoute><DefectDetailsPage /></PrivateRoute>
        } />
        <Route path="/reports" element={
          <PrivateRoute><ReportsPage /></PrivateRoute>
        } />
        <Route path="/projects/:id" element={
          <PrivateRoute><ProjectDetailsPage /></PrivateRoute>
        } />

        {/* Ролевые страницы */}
        <Route path="/engineer" element={
          <RoleRoute role="инженер"><EngineerPage /></RoleRoute>
        } />
        <Route path="/manager" element={
          <RoleRoute role="менеджер"><ManagerPage /></RoleRoute>
        } />
        <Route path="/leader" element={
          <RoleRoute role="руководитель"><LeaderPage /></RoleRoute>
        } />

        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}
