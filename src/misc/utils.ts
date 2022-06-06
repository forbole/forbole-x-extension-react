import { EnglishMnemonic } from '@cosmjs/crypto'
import Big from 'big.js';
import keyBy from 'lodash/keyBy';
import groupBy from 'lodash/groupBy';
import get from 'lodash/get';
import chains from './chains';

export const sumCoins = (coins: Coin[]) =>
  Object.values(groupBy(coins, 'denom')).map((d) =>
    d.reduce((a, b: any) => ({ denom: b.denom, amount: Big(a.amount).plus(b.amount).toString() }), {
      denom: '',
      amount: '0',
    })
  );

export const sumCoinsValues = (coins: Coin[], prices: { price: number; token: Token }[]) => {
  const pricesMap = keyBy(prices, 'token.denom');
  return coins
    .map((c) =>
      Big(c.amount)
        .div(10 ** get(pricesMap, [c.denom, 'token', 'digit'], 0))
        .times(get(pricesMap, [c.denom, 'price'], 0))
    )
    .reduce((a, b) => a.plus(b), Big(0))
    .toNumber();
};

export const formatCoin = (chainId: string, coin: Coin, compact?: boolean) => {
  const chain = chains[chainId];
  const token = chain.tokens.find((t) => t.denom === coin.denom) || {
    denom: coin.denom,
    symbol: coin.denom,
    digit: 1,
  };
  return `${new Intl.NumberFormat('en', {
    signDisplay: 'never',
    maximumFractionDigits: compact ? 2 : 6,
    notation: compact ? 'compact' : undefined,
  }).format(
    Big(coin.amount)
      .div(10 ** token.digit)
      .toNumber()
  )} ${token.symbol}`;
};

export const formatCoins = (
  chainId: string,
  coins: Coin[],
  compact?: boolean,
  delimeter?: string
) => {
  const chain = chains[chainId];
  return coins.length
    ? coins.map((c) => formatCoin(chainId, c, compact)).join(delimeter || '\n')
    : formatCoin(chainId, { amount: '0', denom: chain.stakingDenom }, compact);
};

export const formatCurrency = (amount: number, compact?: boolean): string =>
  `${new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD',
    notation: compact ? 'compact' : undefined,
  }).format(amount || 0)} USD`;

export const formatPercentage = (percent: number): string =>
  new Intl.NumberFormat('en', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(percent || 0);

export const isValidMnemonic = (input) => {
  try {
    // eslint-disable-next-line no-new
    new EnglishMnemonic(input);
    return true;
  } catch (err) {
    return false;
  }
};
