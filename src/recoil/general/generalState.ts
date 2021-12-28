import { useCallback } from "react";
import { atom, useRecoilState } from "recoil";
import currencies from "../../misc/currencies";

export const alwaysRequirePasswordState = atom({
  key: "alwaysRequirePassword",
  default: false as boolean,
});

export const currencyState = atom({
  key: "currency",
  default: "USD" as typeof currencies[number],
});

export const useAlwaysRequirePassword = () => {
  const [alwaysRequirePassword, setAlwaysRequirePassword] = useRecoilState(
    alwaysRequirePasswordState
  );

  const set = useCallback(() => {
    setAlwaysRequirePassword(!alwaysRequirePassword);
  }, [alwaysRequirePassword, setAlwaysRequirePassword]);

  return [alwaysRequirePassword, set] as const;
};
