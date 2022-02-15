import { atom, useRecoilState } from "recoil";
import CryptoJS from "crypto-js";
import { useCallback } from "react";
import {
  decryptChromeStorage,
  encryptAndSaveToChromeStorage,
} from "./utils/chromeStorageEncryption";

export const passwordState = atom<string>({
  key: "password",
  default: "",
});

export const walletsState = atom<Wallet[]>({
  key: "wallets",
  default: [],
});

export const accountsState = atom<Account[]>({
  key: "accounts",
  default: [],
});

export const useUnlockWallets = () => {
  const [password, setPassword] = useRecoilState(passwordState);
  const [wallets, setWallets] = useRecoilState(walletsState);
  const [accounts, setAccounts] = useRecoilState(accountsState);

  const unlockWallets = useCallback(
    async (pw: string) => {
      const decryptedWallets = await decryptChromeStorage<Wallet[]>(
        "wallets",
        pw
      );
      const decryptedAccounts = await decryptChromeStorage<Account[]>(
        "accounts",
        pw
      );
      setWallets(decryptedWallets);
      setAccounts(decryptedAccounts);
      setPassword(pw);
    },
    [setWallets, setAccounts, setPassword]
  );

  return unlockWallets;
};
