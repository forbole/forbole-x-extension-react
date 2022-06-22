import Big from 'big.js';
import get from 'lodash/get';
import flatten from 'lodash/flatten';
import chains from 'misc/chains';
import { sumCoins } from 'misc/utils';
import { fetchCoingecko, fetchLcd } from './index';

export const fetchAvailableAccountBalance = async (chainId: string, address: string) => {
  const available = await fetchLcd(chainId, `/cosmos/bank/v1beta1/balances/${address}`);
  return get(available, 'balances', []) || [];
};

export const fetchAccount = async (chainId: string, address: string) => {
  try {
    const response = await fetchLcd(chainId, `/cosmos/auth/v1beta1/accounts/${address}`);
    return get(response, 'account');
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export const fetchAccountBalance = async (chainId: string, address: string) => {
  try {
    const chain = chains[chainId];
    const [prices, available, delegations, rewards, unbonding, redelegations] = await Promise.all([
      fetchCoingecko(
        `/simple/price?ids=${chain.tokens.map((t) => t.coingeckoId).join(',')}&vs_currencies=usd`
      ),
      fetchLcd(chainId, `/cosmos/bank/v1beta1/balances/${address}`),
      fetchLcd(chainId, `/cosmos/staking/v1beta1/delegations/${address}`),
      fetchLcd(chainId, `/cosmos/distribution/v1beta1/delegators/${address}/rewards`),
      fetchLcd(chainId, `/cosmos/staking/v1beta1/delegators/${address}/unbonding_delegations`),
      fetchLcd(chainId, `/cosmos/staking/v1beta1/delegators/${address}/redelegations`),
    ]);

    const balances = {
      available: get(available, 'balances', []) || [],
      delegated: sumCoins(
        (get(delegations, 'delegation_responses', []) || []).map((d) => d.balance)
      ),
      rewards: get(rewards, 'total', []) || [],
      unbonding: [
        {
          denom: get(chains, [chainId, 'stakingDenom'], ''),
          amount: (get(unbonding, 'unbonding_responses', []) || [])
            .map((u) =>
              u.entries.map((e) => e.balance).reduce((a, b) => Big(a).plus(b).toString(), '0')
            )
            .reduce((a, b) => Big(a).plus(b).toString(), '0'),
        },
      ],
    };

    return {
      balances: {
        ...balances,
        total: sumCoins([
          ...balances.available,
          ...balances.delegated,
          ...balances.rewards,
          ...balances.unbonding,
        ]),
      },
      prices: chain.tokens.map((token) => ({
        token,
        price: get(prices, [token.coingeckoId, 'usd'], 0),
      })),
      delegations: get(delegations, 'delegation_responses', []).map((d) => ({
        balance: d.balance,
        validator: get(d, 'delegation.validator_address', ''),
        rewards:
          get(rewards, 'rewards', []).find(
            (r) => r.validator_address === get(d, 'delegation.validator_address', '')
          )?.reward || [],
      })),
      unbondings: flatten(
        get(unbonding, 'unbonding_responses', []).map((u) =>
          u.entries.map((e) => ({
            balance: { amount: e.balance, denom: get(chains, [chainId, 'stakingDenom'], '') },
            validator: get(u, 'validator_address', ''),
            completion: new Date(e.completion_time).getTime(),
          }))
        )
      ),
      redelegations: flatten(
        get(redelegations, 'redelegation_responses', []).map((u) =>
          u.entries.map((e) => ({
            balance: { amount: e.balance, denom: get(chains, [chainId, 'stakingDenom'], '') },
            fromValidator: get(u, 'redelegation.validator_src_address', ''),
            toValidator: get(u, 'redelegation.validator_dst_address', ''),
            completion: new Date(get(e, 'redelegation_entry.completion_time')).getTime(),
          }))
        )
      ),
    } as Partial<AccountDetail>;
  } catch (err) {
    return {
      balances: {
        available: [],
        delegated: [],
        rewards: [],
        unbonding: [],
        total: [],
      },
      prices: [],
      delegations: [],
      unbondings: [],
      redelegations: [],
    };
  }
};
