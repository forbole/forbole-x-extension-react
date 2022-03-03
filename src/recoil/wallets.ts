import { atom, selector, useRecoilState, useSetRecoilState } from 'recoil'
import CryptoJS from 'crypto-js'
import { useCallback } from 'react'
import {
  encryptAndSaveToChromeStorage,
  getStorage,
  setStorage,
} from './utils/chromeStorageEncryption'
import chains from '../misc/chains'
import { isFirstTimeUserState, passwordState } from './general'
import { accountsState } from './accounts'

export const currentWalletIdState = atom<string>({
  key: 'currentWalletId',
  default: getStorage('currentWalletId'),
  effects: [
    ({ onSet }) => {
      onSet((currentWalletId) => setStorage({ currentWalletId }))
    },
  ],
})

export const walletsState = atom<Wallet[]>({
  key: 'wallets',
  default: [],
  effects: [
    ({ onSet, getPromise }) => {
      onSet(async (newWallets) => {
        const password = await getPromise(passwordState)
        password && (await encryptAndSaveToChromeStorage('wallets', newWallets, password))
      })
    },
  ],
})

export const currentWalletState = selector<Wallet | undefined>({
  key: 'currentWallet',
  get: ({ get }) => {
    const currentWalletId = get(currentWalletIdState)
    const wallets = get(walletsState)
    return wallets.find((w) => w.id === currentWalletId)
  },
})

export const useCreateWallet = () => {
  const [wallets, setWallets] = useRecoilState(walletsState)
  const [accounts, setAccounts] = useRecoilState(accountsState)
  const setFirstTime = useSetRecoilState(isFirstTimeUserState)
  const setCurrentWalletId = useSetRecoilState(currentWalletIdState)

  const createWallet = useCallback(
    async (params: CreateWalletParams) => {
      const createdAt = Date.now()
      const id = String(Math.random())

      const newWallets = [
        ...wallets,
        {
          type: params.type,
          name: params.name,
          id,
          createdAt,
          mnemonic:
            params.mnemonic && params.securityPassword
              ? CryptoJS.AES.encrypt(params.mnemonic, params.securityPassword).toString()
              : '',
          privateKey:
            params.privateKey && params.securityPassword
              ? CryptoJS.AES.encrypt(params.privateKey, params.securityPassword).toString()
              : '',
        },
      ]
      const newAccounts = [
        ...accounts,
        ...params.accounts.map((account) => ({
          walletId: id,
          address: account.address,
          chain: account.chain,
          hdPath: {
            account: 0,
            change: 0,
            index: 0,
          },
          name: chains[account.chain].symbol,
          fav: false,
          createdAt,
        })),
      ]
      setWallets(newWallets)
      setAccounts(newAccounts)
      setFirstTime(false)
      setCurrentWalletId(id)
    },
    [setWallets, setAccounts, setFirstTime, accounts, wallets, setCurrentWalletId]
  )

  return createWallet
}
