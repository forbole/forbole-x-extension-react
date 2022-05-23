import { atom, useRecoilState, useSetRecoilState } from 'recoil'
import { useCallback } from 'react'
import nightwind from 'nightwind/helper'
import { decryptChromeStorage, getStorage, setStorage } from './utils/chromeStorageEncryption'
import { walletsState } from './wallets'
import { accountsState } from './accounts'

export const themeState = atom<string>({
  key: 'theme',
  effects: [
    ({ onSet }) => {
      onSet((theme) => {
        setStorage({ theme })
      })
    },
  ],
  // it is important to note that nightwind stores light and dark under its own
  // key: nightwind-mode, however it does not persist when the extension is built (see comment below)
  default: (async () => {
    const theme = await getStorage('theme')
    // this is necessary for production, as nightwind doesn't persist its own stored theme value
    if (theme === 'dark') nightwind.toggle()
    return theme ?? 'light'
  })(),
})

export const passwordState = atom<string>({
  key: 'password',
  default: '',
})

export const isFirstTimeUserState = atom<boolean>({
  key: 'firsTimeUser',
  default: (async () => {
    const walletString = await getStorage('wallets')
    return !walletString
  })(),
})

export const useSetTheme = () => {
  const [theme, setThemeState] = useRecoilState(themeState)

  const setTheme = useCallback(async () => {
    nightwind.toggle()
    if (theme === 'light') setThemeState('dark')
    else setThemeState('light')
  }, [theme])

  return setTheme
}

export const useCreatePassword = () => {
  const setPassword = useSetRecoilState(passwordState)

  const createPassword = useCallback(
    (pw: string) => {
      setPassword(pw)
    },
    [setPassword]
  )

  return createPassword
}

export const useUpdatePassword = () => {
  const setPassword = useSetRecoilState(passwordState)
  const setWallets = useSetRecoilState(walletsState)
  const setAccounts = useSetRecoilState(accountsState)

  const updatePassword = useCallback(
    async (oldPw: string, newPw: string) => {
      const decryptedWallets = await decryptChromeStorage<Wallet[]>('wallets', oldPw)
      const decryptedAccounts = await decryptChromeStorage<Account[]>('accounts', oldPw)

      setPassword(newPw)
      setWallets(decryptedWallets)
      setAccounts(decryptedAccounts)
    },
    [setPassword, setWallets, setAccounts]
  )

  return updatePassword
}

export const useUnlockWallets = () => {
  const setPassword = useSetRecoilState(passwordState)
  const setWallets = useSetRecoilState(walletsState)
  const setAccounts = useSetRecoilState(accountsState)

  const unlockWallets = useCallback(
    async (pw: string) => {
      console.log(pw)
      const decryptedWallets = await decryptChromeStorage<Wallet[]>('wallets', pw)
      const decryptedAccounts = await decryptChromeStorage<Account[]>('accounts', pw)
      setPassword(pw)
      setWallets(decryptedWallets)
      setAccounts(decryptedAccounts)
    },
    [setWallets, setAccounts, setPassword]
  )

  return unlockWallets
}
