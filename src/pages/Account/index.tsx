import React from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValueLoadable } from 'recoil';
import get from 'lodash/get';
import BalanceCard from 'components/Accounts/BalanceCard';
import ProfileCard from 'components/Accounts/ProfileCard';
import StakingCard from 'components/Accounts/StakingCard';
import Layout from 'components/Layout/layout';
import WalletCard from 'components/Accounts/WalletCard';
import { Box, CircularProgress } from '@mui/material';
import { accountDetailState } from '../../recoil/accounts';
import { currentWalletState } from '../../recoil/wallets';
import { validatorsState } from '../../recoil/validators';
import TransactionsCard from './components/TransactionsCard';

const Account = () => {
  const params = useParams();
  const wallet = useRecoilValueLoadable(currentWalletState);
  const account = useRecoilValueLoadable(
    accountDetailState({ walletId: wallet.contents?.id, address: params.address })
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
        {account.state === 'hasValue' && <WalletCard account={account} />}
        <BalanceCard account={account} />
        <StakingCard account={account} validators={validators} />
        {account.state === 'hasValue' && validators.state === 'hasValue' ? (
          <TransactionsCard account={account.contents} />
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </div>
    </Layout>
  );
};

export default Account;
