export default function AccountCard({ account }) {
  const isChecking = account.type === "checking";

  return (
    <div className={`account-card ${account.type}`}>
      <div className="account-type-badge">{account.type.toUpperCase()}</div>
      <div className="account-name">{account.name}</div>
      <div className="account-balance">
        {account.balance.toLocaleString("en-US", { style: "currency", currency: "USD" })}
      </div>
      {account.apy && (
        <div className="account-apy">APY {account.apy}%</div>
      )}
    </div>
  );
}
