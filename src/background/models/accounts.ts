import CryptoJS from 'crypto-js'
import decryptStorage from '../misc/decryptStorage'
import { Account, CreateAccountParams } from '../../../types'

export const getAccounts = (password: string): Promise<Account[]> =>
  new Promise((resolve, reject) =>
    chrome.storage.local.get(['accounts'], async (result) => {
      try {
        const accounts = await decryptStorage<Account[]>(result.accounts, password)
        resolve(accounts || [])
      } catch (err: any) {
        reject(err)
      }
    })
  )

export const addAccount = (password: string, account: CreateAccountParams): Promise<Account> =>
  new Promise((resolve, reject) =>
    chrome.storage.local.get(['accounts', 'wallets'], async (result) => {
      try {
        const accounts = await decryptStorage<Account[]>(result.accounts, password, [])
        const newAccount = {
          ...account,
          createdAt: Date.now(),
          fav: false,
        }
        const encryptedAccountsString = CryptoJS.AES.encrypt(
          JSON.stringify([newAccount, ...(accounts || [])]),
          password
        ).toString()
        chrome.storage.local.set({ accounts: encryptedAccountsString }, () => {
          resolve(newAccount)
        })
      } catch (err: any) {
        reject(err)
      }
    })
  )

export const updateAccount = (
  password: string,
  address: string,
  account: Partial<Account>,
  walletId: string
): Promise<Account> =>
  new Promise((resolve, reject) =>
    chrome.storage.local.get(['accounts'], async (result) => {
      try {
        const accounts = await decryptStorage<Account[]>(result.accounts, password, [])
        let newAccount: Account
        const encryptedAccountsString = CryptoJS.AES.encrypt(
          JSON.stringify(
            accounts.map((a) => {
              if (a.address === address && (!walletId || a.walletId === walletId)) {
                newAccount = { ...a, ...account }
                return newAccount
              }
              return a
            })
          ),
          password
        ).toString()
        chrome.storage.local.set({ accounts: encryptedAccountsString }, () => {
          resolve(newAccount)
        })
      } catch (err: any) {
        reject(err)
      }
    })
  )

export const deleteAccount = (
  password: string,
  address: string,
  walletId: string
): Promise<{ success: boolean }> =>
  new Promise((resolve, reject) =>
    chrome.storage.local.get(['accounts'], async (result) => {
      try {
        const accounts = await decryptStorage<Account[]>(result.accounts, password, [])
        const filteredAccounts = accounts.filter(
          (a) => a.address !== address || walletId !== a.walletId
        )
        if (!filteredAccounts.length) {
          return chrome.storage.local.remove('accounts', () => {
            resolve({ success: true })
          })
        }
        const encryptedAccountsString = CryptoJS.AES.encrypt(
          JSON.stringify(filteredAccounts),
          password
        ).toString()
        return chrome.storage.local.set({ accounts: encryptedAccountsString }, () => {
          resolve({ success: true })
        })
      } catch (err: any) {
        return reject(err)
      }
    })
  )
