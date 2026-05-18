import { Link, useLocation } from "react-router-dom";
import { useCityContext } from "../context/CityContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { resources } = useCityContext();
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) {
    return null; // Navbar must NOT appear when user is not authenticated
  }

  const getNavClass = (path: string) => {
    return location.pathname === path ? "nav-link active" : "nav-link";
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">🌆 Місто Симулятор</div>
      <div className="nav-links">
        <Link className={getNavClass("/")} to="/">Місто</Link>
        <Link className={getNavClass("/build")} to="/build">Будівництво</Link>
        <Link className={getNavClass("/resources")} to="/resources">Ресурси</Link>
        <Link className={getNavClass("/budget")} to="/budget">Бюджет</Link>
      </div>
      <div className="nav-stats">
        <span className="money-badge">💰 {resources.money}</span>
        <button onClick={logout} className="btn-secondary" style={{ marginLeft: '1rem', width: 'auto' }}>
          Вийти
        </button>
      </div>
    </nav>
  );
}