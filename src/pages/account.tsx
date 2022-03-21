import React from 'react'
import Layout from '../components/Layout/layout'
import BalanceCard from '../components/Wallet/BalanceCard'
import ProfileCard from '../components/Wallet/ProfileCard'

type Props = {}

const Account = (props: Props) => {
  return (
    <Layout title="Account" backPath="/">
      <>
        <ProfileCard />
        <BalanceCard />
      </>
    </Layout>
  )
}

export default Account
