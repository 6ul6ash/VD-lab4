import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    // Prevent UI leakage and flicker while checking auth state
    return (
      <div className="flex-center" style={{ minHeight: '100vh', flexDirection: 'column' }}>
        <h2>Завантаження...</h2>
        <p>Перевірка авторизації</p>
      </div>
    );
  }

  // If user is not logged in, redirect them to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Render the child routes if authorized
  return <Outlet />;
}
