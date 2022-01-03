import React from 'react';
import Layout from '../components/Layout/layout';
import AccountStatCard from '../components/Wallet/AccountStatCard';
import { useAlwaysRequirePassword } from '../recoil/general/generalState';

const Wallet = () => {
  const [alwaysRequirePassword, setAlwaysRequirePassword] =
    useAlwaysRequirePassword();
  return (
    <Layout title='Wallet'>
      <div className='px-5'>
        <div className='space-y-3'>
          <h3>Accounts</h3>
          <AccountStatCard />
        </div>
      </div>
    </Layout>
  );
};

export default Wallet;
