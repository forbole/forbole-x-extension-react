import React from 'react'
import Layout from '../components/Layout/layout'
import BalanceCard from '../components/Wallet/BalanceCard'

type Props = {}

const Account = (props: Props) => {
  return (
    <Layout title="Account" backPath="/">
      <BalanceCard />
    </Layout>
  )
}

export default Account