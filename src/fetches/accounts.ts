import Big from 'big.js'
import get from 'lodash/get'
import { fetchCoingecko, fetchLcd } from '.'
import chains from '../misc/chains'
import { sumCoins } from '../misc/utils'

export const fetchAccountBalance = async (chainId: string, address: string) => {
  const chain = chains[chainId]
  const [prices, available, delegations, rewards, unbonding] = await Promise.all([
    fetchCoingecko(
      `/simple/price?ids=${chain.tokens.map((t) => t.coingeckoId).join(',')}&vs_currencies=usd`
    ),
    fetchLcd(chainId, `/cosmos/bank/v1beta1/balances/${address}`),
    fetchLcd(chainId, `/cosmos/staking/v1beta1/delegations/${address}`),
    fetchLcd(chainId, `/cosmos/distribution/v1beta1/delegators/${address}/rewards`),
    fetchLcd(chainId, `/cosmos/staking/v1beta1/delegators/${address}/unbonding_delegations`),
  ])

  const balances = {
    available: get(available, 'balances', []) || [],
    delegated: sumCoins((get(delegations, 'delegation_responses', []) || []).map((d) => d.balance)),
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
  }

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
  }
}
