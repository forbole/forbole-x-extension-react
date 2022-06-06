import { selectorFamily } from 'recoil';
import { fetchValidators } from '../services/fetches/validators';
import chains from '../misc/chains';
import shuffle from 'lodash/shuffle';

export const validatorsState = selectorFamily<Validator[], { chainId: string }>({
  key: 'validators',
  get:
    ({ chainId }) =>
    async ({ get }) => {
      if (!chains[chainId]) {
        return []
      }
      const validators = await fetchValidators(chainId)
      return validators
    },
})

export const randomizedValidatorsState = selectorFamily<Validator[], { chainId: string }>({
  key: 'validators',
  get:
    ({ chainId }) =>
    async ({ get }) => {
      if (!chains[chainId]) {
        return []
      }
      const validators = await fetchValidators(chainId)
      const randomizedValidators = shuffle(validators)
      return randomizedValidators
    },
})
