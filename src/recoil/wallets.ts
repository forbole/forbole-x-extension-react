import { atom, useRecoilState } from "recoil";
import CryptoJS from "crypto-js";
import { useCallback, useEffect, useState } from "react";
import {
  decryptChromeStorage,
  encryptAndSaveToChromeStorage,
  getStorage,
} from "./utils/chromeStorageEncryption";
import chains from "../misc/chains";

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

export const isFirstTimeUserState = atom<boolean>({
  key: "firsTimeUser",
  default: (async () => {
    const walletString = await getStorage("wallets");
    return !walletString;
  })(),
});

export const useCreatePassword = () => {
  const [password, setPassword] = useRecoilState(passwordState);

  const createPassword = useCallback(
    (pw: string) => {
      setPassword(pw);
    },
    [setPassword]
  );

  return createPassword;
};

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

export const useCreateWallet = () => {
  const [password, setPassword] = useRecoilState(passwordState);
  const [wallets, setWallets] = useRecoilState(walletsState);
  const [accounts, setAccounts] = useRecoilState(accountsState);
  const [firstTime, setFirstTime] = useRecoilState(isFirstTimeUserState);

  const createWallet = useCallback(
    async (params: CreateWalletParams) => {
      const createdAt = Date.now();
      const decryptedWallets = await decryptChromeStorage<Wallet[]>(
        "wallets",
        password,
        []
      );
      const decryptedAccounts = await decryptChromeStorage<Account[]>(
        "accounts",
        password,
        []
      );
      const id = String(Math.random());

      const newWallets = [
        ...decryptedWallets,
        {
          type: params.type,
          name: params.name,
          id,
          createdAt,
          mnemonic:
            params.mnemonic && params.securityPassword
              ? CryptoJS.AES.encrypt(
                  params.mnemonic,
                  params.securityPassword
                ).toString()
              : "",
          privateKey:
            params.privateKey && params.securityPassword
              ? CryptoJS.AES.encrypt(
                  params.privateKey,
                  params.securityPassword
                ).toString()
              : "",
        },
      ];
      const newAccounts = [
        ...decryptedAccounts,
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
      ];
      setWallets(newWallets);
      setAccounts(newAccounts);
      setFirstTime(false);
      encryptAndSaveToChromeStorage("wallets", newWallets, password);
      encryptAndSaveToChromeStorage("accounts", newAccounts, password);
    },
    [setWallets, setAccounts, password, setFirstTime]
  );

  return createWallet;
};
