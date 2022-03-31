import React from 'react'
import { Link } from 'react-router-dom'

import AccountStatCard from './AccountStatCard'
import { ReactComponent as ShareIcon } from '../../assets/images/icons/icon_share.svg'
import { ReactComponent as AddIcon } from '../../assets/images/icons/icon_add_wallet.svg'
import IconButton from '../Element/iconButton'
import CreateAccountDialog from './CreateAccountDialog'

type Props = {
  wallet: Wallet
  accounts: AccountDetail[]
}

const AccountList: React.FC<Props> = ({ accounts, wallet }) => {
  const [isCreateAccountDialogOpen, setIsCreateAccountDialogOpen] = React.useState(false)
  return (
    <>
      <div className="space-y-3 flex flex-col px-5">
        <div className="flex space-x-3 justify-between p-2">
          <div className="flex space-x-3 items-start">
            <h3 className="leading-none">Account</h3>
            <IconButton icon={<ShareIcon />} />
          </div>
          <IconButton onClick={() => setIsCreateAccountDialogOpen(true)} icon={<AddIcon />} />
        </div>
        {accounts?.map((acct) => (
          <Link key={acct.address} to={`/account/${acct.address}`}>
            <AccountStatCard account={acct} />
          </Link>
        ))}
      </div>
      <CreateAccountDialog
        wallet={wallet}
        open={isCreateAccountDialogOpen}
        onClose={() => setIsCreateAccountDialogOpen(false)}
      />
    </>
  )
}

export default AccountList
