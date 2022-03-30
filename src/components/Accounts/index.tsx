import { useRecoilValue } from 'recoil'
import { walletAccountsState } from '../../recoil/accounts'
import AccountList from './AccountList'

interface Props {
  walletId: string
}

const WalletAccounts = ({ walletId }: Props) => {
  const accounts = useRecoilValue(walletAccountsState(walletId))

  return (
    <div>
      <div className="px-5">
        <AccountList accounts={accounts} />
      </div>
    </div>
  )
}

export default WalletAccounts
