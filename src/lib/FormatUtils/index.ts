import chains from 'misc/chains';

const removeNonNumbers = (value: string) => value.replace(/[^0-9 ]+/g, '');

const decimalToPercent = (decimal: number, sigfigs?: number) =>
  (decimal * 100).toFixed(sigfigs || 2);

const convertNumberToCoin = (amount: number, denom: string): Coin => {
  const exponent = Object.values(chains)
    .find((chain) => chain.stakingDenom === denom)
    .tokens.find((token) => token.denom === denom).digit;

  return {
    amount: String(amount * 10 ** exponent),
    denom,
  };
};

const FormatUtils = {
  removeNonNumbers,
  decimalToPercent,
  convertNumberToCoin,
};

export default FormatUtils;
