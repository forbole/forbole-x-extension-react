import { times } from 'lodash'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { fetchAccountBalance, fetchAvailableAccountBalance } from '../../../fetches/accounts'
import chains from '../../../misc/chains'
import getWalletAddress from '../../../misc/getWalletAddress'
import { formatCoins } from '../../../misc/utils'
import { useDecryptWallet } from '../../../recoil/wallets'
import Button from '../../Element/button'
import ButtonArea from '../../Element/buttonArea'
import Checkbox from '../../Element/checkbox'
import Table from '../../Element/table'

const NO_OF_ADDRESSES = 10

type Props = {
  onSubmit: (addresses: string[]) => void
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
  const [addresses, setAddresses] = useState<{ address: string; balance: Coin[] }[]>([])
  const [selectedAddresses, setSelectedAddresses] = useState([])
  const decryptWallet = useDecryptWallet()

  const loadAddresses = useCallback(async () => {
    try {
      const { mnemonic, privateKey } = decryptWallet(wallet.id, securityPassword)
      const addressesResult = await Promise.all(
        times(NO_OF_ADDRESSES).map((i) =>
          getWalletAddress({
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
        )
      )
      const balances = await Promise.all(
        addressesResult.map((a) => fetchAvailableAccountBalance(chain.chainId, a))
      )
      setAddresses(addressesResult.map((a, i) => ({ address: a, balance: balances[i] })))
    } catch (err) {
      console.log(err)
    }
  }, [wallet, securityPassword, ledgerTransport, chain, decryptWallet])

  useEffect(() => {
    loadAddresses()
  }, [loadAddresses])

  return (
    <div className="p-5">
      <p className="max-w-sm mb-2">Select account(s) you want to add</p>
      <div className="h-[360px] overflow-auto -mx-5 px-5">
        <Table
          head={['', '#', 'Address', <p className="text-right">Balance</p>]}
          rows={addresses.map((a, i) => [
            <Checkbox
              checked={selectedAddresses.includes(a.address)}
              onChange={() =>
                setSelectedAddresses((sa) =>
                  sa.includes(a.address) ? sa.filter((s) => s !== a.address) : [...sa, a.address]
                )
              }
            />,
            i,
            a.address.slice(0, 10) + '......' + a.address.slice(-10),
            <p className="text-right">{formatCoins(chain.chainId, a.balance)}</p>,
          ])}
        />
      </div>
      <button onClick={onAdvanceClick} className="text-primary-100 mt-4 hover:opacity-80">
        Advanced account
      </button>
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
