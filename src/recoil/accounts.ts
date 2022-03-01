import { atom, selectorFamily } from "recoil";
import { passwordState } from "./general";
import { encryptAndSaveToChromeStorage } from "./utils/chromeStorageEncryption";

export const accountsState = atom<Account[]>({
  key: "accounts",
  default: [],
  effects: [
    ({ onSet, getPromise }) => {
      onSet(async (newAccounts) => {
        const password = await getPromise(passwordState);
        password &&
          (await encryptAndSaveToChromeStorage(
            "accounts",
            newAccounts,
            password
          ));
      });
    },
  ],
});

export const walletAccountsState = selectorFamily<Account[], string>({
  key: "walletAccounts",
  get:
    (walletId) =>
    ({ get }) =>
      get(accountsState).filter((a) => a.walletId === walletId),
});

export const accountState = selectorFamily<
  Account | undefined,
  { walletId: string; address: string }
>({
  key: "account",
  get:
    ({ walletId, address }) =>
    ({ get }) =>
      get(accountsState).find(
        (a) => a.walletId === walletId && a.address === address
      ),
});
