export default function SavingsBucket({ bucket }) {
  const pct = Math.min((bucket.saved / bucket.goal) * 100, 100);
  const remaining = bucket.goal - bucket.saved;
  const monthsLeft = remaining > 0 ? Math.ceil(remaining / bucket.monthlyContrib) : 0;

  return (
    <div className="savings-bucket">
      <div className="bucket-header">
        <div>
          <div className="bucket-name">{bucket.name}</div>
          <div className="bucket-desc">{bucket.description}</div>
        </div>
        <div className="bucket-pct" style={{ color: bucket.color }}>
          {pct.toFixed(0)}%
        </div>
      </div>

      <div className="bucket-amounts">
        <span className="bucket-saved">
          {bucket.saved.toLocaleString("en-US", { style: "currency", currency: "USD" })}
        </span>
        <span className="bucket-separator"> of </span>
        <span className="bucket-goal">
          {bucket.goal.toLocaleString("en-US", { style: "currency", currency: "USD" })}
        </span>
      </div>

      <div className="progress-track bucket-track">
        <div
          className="progress-fill bucket-fill"
          style={{ width: `${pct}%`, background: bucket.color }}
        />
      </div>

      <div className="bucket-footer">
        <span>
          +{bucket.monthlyContrib.toLocaleString("en-US", { style: "currency", currency: "USD" })}/mo
        </span>
        {monthsLeft > 0 && (
          <span className="months-left">
            ~{monthsLeft} month{monthsLeft !== 1 ? "s" : ""} to goal
          </span>
        )}
        {monthsLeft === 0 && <span className="goal-reached">GOAL REACHED</span>}
      </div>
    </div>
  );
}
