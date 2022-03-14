import { atom, selectorFamily, selector, noWait } from 'recoil'
import { fetchAccountBalance } from '../fetches/accounts'
import { passwordState } from './general'
import { encryptAndSaveToChromeStorage } from './utils/chromeStorageEncryption'

export const accountsState = atom<Account[]>({
  key: 'accounts',
  default: [],
  effects: [
    ({ onSet, getPromise }) => {
      onSet(async (newAccounts) => {
        const password = await getPromise(passwordState)
        password && (await encryptAndSaveToChromeStorage('accounts', newAccounts, password))
      })
    },
  ],
})

export const accountState = selectorFamily<
  Account | undefined,
  { walletId: string; address: string }
>({
  key: 'account',
  get:
    ({ walletId, address }) =>
    ({ get }) =>
      get(accountsState).find((a) => a.walletId === walletId && a.address === address),
})

export const accountDetailState = selectorFamily<
  AccountDetail,
  { walletId: string; address: string }
>({
  key: 'accountDetail',
  get:
    ({ walletId, address }) =>
    async ({ get }) => {
      const account = get(accountState({ walletId, address }))
      const { balances, prices } = await fetchAccountBalance(account.chain, account.address)
      return { ...account, balances, prices }
    },
})

export const walletAccountsState = selectorFamily<AccountDetail[], string>({
  key: 'walletAccounts',
  get:
    (walletId) =>
    ({ get }) => {
      const accounts = get(accountsState).filter((a) => a.walletId === walletId)
      const loadable = accounts.map((a) =>
        get(noWait(accountDetailState({ walletId: a.walletId, address: a.address })))
      )
      return accounts.map((a, i) =>
        loadable[i].state === 'hasValue'
          ? loadable[i].contents
          : {
              ...a,
              balances: { available: [], delegated: [], rewards: [], unbonding: [], total: [] },
              prices: [],
            }
      )
    },
})
