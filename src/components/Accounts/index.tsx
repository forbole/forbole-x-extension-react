import { useRecoilValue } from 'recoil'
import { walletAccountsState } from '../../recoil/accounts'
import AccountList from './AccountList'

interface Props {
  wallet: Wallet
}

const WalletAccounts = ({ wallet }: Props) => {
  const accounts = useRecoilValue(walletAccountsState(wallet.id))

  return <AccountList accounts={accounts} wallet={wallet} />
}

export default WalletAccounts
