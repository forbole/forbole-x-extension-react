import { useRecoilValue } from 'recoil'
import AccountStatCard from '../../../components/Wallet/AccountStatCard'
import { walletAccountsState } from '../../../recoil/accounts'

interface Props {
  walletId: string
}

const WalletAccounts = ({ walletId }: Props) => {
  const accounts = useRecoilValue(walletAccountsState(walletId))

  return (
    <div>
      <div className="px-5">
        <div className="space-y-3">
          <h3>Accounts</h3>
          {accounts.map((a) => (
            <AccountStatCard key={a.address} account={a} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default WalletAccounts
