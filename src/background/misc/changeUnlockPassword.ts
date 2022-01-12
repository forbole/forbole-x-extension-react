import CryptoJS from 'crypto-js'
import { getAccounts } from '../models/accounts'
import { getWallets } from '../models/wallets'

const changeUnlockPassword = async (oldPassword: string, password: string): Promise<void> => {
  const wallets = await getWallets(oldPassword, true)
  const accounts = await getAccounts(oldPassword)
  const encryptedWalletsString = CryptoJS.AES.encrypt(JSON.stringify(wallets), password).toString()
  const encryptedAccountsString = CryptoJS.AES.encrypt(
    JSON.stringify(accounts),
    password
  ).toString()
  chrome.storage.local.set({ wallets: encryptedWalletsString, accounts: encryptedAccountsString })
}

export default changeUnlockPassword
