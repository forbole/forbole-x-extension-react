import { useCallback } from "react";
import { atom, useRecoilState } from "recoil";
import currencies from "../../misc/currencies";

export const firstTimeState = atom({
  key: "firstTime",
  default: true as boolean,
});

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

export const useFirstTime = () => {
  const [firstTime, setFirstTime] = useRecoilState(
    firstTimeState
  );

  // const set = useCallback(() => {
  //   setFirstTime(!firstTime);
  // }, [firstTime, setFirstTime]);

  return [firstTime, setFirstTime] as const;
};
