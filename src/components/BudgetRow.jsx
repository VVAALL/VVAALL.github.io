export default function BudgetRow({ category }) {
  const pct = Math.min((category.spent / category.budget) * 100, 100);
  const over = category.spent > category.budget;
  const remaining = category.budget - category.spent;

  return (
    <div className="budget-row">
      <div className="budget-row-header">
        <span className="budget-icon">{category.icon}</span>
        <span className="budget-name">{category.name}</span>
        <span className={`budget-amounts ${over ? "over" : ""}`}>
          <span className="spent">
            {category.spent.toLocaleString("en-US", { style: "currency", currency: "USD" })}
          </span>
          <span className="separator"> / </span>
          <span className="budget-limit">
            {category.budget.toLocaleString("en-US", { style: "currency", currency: "USD" })}
          </span>
        </span>
        <span className={`budget-remaining ${over ? "over" : remaining === 0 ? "exact" : ""}`}>
          {over
            ? `+${Math.abs(remaining).toLocaleString("en-US", { style: "currency", currency: "USD" })} OVER`
            : remaining === 0
            ? "EXACT"
            : `${remaining.toLocaleString("en-US", { style: "currency", currency: "USD" })} left`}
        </span>
      </div>
      <div className="progress-track">
        <div
          className={`progress-fill ${over ? "over" : pct >= 90 ? "warning" : "ok"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
