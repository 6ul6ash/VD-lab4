import { useCityContext } from '../context/CityContext';

export default function ResourcesPage() {
  const { resources, collectResource } = useCityContext();

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Склад ресурсів</h1>
        <p>Збирайте матеріали для розвитку міста.</p>
      </header>

      <div className="resources-grid">
        <div className="resource-card">
          <div className="resource-icon">💰</div>
          <h3>Гроші</h3>
          <p className="resource-amount">{resources.money}</p>
          <p className="resource-desc">Основна валюта</p>
        </div>

        <div className="resource-card">
          <div className="resource-icon">🪵</div>
          <h3>Деревина</h3>
          <p className="resource-amount">{resources.wood}</p>
          <button className="btn-secondary" onClick={() => collectResource('wood', 10)}>
            Зібрати деревину
          </button>
        </div>

        <div className="resource-card">
          <div className="resource-icon">🪨</div>
          <h3>Камінь</h3>
          <p className="resource-amount">{resources.stone}</p>
          <button className="btn-secondary" onClick={() => collectResource('stone', 5)}>
            Зібрати камінь
          </button>
        </div>

        <div className="resource-card">
          <div className="resource-icon">⚡</div>
          <h3>Енергія</h3>
          <p className="resource-amount">{resources.energy}</p>
          <button className="btn-secondary" onClick={() => collectResource('energy', 15)}>
            Згенерувати
          </button>
        </div>
      </div>
    </div>
  );
}
