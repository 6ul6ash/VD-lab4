import { useCityContext } from '../context/CityContext';
import BuildingCard from '../components/BuildingCard';
import { Link } from 'react-router-dom';

export default function CityPage() {
  const { buildings } = useCityContext();

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Ваше місто</h1>
        <p>Керуйте своїми будівлями та покращуйте інфраструктуру.</p>
      </header>

      {buildings.length === 0 ? (
        <div className="empty-state">
          <h2>У вашому місті ще немає будівель</h2>
          <p>Перейдіть на вкладку "Будівництво", щоб почати розбудову!</p>
          <Link to="/build" className="btn-primary">Побудувати</Link>
        </div>
      ) : (
        <div className="buildings-grid">
          {buildings.map((building) => (
            <BuildingCard key={building.id} building={building} />
          ))}
        </div>
      )}
    </div>
  );
}
