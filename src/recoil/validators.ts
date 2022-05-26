import { selectorFamily } from 'recoil';
import { fetchValidators } from '../fetches/validators';
import chains from '../misc/chains';

export const validatorsState = selectorFamily<Validator[], { chainId: string }>({
  key: 'validators',
  get:
    ({ chainId }) =>
    async ({}) => {
      if (!chains[chainId]) {
        return [];
      }
      const validators = await fetchValidators(chainId);
      return validators;
    },
});
