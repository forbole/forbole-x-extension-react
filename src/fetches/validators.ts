import get from 'lodash/get'
import { fetchKeybase, fetchLcd } from '.'
import chains from '../misc/chains'
import { fetchProfile } from './accounts'
import { Bech32 } from '@cosmjs/encoding'

export const fetchValidators = async (chainId: string) => {
  let validators = []
  let nextKey
  const chain = chains[chainId]
  if (!chain) {
    throw new Error('chain does not exist')
  }
  do {
    const response = await fetchLcd(
      chainId,
      `/cosmos/staking/v1beta1/validators${nextKey ? `?pagination.key=${nextKey}` : ''}`
    )
    if (!response.validators) {
      nextKey = undefined
      break
    }
    const profiles = await Promise.all(
      response.validators.map((v) =>
        fetchProfile(
          chainId,
          Bech32.encode(chain.prefix, Bech32.decode(v.operator_address).data)
        ).catch(() => Promise.resolve(undefined))
      )
    )
    const keybasePics = await Promise.all(
      response.validators.map((v) =>
        get(v, ['description', 'identity'])
          ? fetchKeybase(
              `/user/lookup.json?fields=pictures&key_suffix=${get(v, ['description', 'identity'])}`
            ).catch(() => Promise.resolve(undefined))
          : Promise.resolve()
      )
    )
    validators = [
      ...validators,
      ...response.validators.map((v, i) => ({
        address: v.operator_address,
        image:
          get(profiles, [i, 'pictures', 'profile']) ||
          get(keybasePics, [i, 'them', 0, 'pictures', 'primary', 'url']),
        name:
          get(profiles, [i, 'nickname']) ||
          get(v, ['description', 'moniker']) ||
          v.operator_address,
        commission: Number(get(v, ['commission', 'commission_rates', 'rate'], '0')),
        votingPower: Number(v.tokens),
        status: v.status,
        jailed: v.jailed,
      })),
    ]
    nextKey = get(response, ['pagination', 'next_key'])
  } while (nextKey)
  return validators
}
