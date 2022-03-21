import React from 'react'
import { useParams } from 'react-router-dom'
import { useRecoilValue, useRecoilValueLoadable } from 'recoil'
import Layout from '../components/Layout/layout'
import BalanceCard from '../components/Wallet/BalanceCard'
import { accountDetailState } from '../recoil/accounts'
import { isFirstTimeUserState, passwordState } from '../recoil/general'
import { currentWalletState } from '../recoil/wallets'

type Props = {}

const Account = (props: Props) => {
  const params = useParams();


  const firstTime = useRecoilValueLoadable(isFirstTimeUserState)
  const password = useRecoilValue(passwordState)
  const wallet = useRecoilValueLoadable(currentWalletState)
  const account = useRecoilValueLoadable(accountDetailState({ walletId: wallet.contents?.id, address: params.address }))

  return (
    <Layout title="Account" backPath="/">
      <BalanceCard account={account} />
    </Layout>
  )
}

export default Account
