import React from "react";
import AccountStatCard from "../../../components/Wallet/AccountStatCard";

interface Props {}

const WalletAccounts = (props: Props) => {
  return (
    <div>
      <div className="px-5">
        <div className="space-y-3">
          <h3>Accounts</h3>
          <AccountStatCard />
        </div>
      </div>
    </div>
  );
};

export default WalletAccounts;
