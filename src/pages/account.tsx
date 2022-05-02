import React from 'react'
import { useParams } from 'react-router-dom'
import { useRecoilValueLoadable } from 'recoil'
import Layout from '../components/Layout/layout'
import BalanceCard from '../components/Accounts/BalanceCard'
import ProfileCard from '../components/Accounts/ProfileCard'
import StakingCard from '../components/Accounts/StakingCard'
import WalletCard from '../components/Accounts/WalletCard'
import { accountDetailState } from '../recoil/accounts'
import { currentWalletState } from '../recoil/wallets'
import { validatorsState } from '../recoil/validators'
import get from 'lodash/get'

type Props = {}

const Account = (props: Props) => {
  const params = useParams()
  const wallet = useRecoilValueLoadable(currentWalletState)
  const account = useRecoilValueLoadable(
    accountDetailState({ walletId: wallet.contents?.id, address: params.address })
  )
  const validators = useRecoilValueLoadable(
    validatorsState({ chainId: account.state === 'hasValue' ? account.contents.chain : '' })
  )

  return (
    <Layout title="Account" backPath="/">
      <div className="flex flex-col space-y-3 relative pb-4">
        {account.state === 'hasValue' && (
          <ProfileCard profile={get(account, ['contents', 'profile'])} />
        )}
        {account.state === 'hasValue' && <WalletCard account={account} validators={validators} />}
        <BalanceCard account={account} />
        <StakingCard account={account} validators={validators} />
      </div>
    </Layout>
  )
}

export default Account
