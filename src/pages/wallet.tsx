import GetStarted from "../components/Layout/GetStarted";
import Layout from "../components/Layout/layout";
import WalletAccounts from "../components/Layout/Accounts";
import { currentWalletState } from "../recoil/wallets";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import UnlockDialog from "../components/Layout/UnlockDialog";
import { isFirstTimeUserState, passwordState } from "../recoil/general";
import Dropdown from "../components/Element/dropdown";
import { ReactComponent as WalletIcon } from "../assets/images/icons/icon_wallet_manage.svg";

const Wallet = () => {
  const firstTime = useRecoilValueLoadable(isFirstTimeUserState);
  const password = useRecoilValue(passwordState);
  const wallet = useRecoilValueLoadable(currentWalletState);

  return (
    <Layout
      title={wallet.contents?.name}
      rightElement={
        <Dropdown
          items={[
            { title: "Add Wallet" },
            { title: "Change Wallet Moniker" },
            { title: "Change Wallet Security Password" },
            { title: "View Secret Recovery Phrase" },
            { title: "Delete Wallet" },
          ]}
        >
          <WalletIcon className="w-5 fill-dark dark:fill-white" />
        </Dropdown>
      }
    >
      {firstTime.state !== "hasValue" || firstTime.contents ? (
        <GetStarted />
      ) : (
        <>
          {wallet.contents && <WalletAccounts walletId={wallet.contents.id} />}
          <UnlockDialog open={!password} />
        </>
      )}
    </Layout>
  );
};

export default Wallet;
