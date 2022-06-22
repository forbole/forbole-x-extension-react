import chains from 'misc/chains';

const getExponentForDenom = (denom: string) => {
  return Object.values(chains)
    .find((chain) => chain.stakingDenom === denom)
    .tokens.find((token) => token.denom === denom).digit;
};

const ChainUtils = {
  getExponentByStakingDenom: getExponentForDenom,
};

export default ChainUtils;
