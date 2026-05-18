import { Building } from '../types';
import { useCityContext } from '../context/CityContext';

interface Props {
  building: Building;
}

export default function BuildingCard({ building }: Props) {
  const { upgradeBuilding, resources } = useCityContext();
  
  const upgradeCost = building.level * 150;
  const canUpgrade = resources.money >= upgradeCost;

  const getBuildingEmoji = () => {
    switch(building.type) {
      case 'house': return '🏠';
      case 'road': return '🛣️';
      case 'factory': return '🏭';
      default: return '🏢';
    }
  };

  const getBuildingTypeName = () => {
    switch(building.type) {
      case 'house': return 'Будинок';
      case 'road': return 'Дорога';
      case 'factory': return 'Фабрика';
      default: return 'Будівля';
    }
  };

  return (
    <div className="building-card">
      <div className="building-icon">{getBuildingEmoji()}</div>
      <div className="building-info">
        <h3>{building.name}</h3>
        <p className="building-type">{getBuildingTypeName()}</p>
        <p className="building-level">Рівень: {building.level}</p>
      </div>
      <div className="building-actions">
        <button 
          onClick={() => upgradeBuilding(building.id)}
          disabled={!canUpgrade}
          className="upgrade-btn"
        >
          Покращити (💰 {upgradeCost})
        </button>
      </div>
    </div>
  );
}
