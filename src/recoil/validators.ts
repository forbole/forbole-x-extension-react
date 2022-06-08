import { selectorFamily } from 'recoil';
import shuffle from 'lodash/shuffle';
import { fetchValidators } from '../services/fetches/validators';
import chains from '../misc/chains';

export const validatorsState = selectorFamily<Validator[], { chainId: string }>({
  key: 'validators',
  get:
    ({ chainId }) =>
    async () => {
      if (!chains[chainId]) {
        return [];
      }
      const validators = await fetchValidators(chainId);
      return validators;
    },
});

export const randomizedValidatorsState = selectorFamily<Validator[], { chainId: string }>({
  key: 'validators',
  get:
    ({ chainId }) =>
    async () => {
      if (!chains[chainId]) {
        return [];
      }
      const validators = await fetchValidators(chainId);
      const randomizedValidators = shuffle(validators);
      return randomizedValidators;
    },
});
