import React, { Suspense } from "react";
import GetStarted from "../components/Layout/GetStarted";
import Layout from "../components/Layout/layout";
import WalletAccounts from "../components/Layout/Accounts";
import { isFirstTimeUserState, passwordState } from "../recoil/wallets";
import { useRecoilState } from "recoil";
import UnlockDialog from "../components/Layout/UnlockDialog";

const Wallet = () => {
  const [firstTime] = useRecoilState(isFirstTimeUserState);
  const [password] = useRecoilState(passwordState);

  return (
    <Layout title="Wallet">
      {firstTime ? (
        <GetStarted />
      ) : (
        <>
          <WalletAccounts />
          <UnlockDialog open={!password} />
        </>
      )}
    </Layout>
  );
};

const WalletWrapper = () => (
  <Suspense fallback={GetStarted}>
    <Wallet />
  </Suspense>
);

export default WalletWrapper;
