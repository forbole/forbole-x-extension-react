import React from 'react'
import { useRecoilValue } from 'recoil'
import { ReactComponent as DsmAvatar } from '../../assets/images/cryptocurrencies/dsm.svg'
import { accountState } from '../../recoil/accounts'

interface Props {
  walletId: string
  address: string
}

const AccountStatCard = ({ walletId, address }: Props) => {
  const account = useRecoilValue(accountState({ walletId, address }))

  if (!account) {
    return null
  }

  return (
    <div className="bg-popup-100 p-6">
      <div className="w-full flex space-x-3 mb-3">
        <DsmAvatar className="w-12 h-12" />
        <div>
          <h4>{account.name}</h4>
          <p className="text-font-200 text-xs">{account.address}</p>
        </div>
      </div>
      <div className="divide-y divide-divider-100">
        <div className="mb-3">
          <h3>0 DSM</h3>
          <p>$0 USD</p>
        </div>
        <div className="flex space-x-10 pt-3">
          <div>
            <p className="text-font-200 text-sm">Pending Rewards</p>
            <h4>0 DSM</h4>
          </div>
          <div>
            <p className="text-font-200 text-sm">Delegate (41% Inflation)</p>
            <h4>0 DSM</h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountStatCard
