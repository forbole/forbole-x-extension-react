import { useCallback } from 'react'
import { atom, selectorFamily, selector, noWait, useSetRecoilState } from 'recoil'
import { fetchAccountBalance, fetchProfile } from '../fetches/accounts'
import chains from '../misc/chains'
import { passwordState } from './general'
import { encryptAndSaveToChromeStorage, removeStorage } from './utils/chromeStorageEncryption'

export const accountsState = atom<Account[]>({
  key: 'accounts',
  default: [],
  effects: [
    ({ onSet, getPromise }) => {
      onSet(async (newAccounts) => {
        const password = await getPromise(passwordState)
        if (password && newAccounts.length) {
          await encryptAndSaveToChromeStorage('accounts', newAccounts, password)
        } else {
          await removeStorage('accounts')
        }
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
      const { balances, prices, delegations, unbonding, redelegations } = await fetchAccountBalance(
        account.chain,
        account.address
      )
      return { ...account, balances, prices, delegations, unbonding, redelegations }
    },
})

export const profileDetailState = selectorFamily<Profile, { walletId: string; address: string }>({
  key: 'profile',
  get:
    ({ walletId, address }) =>
    async ({ get }) => {
      const account = get(accountState({ walletId, address }))
      const response = await fetchProfile(account.chain, account.address)
      if (response.error) {
        throw response.error
      }
      return response
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

export const useCreateAccounts = () => {
  const setAccounts = useSetRecoilState(accountsState)

  const createAccounts = useCallback(
    (params: { walletId: string; address: string; chain: string; hdPath: HdPath }[]) => {
      const createdAt = Date.now()
      setAccounts((accounts) => [
        ...accounts,
        ...params.map((account) => ({
          walletId: account.walletId,
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
    },
    [setAccounts]
  )

  return createAccounts
}

export const useChangeAccountName = () => {
  const setAccounts = useSetRecoilState(accountsState)

  const changeAccountName = useCallback(
    (params: { walletId: string; address: string; name: string }) => {
      setAccounts((accounts) =>
        accounts.map((a) =>
          a.walletId === params.walletId && a.address === params.address
            ? { ...a, name: params.name }
            : a
        )
      )
    },
    [setAccounts]
  )

  return changeAccountName
}

export const useDeleteAccount = () => {
  const setAccounts = useSetRecoilState(accountsState)

  const deleteAccount = useCallback(
    (params: { walletId: string; address: string }) => {
      setAccounts((accounts) =>
        accounts.filter((a) => !(a.walletId === params.walletId && a.address === params.address))
      )
    },
    [setAccounts]
  )

  return deleteAccount
}
