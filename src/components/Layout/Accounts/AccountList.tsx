import React from 'react'
import { Link } from 'react-router-dom'

import AccountStatCard from '../../Wallet/AccountStatCard'
import {ReactComponent as ShareIcon} from '../../../assets/images/icons/icon_share.svg'

type Props = {
  accounts: any[]
}

const AccountList = ({ accounts }) => {
  return (
    <div className="space-y-3 flex flex-col">
      <div className='flex space-x-3 items-start'>
      <h3 className='leading-none'>Account</h3>
      <ShareIcon className='w-[18px] h-[18px] fill-icon-light dark:fill-icon-dark' />
      </div>
      {accounts?.map((acct) => (
        <Link to={`/account/${acct.address}`}>
          <AccountStatCard key={acct.address} account={acct} />
        </Link>
      ))}
    </div>
  )
}

export default AccountList
