import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import CityPage from './pages/CityPage';
import BuildPage from './pages/BuildPage';
import ResourcesPage from './pages/ResourcesPage';
import BudgetPage from './pages/BudgetPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
import { CityProvider } from './context/CityContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';

// Component to handle unknown route redirects based on auth state
function FallbackRoute() {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <Navigate to="/" replace /> : <Navigate to="/login" replace />;
}

// Redirect if logged in
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <Navigate to="/" replace /> : <>{children}</>;
}

function App() {
  return (
    <AuthProvider>
      <CityProvider>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
              <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
              
              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<CityPage />} />
                <Route path="/build" element={<BuildPage />} />
                <Route path="/resources" element={<ResourcesPage />} />
                <Route path="/budget" element={<BudgetPage />} />
              </Route>

              {/* Fallback Route */}
              <Route path="*" element={<FallbackRoute />} />
            </Routes>
          </main>
        </div>
      </CityProvider>
    </AuthProvider>
  );
}

export default App;
