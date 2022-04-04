import { useCallback, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { fetchAvailableAccountBalance } from '../../../fetches/accounts'
import getWalletAddress from '../../../misc/getWalletAddress'
import { formatCoins } from '../../../misc/utils'
import { accountsState } from '../../../recoil/accounts'
import { useDecryptWallet } from '../../../recoil/wallets'
import Button from '../../Element/button'
import Checkbox from '../../Element/checkbox'
import Table from '../../Element/table'
import { ReactComponent as Loading } from '../../../assets/images/icons/loading.svg'

const NO_OF_ADDRESSES = 10

type Props = {
  onSubmit: (accounts: { address: string; hdPath: HdPath }[]) => void
  onAdvanceClick: () => void
  wallet: Wallet
  chain: Chain
  securityPassword?: string
  ledgerTransport?: string
}

const SelectAccountStage = ({
  onSubmit,
  onAdvanceClick,
  wallet,
  chain,
  securityPassword,
  ledgerTransport,
}: Props) => {
  const accounts = useRecoilValue(accountsState)
  const [addresses, setAddresses] = useState<
    { address: string; balance: Coin[]; hdPath: HdPath }[]
  >([])
  const [loading, setLoading] = useState(false)
  const [selectedAddresses, setSelectedAddresses] = useState<{ address: string; hdPath: HdPath }[]>(
    []
  )
  const decryptWallet = useDecryptWallet()

  const loadAddresses = useCallback(async () => {
    try {
      setLoading(true)
      const { mnemonic, privateKey } =
        wallet.type === 'ledger'
          ? { mnemonic: '', privateKey: '' }
          : decryptWallet(wallet.id, securityPassword)
      const noOfAddresses = wallet.type === 'private key' ? 1 : NO_OF_ADDRESSES
      const addressesResult = []
      for (let i = 0; i < noOfAddresses; i += 1) {
        const address = await getWalletAddress({
          prefix: chain.prefix,
          mnemonic,
          privateKey,
          ledgerTransport,
          hdPath: {
            coinType: chain.coinType,
            account: i,
            change: 0,
            index: 0,
          },
          ledgerAppName: chain.ledgerAppName,
        })
        addressesResult.push(address)
      }

      const balances = await Promise.all(
        addressesResult.map((a) => fetchAvailableAccountBalance(chain.chainId, a))
      )
      setAddresses(
        addressesResult.map((a, i) => ({
          address: a,
          balance: balances[i],
          hdPath: { account: i, change: 0, index: 0 },
        }))
      )
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }, [wallet, securityPassword, ledgerTransport, chain, decryptWallet])

  useEffect(() => {
    loadAddresses()
  }, [loadAddresses])

  return (
    <div className="p-5">
      <p className="max-w-sm mb-2">Select account(s) you want to add</p>
      <div className="relative h-[360px] overflow-auto -mx-5 px-5">
        <Table
          head={['', '#', 'Address', <p className="text-right">Balance</p>]}
          rows={addresses.map((a, i) => {
            const isAddressExist = accounts.find((aa) => a.address === aa.address)
            return [
              <Checkbox
                disabled={isAddressExist}
                checked={selectedAddresses.find((s) => s.address === a.address)}
                onChange={() =>
                  setSelectedAddresses((sa) =>
                    sa.find((s) => s.address === a.address)
                      ? sa.filter((s) => s.address !== a.address)
                      : [...sa, { address: a.address, hdPath: a.hdPath }]
                  )
                }
              />,
              <p className={isAddressExist ? 'opacity-50' : ''}>{i}</p>,
              <p className={isAddressExist ? 'opacity-50' : ''}>
                {a.address.slice(0, 10) + '......' + a.address.slice(-10)}
              </p>,
              <p className={isAddressExist ? 'opacity-50 text-right' : 'text-right'}>
                {formatCoins(chain.chainId, a.balance)}
              </p>,
            ]
          })}
        />
        {loading && (
          <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
            <Loading className="w-12 h-12 nightwind-prevent text-primary-100 animate-spin" />
          </div>
        )}
      </div>
      {wallet.type !== 'private key' && (
        <button onClick={onAdvanceClick} className="text-primary-100 mt-4 hover:opacity-80">
          Advanced account
        </button>
      )}
      <div className="absolute bottom-4 left-4 right-4">
        <Button
          disabled={!selectedAddresses.length}
          text="Next"
          onClick={() => {
            onSubmit(selectedAddresses)
          }}
        />
      </div>
    </div>
  )
}

export default SelectAccountStage
