import { useCityContext } from '../context/CityContext';

export default function BudgetPage() {
  const { calculateIncome, calculateExpenses, collectIncome } = useCityContext();
  
  const income = calculateIncome();
  const expenses = calculateExpenses();
  const net = income - expenses;

  return (
    <div className="page-container flex-center">
      <div className="budget-card">
        <h2>Міський Бюджет</h2>
        <p className="budget-desc">Фабрики приносять дохід, а будинки та дороги потребують витрат на обслуговування.</p>

        <div className="budget-stats">
          <div className="stat-row">
            <span>Доходи (від фабрик):</span>
            <span className="income-text">+ {income} 💰</span>
          </div>
          <div className="stat-row">
            <span>Витрати (інфраструктура):</span>
            <span className="expense-text">- {expenses} 💰</span>
          </div>
          <hr />
          <div className="stat-row total">
            <span>Чистий прибуток:</span>
            <span className={net >= 0 ? "income-text" : "expense-text"}>
              {net > 0 ? '+' : ''}{net} 💰
            </span>
          </div>
        </div>

        <button 
          className="btn-primary full-width mt-4" 
          onClick={collectIncome}
        >
          Зібрати податки та дохід
        </button>
      </div>
    </div>
  );
}
