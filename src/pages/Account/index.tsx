import React from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import get from 'lodash/get';
import BalanceCard from 'components/Accounts/BalanceCard';
import ProfileCard from 'components/Accounts/ProfileCard';
import Layout from 'components/Layout/layout';
import WalletCard from 'components/Accounts/WalletCard';
import { currencyState } from '@recoil/settings';
import StakingCard from './components/StakingCard';
import { accountDetailState } from '../../recoil/accounts';
import { currentWalletState } from '../../recoil/wallets';
import { validatorsState } from '../../recoil/validators';
import TransactionsCard from './components/TransactionsCard';

const Account = () => {
  const params = useParams();
  const wallet = useRecoilValueLoadable(currentWalletState);
  const currency = useRecoilValue(currencyState);
  const account = useRecoilValueLoadable(
    accountDetailState({ walletId: wallet.contents?.id, address: params.address, currency })
  );
  const validators = useRecoilValueLoadable(
    validatorsState({ chainId: account.state === 'hasValue' ? account.contents.chain : '' })
  );

  return (
    <Layout title="Account" backPath="/">
      <div className="flex flex-col space-y-3 relative pb-4">
        {account.state === 'hasValue' && (
          <ProfileCard profile={get(account, ['contents', 'profile'])} />
        )}
        {account.state === 'hasValue' && <WalletCard account={account} validators={validators} />}
        <BalanceCard account={account} />
        <StakingCard account={account} validators={validators} />

        <TransactionsCard account={account} validators={validators} />
      </div>
    </Layout>
  );
};

export default Account;
