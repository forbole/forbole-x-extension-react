import React from 'react';
import GetStarted from '../components/Layout/GetStarted';
import Layout from '../components/Layout/layout';
import { useAlwaysRequirePassword, useFirstTime } from '../recoil/general/generalState';
import { useState } from 'react';
import WalletAccounts from '../components/Layout/Accounts';

const Wallet = () => {
  const [alwaysRequirePassword, setAlwaysRequirePassword] =
    useAlwaysRequirePassword();
  

  const [firstTime, setFirstTime] = useFirstTime();
  return (
    <Layout title='Wallet'>
      <>
        {firstTime ? (
          <div
          >
            <GetStarted />
          </div>
        ) : (
          <WalletAccounts />
        )}
      </>
    </Layout>
  );
};

export default Wallet;
