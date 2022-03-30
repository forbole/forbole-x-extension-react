import {
  atom,
  selector,
  useRecoilState,
  useRecoilStateLoadable,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil'
import CryptoJS from 'crypto-js'
import { useCallback } from 'react'
import {
  encryptAndSaveToChromeStorage,
  getStorage,
  removeStorage,
  setStorage,
} from './utils/chromeStorageEncryption'
import chains from '../misc/chains'
import { isFirstTimeUserState, passwordState } from './general'
import { accountsState } from './accounts'
import { cloneDeep } from 'lodash'

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
        if (password && newWallets.length) {
          await encryptAndSaveToChromeStorage('wallets', newWallets, password)
        } else {
          await removeStorage('wallets')
        }
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
  const setWallets = useSetRecoilState(walletsState)
  const setAccounts = useSetRecoilState(accountsState)
  const setFirstTime = useSetRecoilState(isFirstTimeUserState)
  const setCurrentWalletId = useSetRecoilState(currentWalletIdState)

  const createWallet = useCallback(
    async (params: CreateWalletParams) => {
      const createdAt = Date.now()
      const id = String(createdAt)

      setWallets((wallets) => [
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
      ])
      setAccounts((accounts) => [
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
      ])
      setFirstTime(false)
      setCurrentWalletId(id)
    },
    [setWallets, setAccounts, setFirstTime, setCurrentWalletId]
  )

  return createWallet
}

export const useDeleteWallet = () => {
  const [wallets, setWallets] = useRecoilState(walletsState)
  const setAccounts = useSetRecoilState(accountsState)
  const [currentWalletId, setCurrentWalletId] = useRecoilStateLoadable(currentWalletIdState)
  const setIsFirstTimeUser = useSetRecoilState(isFirstTimeUserState)

  const deleteWallet = useCallback(
    (id: string) => {
      const newWallets = wallets.filter((w) => w.id !== id)
      if (id === currentWalletId.contents) {
        setCurrentWalletId(newWallets[0] ? newWallets[0].id : '')
      }
      if (!newWallets.length) {
        setIsFirstTimeUser(true)
      }
      setWallets(newWallets)
      setAccounts((accounts) => accounts.filter((a) => a.walletId !== id))
    },
    [setWallets, setAccounts, currentWalletId, setCurrentWalletId, wallets, setIsFirstTimeUser]
  )

  return deleteWallet
}

export const useDecryptWallet = () => {
  const wallets = useRecoilValue(walletsState)
  const decryptWallet = useCallback(
    (id: string, password: string) => {
      const wallet = wallets.find((w) => w.id === id)
      if (!wallet) {
        throw new Error('Wallet does not exist')
      }
      if (wallet.mnemonic) {
        try {
          const mnemonic = CryptoJS.AES.decrypt(wallet.mnemonic, password).toString(
            CryptoJS.enc.Utf8
          )
          if (!mnemonic) {
            throw new Error()
          }
          return { mnemonic }
        } catch (err) {
          throw new Error('Incorrect password')
        }
      }
      if (wallet.privateKey) {
        try {
          const privateKey = CryptoJS.AES.decrypt(wallet.privateKey, password).toString(
            CryptoJS.enc.Utf8
          )
          if (!privateKey) {
            throw new Error()
          }
          return { privateKey }
        } catch (err) {
          throw new Error('Incorrect password')
        }
      }
    },
    [wallets]
  )
  return decryptWallet
}

export const useUpdateWallet = () => {
  const setWallets = useSetRecoilState(walletsState)
  const decryptWallet = useDecryptWallet()

  const updateWallet = useCallback(
    (id: string, params: { name?: string; password?: string; oldPassword?: string }) => {
      setWallets((wallets) =>
        wallets.map((w) => {
          if (w.id === id) {
            const updatedWallet = cloneDeep(w)
            if (params.name) {
              updatedWallet.name = params.name
            }
            if (params.oldPassword) {
              const { mnemonic, privateKey } = decryptWallet(id, params.oldPassword)
              if (params.password && mnemonic) {
                updatedWallet.mnemonic = CryptoJS.AES.encrypt(mnemonic, params.password).toString()
              } else if (params.password && privateKey) {
                updatedWallet.privateKey = CryptoJS.AES.encrypt(
                  privateKey,
                  params.password
                ).toString()
              }
            }
            return updatedWallet
          } else {
            return w
          }
        })
      )
    },
    [setWallets, decryptWallet]
  )
  return updateWallet
}
