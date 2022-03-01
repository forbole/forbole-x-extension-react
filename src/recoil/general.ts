import { atom, useSetRecoilState, useRecoilState } from 'recoil';
import { useCallback } from 'react';
import {
  decryptChromeStorage,
  getStorage,
} from './utils/chromeStorageEncryption';
import { walletsState } from './wallets';
import { accountsState } from './accounts';
import nightwind from 'nightwind/helper';

export const themeState = atom<string>({
  key: 'theme',
  default: (async () => {
    return await getStorage('nightwind-mode');
  })(),
});

export const passwordState = atom<string>({
  key: 'password',
  default: '',
});

export const isFirstTimeUserState = atom<boolean>({
  key: 'firsTimeUser',
  default: (async () => {
    const walletString = await getStorage('wallets');
    return !walletString;
  })(),
});

export const useSetTheme = () => {
  const setThemeState = useSetRecoilState(themeState);

  const setTheme = useCallback(
    async() => {
      nightwind.toggle();
      const theme = await getStorage('nightwind-mode')
      setThemeState(theme);
    },
    [setThemeState]
  );

  return setTheme;
};

export const useCreatePassword = () => {
  const setPassword = useSetRecoilState(passwordState);

  const createPassword = useCallback(
    (pw: string) => {
      setPassword(pw);
    },
    [setPassword]
  );

  return createPassword;
};

export const useUnlockWallets = () => {
  const setPassword = useSetRecoilState(passwordState);
  const setWallets = useSetRecoilState(walletsState);
  const setAccounts = useSetRecoilState(accountsState);

  const unlockWallets = useCallback(
    async (pw: string) => {
      const decryptedWallets = await decryptChromeStorage<Wallet[]>(
        'wallets',
        pw
      );
      const decryptedAccounts = await decryptChromeStorage<Account[]>(
        'accounts',
        pw
      );
      setPassword(pw);
      setWallets(decryptedWallets);
      setAccounts(decryptedAccounts);
    },
    [setWallets, setAccounts, setPassword]
  );

  return unlockWallets;
};
