import { useCallback } from "react";
import { atom, useRecoilState } from "recoil";

type Validators = string[];

export const favValidatorsState = atom({
  key: "favValidators",
  default: [] as Validators,
});

export const useFavValidators = () => {
  const [favValidators, setFavValidators] = useRecoilState(favValidatorsState);

  const update = (validators: Validators) => {
    setFavValidators(validators);
  };

  const addValidator = (validator: string) => {
    const exist = favValidators.some((v) => {
      v === validator;
    });
    if (!exist) {
      const newValidatorsList = [...favValidators, validator];
      update(newValidatorsList);
    }
  };

  return { favValidators, addValidator };
};
