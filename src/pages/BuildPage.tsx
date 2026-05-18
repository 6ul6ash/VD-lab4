import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCityContext } from '../context/CityContext';
import { BuildingType } from '../types';

export default function BuildPage() {
  const [name, setName] = useState('');
  const [type, setType] = useState<BuildingType>('house');
  const [error, setError] = useState('');
  
  const { addBuilding, resources } = useCityContext();
  const navigate = useNavigate();

  const handleBuild = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Введіть назву будівлі!');
      return;
    }

    const success = addBuilding(name, type);
    if (success) {
      navigate('/');
    } else {
      setError('Недостатньо грошей для будівництва (потрібно 100 💰)');
    }
  };

  return (
    <div className="page-container flex-center">
      <div className="build-card">
        <h2>Нова будівля</h2>
        <p className="cost-info">Базова вартість: 100 💰</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleBuild} className="build-form">
          <div className="form-group">
            <label htmlFor="name">Назва будівлі</label>
            <input 
              id="name"
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Наприклад: Центральний парк"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="type">Тип</label>
            <select id="type" value={type} onChange={(e) => setType(e.target.value as BuildingType)}>
              <option value="house">🏠 Будинок (витрати)</option>
              <option value="road">🛣️ Дорога (витрати)</option>
              <option value="factory">🏭 Фабрика (дохід)</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="btn-primary full-width"
            disabled={resources.money < 100}
          >
            Збудувати
          </button>
        </form>
      </div>
    </div>
  );
}
