import get from 'lodash/get';
import { Bech32 } from '@cosmjs/encoding';
import batchPromises from 'batch-promises';
import chains from 'misc/chains';
import { fetchKeybase, fetchLcd } from './index';
import { fetchAccount } from './accounts';

export const fetchValidators = async (chainId: string) => {
  let validators = [];
  let nextKey;
  const chain = chains[chainId];
  if (!chain) {
    throw new Error('chain does not exist');
  }
  do {
    const response = await fetchLcd(
      chainId,
      `/cosmos/staking/v1beta1/validators${
        nextKey ? `?pagination.key=${encodeURIComponent(nextKey)}` : ''
      }`
    );
    if (!response.validators) {
      nextKey = undefined;
      break;
    }
    const profiles = await Promise.all(
      response.validators.map((v) =>
        fetchAccount(
          chainId,
          Bech32.encode(chain.prefix, Bech32.decode(v.operator_address).data)
        ).catch(() => Promise.resolve(undefined))
      )
    );
    // Too many concurrent Keybase request will return error 429
    const keybasePics = await batchPromises(10, response.validators, (v) =>
      get(v, ['description', 'identity'])
        ? fetchKeybase(
            `/user/lookup.json?fields=pictures&key_suffix=${get(v, ['description', 'identity'])}`
          ).catch(() => Promise.resolve(undefined))
        : Promise.resolve()
    );
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
    ];
    nextKey = get(response, ['pagination', 'next_key']);
  } while (nextKey);

  return validators;
};
