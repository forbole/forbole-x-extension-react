import { selectorFamily } from 'recoil'
import { fetchValidators } from '../fetches/validators'
import chains from '../misc/chains'
import shuffle from 'lodash/shuffle'
import keyBy from 'lodash/keyBy'

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
      const randomizedValidators =  shuffle(validators)
      return randomizedValidators
    },
})

export const filteredValidatorsState = selectorFamily<Validator[], { chainId: string, query: any }>({
  key: 'validators',
  get:
    ({ chainId, query }) =>
    async ({ get }) => {
      if (!chains[chainId]) {
        return []
      }
      const validators = await fetchValidators(chainId)
      const validatorsMap = keyBy(validators, 'address')
      return validators.filter((o) => {
        return (validatorsMap[o].name || '').toLowerCase().includes(query.toLowerCase())
      })
    },
})