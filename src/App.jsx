import { accounts, budgetCategories, savingsBuckets, monthlyIncome, monthlyExpenses } from "./data";
import AccountCard from "./components/AccountCard";
import BudgetRow from "./components/BudgetRow";
import SavingsBucket from "./components/SavingsBucket";
import SavingsProjection from "./components/SavingsProjection";
import "./App.css";

const totalBalance = accounts.reduce((s, a) => s + a.balance, 0);
const totalChecking = accounts.filter((a) => a.type === "checking").reduce((s, a) => s + a.balance, 0);
const totalSavings = accounts.filter((a) => a.type === "savings").reduce((s, a) => s + a.balance, 0);
const totalSpent = budgetCategories.reduce((s, c) => s + c.spent, 0);
const totalBudget = budgetCategories.reduce((s, c) => s + c.budget, 0);
const overBudget = budgetCategories.filter((c) => c.spent > c.budget).length;

const today = new Date(2026, 3, 15);
const monthStr = today.toLocaleString("en-US", { month: "long", year: "numeric" });

export default function App() {
  return (
    <div className="dashboard">

      {/* ── HEADER ── */}
      <header className="dash-header">
        <div className="header-left">
          <h1 className="dash-title">FINANCE<br />DASHBOARD</h1>
          <div className="dash-date">{monthStr.toUpperCase()}</div>
        </div>
        <div className="header-stats">
          <div className="stat-block">
            <div className="stat-label">TOTAL BALANCE</div>
            <div className="stat-value total">
              {totalBalance.toLocaleString("en-US", { style: "currency", currency: "USD" })}
            </div>
          </div>
          <div className="stat-block">
            <div className="stat-label">MONTHLY SURPLUS</div>
            <div className="stat-value surplus">
              +{(monthlyIncome - monthlyExpenses).toLocaleString("en-US", { style: "currency", currency: "USD" })}
            </div>
          </div>
          <div className="stat-block">
            <div className="stat-label">BUDGET STATUS</div>
            <div className={`stat-value ${overBudget > 0 ? "over" : "ok"}`}>
              {overBudget > 0 ? `${overBudget} OVER` : "ON TRACK"}
            </div>
          </div>
        </div>
      </header>

      <div className="dash-grid">

        {/* ── ACCOUNTS ── */}
        <section className="panel accounts-panel">
          <div className="panel-heading">
            <span className="panel-number">01</span>
            <h2>ACCOUNTS</h2>
          </div>
          <div className="accounts-summary">
            <div className="summary-pill checking-pill">
              CHECKING &nbsp;
              {totalChecking.toLocaleString("en-US", { style: "currency", currency: "USD" })}
            </div>
            <div className="summary-pill savings-pill">
              SAVINGS &nbsp;
              {totalSavings.toLocaleString("en-US", { style: "currency", currency: "USD" })}
            </div>
          </div>
          <div className="accounts-grid">
            {accounts.map((a) => (
              <AccountCard key={a.id} account={a} />
            ))}
          </div>
        </section>

        {/* ── BUDGET ── */}
        <section className="panel budget-panel">
          <div className="panel-heading">
            <span className="panel-number">02</span>
            <h2>SPENDING</h2>
            <div className="budget-totals">
              <span className={totalSpent > totalBudget ? "over" : ""}>
                {totalSpent.toLocaleString("en-US", { style: "currency", currency: "USD" })} spent
              </span>
              &nbsp;/&nbsp;
              <span>{totalBudget.toLocaleString("en-US", { style: "currency", currency: "USD" })} budget</span>
            </div>
          </div>
          <div className="budget-list">
            {budgetCategories.map((c) => (
              <BudgetRow key={c.id} category={c} />
            ))}
          </div>
        </section>

        {/* ── SAVINGS BUCKETS ── */}
        <section className="panel buckets-panel">
          <div className="panel-heading">
            <span className="panel-number">03</span>
            <h2>SAVINGS GOALS</h2>
          </div>
          <div className="buckets-list">
            {savingsBuckets.map((b) => (
              <SavingsBucket key={b.id} bucket={b} />
            ))}
          </div>
        </section>

        {/* ── PROJECTION ── */}
        <section className="panel projection-panel">
          <div className="panel-heading">
            <span className="panel-number">04</span>
            <h2>24-MONTH PROJECTION</h2>
          </div>
          <p className="projection-subtitle">
            Based on current contributions + monthly surplus of&nbsp;
            <strong>
              +{(monthlyIncome - monthlyExpenses).toLocaleString("en-US", { style: "currency", currency: "USD" })}
            </strong>
          </p>
          <SavingsProjection />
        </section>

      </div>

      <footer className="dash-footer">
        DATA IS ILLUSTRATIVE — UPDATE <code>src/data.js</code> WITH YOUR REAL FIGURES
      </footer>
    </div>
  );
}
