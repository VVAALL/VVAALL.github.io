// Mock financial data — edit these values to match your real accounts
export const accounts = [
  { id: 1, name: "Chase Checking", type: "checking", balance: 3_842.17, institution: "Chase" },
  { id: 2, name: "Ally Checking",  type: "checking", balance: 1_205.50, institution: "Ally" },
  { id: 3, name: "Chase Savings",  type: "savings",  balance: 6_410.00, institution: "Chase" },
  { id: 4, name: "Ally HYSA",      type: "savings",  balance: 12_880.33, institution: "Ally", apy: 4.5 },
];

export const budgetCategories = [
  { id: 1, name: "Housing",       spent: 1_200, budget: 1_200, icon: "🏠" },
  { id: 2, name: "Groceries",     spent: 310,   budget: 400,   icon: "🛒" },
  { id: 3, name: "Dining Out",    spent: 175,   budget: 150,   icon: "🍔" },
  { id: 4, name: "Transport",     spent: 88,    budget: 120,   icon: "🚗" },
  { id: 5, name: "Subscriptions", spent: 62,    budget: 70,    icon: "📱" },
  { id: 6, name: "Healthcare",    spent: 0,     budget: 100,   icon: "💊" },
  { id: 7, name: "Entertainment", spent: 94,    budget: 80,    icon: "🎮" },
  { id: 8, name: "Clothing",      spent: 45,    budget: 60,    icon: "👕" },
];

export const savingsBuckets = [
  {
    id: 1,
    name: "Emergency Fund",
    saved: 4_200,
    goal: 10_000,
    monthlyContrib: 300,
    color: "#FFD600",
    description: "3–6 months of expenses",
  },
  {
    id: 2,
    name: "Vacation 2025",
    saved: 880,
    goal: 3_000,
    monthlyContrib: 200,
    color: "#00E5FF",
    description: "Europe trip — flights + hotels",
  },
];

// Monthly income after tax, for projection math
export const monthlyIncome = 5_200;
export const monthlyExpenses = budgetCategories.reduce((s, c) => s + c.budget, 0);
