import { savingsBuckets, monthlyIncome, monthlyExpenses } from "../data";

function buildProjection(months = 24) {
  const monthlySurplus = monthlyIncome - monthlyExpenses;
  const totalMonthlyContrib = savingsBuckets.reduce((s, b) => s + b.monthlyContrib, 0);

  // Starting total savings across all accounts modeled simply
  const startingSavings = savingsBuckets.reduce((s, b) => s + b.saved, 0);

  const points = [];
  for (let m = 0; m <= months; m++) {
    const savings = startingSavings + totalMonthlyContrib * m;
    const surplus = monthlySurplus * m;
    points.push({ month: m, savings, surplus });
  }
  return points;
}

function formatMonth(m) {
  const now = new Date(2026, 3); // April 2026
  const d = new Date(now.getFullYear(), now.getMonth() + m);
  return d.toLocaleString("en-US", { month: "short", year: "2-digit" });
}

export default function SavingsProjection() {
  const data = buildProjection(24);
  const maxVal = Math.max(...data.map((d) => Math.max(d.savings, d.surplus)));

  const W = 100; // percent-based SVG viewBox
  const H = 160;
  const PAD = { top: 10, right: 4, bottom: 30, left: 0 };

  const xScale = (m) => PAD.left + (m / 24) * (W - PAD.left - PAD.right);
  const yScale = (v) => PAD.top + (1 - v / maxVal) * (H - PAD.top - PAD.bottom);

  const savingsPath = data
    .map((d, i) => `${i === 0 ? "M" : "L"}${xScale(d.month).toFixed(1)},${yScale(d.savings).toFixed(1)}`)
    .join(" ");

  const surplusPath = data
    .map((d, i) => `${i === 0 ? "M" : "L"}${xScale(d.month).toFixed(1)},${yScale(d.surplus).toFixed(1)}`)
    .join(" ");

  // Milestone markers — when each bucket hits goal
  const milestones = savingsBuckets
    .map((b) => {
      const remaining = b.goal - b.saved;
      const mLeft = remaining > 0 ? Math.ceil(remaining / b.monthlyContrib) : 0;
      return mLeft <= 24 ? { month: mLeft, name: b.name, color: b.color } : null;
    })
    .filter(Boolean);

  // Y-axis labels
  const yTicks = [0, maxVal * 0.25, maxVal * 0.5, maxVal * 0.75, maxVal];

  return (
    <div className="projection-wrap">
      <div className="projection-legend">
        <span className="legend-item savings-line">Bucket Savings</span>
        <span className="legend-item surplus-line">Monthly Surplus</span>
        {milestones.map((m) => (
          <span key={m.name} className="legend-item" style={{ borderColor: m.color, color: m.color }}>
            ★ {m.name}
          </span>
        ))}
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="projection-svg" preserveAspectRatio="none">
        {/* Grid lines */}
        {yTicks.map((v, i) => (
          <line
            key={i}
            x1={PAD.left}
            y1={yScale(v)}
            x2={W - PAD.right}
            y2={yScale(v)}
            stroke="#222"
            strokeWidth="0.3"
            strokeDasharray="1,1"
          />
        ))}

        {/* Milestone verticals */}
        {milestones.map((m) => (
          <g key={m.name}>
            <line
              x1={xScale(m.month)}
              y1={PAD.top}
              x2={xScale(m.month)}
              y2={H - PAD.bottom}
              stroke={m.color}
              strokeWidth="0.7"
              strokeDasharray="2,1"
            />
          </g>
        ))}

        {/* Surplus path */}
        <path d={surplusPath} fill="none" stroke="#555" strokeWidth="0.8" strokeDasharray="2,1" />

        {/* Savings path */}
        <path d={savingsPath} fill="none" stroke="#FFD600" strokeWidth="1.2" />

        {/* Milestone dots */}
        {milestones.map((m) => {
          const pt = data[m.month];
          return (
            <circle
              key={m.name}
              cx={xScale(m.month)}
              cy={yScale(pt.savings)}
              r="1.5"
              fill={m.color}
              stroke="#000"
              strokeWidth="0.4"
            />
          );
        })}

        {/* X-axis labels every 4 months */}
        {data
          .filter((d) => d.month % 4 === 0)
          .map((d) => (
            <text
              key={d.month}
              x={xScale(d.month)}
              y={H - PAD.bottom + 8}
              textAnchor="middle"
              fontSize="4"
              fill="#333"
              fontFamily="monospace"
            >
              {formatMonth(d.month)}
            </text>
          ))}
      </svg>

      {/* Milestone callouts below chart */}
      <div className="projection-milestones">
        {milestones.map((m) => (
          <div key={m.name} className="milestone-tag" style={{ borderColor: m.color }}>
            <span style={{ color: m.color }}>★</span> {m.name} — {formatMonth(m.month)}
          </div>
        ))}
        <div className="milestone-tag net-worth-tag">
          <span>NET +</span>
          {((monthlyIncome - monthlyExpenses) * 24).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}{" "}
          over 24 mo
        </div>
      </div>
    </div>
  );
}
