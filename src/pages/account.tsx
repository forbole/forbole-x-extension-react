import React from 'react'
import { useParams } from 'react-router-dom'
import { useRecoilValue, useRecoilValueLoadable } from 'recoil'
import Layout from '../components/Layout/layout'
import BalanceCard from '../components/Accounts/BalanceCard'
import ProfileCard from '../components/Accounts/ProfileCard'
import StakingCard from '../components/Accounts/StakingCard'
import WalletCard from '../components/Accounts/WalletCard'
import { accountDetailState } from '../recoil/accounts'
import { isFirstTimeUserState, passwordState } from '../recoil/general'
import { currentWalletState } from '../recoil/wallets'

type Props = {}

const Account = (props: Props) => {
  const params = useParams()

  const firstTime = useRecoilValueLoadable(isFirstTimeUserState)
  const password = useRecoilValue(passwordState)
  const wallet = useRecoilValueLoadable(currentWalletState)
  const account = useRecoilValueLoadable(
    accountDetailState({ walletId: wallet.contents?.id, address: params.address })
  )

  return (
    <Layout title="Account" backPath="/">
      <div className="flex flex-col space-y-3 h-full relative">
        <ProfileCard />
        <WalletCard account={account} />
        <BalanceCard account={account} />
        <StakingCard account={account} />
      </div>
    </Layout>
  )
}

export default Account
