const chains: { [key: string]: Chain } = {
  "desmos-mainnet-1": {
    symbol: "DSM",
    prefix: "desmos",
    ledgerAppName: "Desmos",
    ecosystem: "cosmos",
    chainId: "desmos-mainnet-1",
    chainName: "Desmos Mainnet",
    image: "/static/images/cryptocurrencies/dsm.svg",
    coinType: 852,
    blockExplorerBaseUrl: "https://explorer.desmos.network",
    rpcApiUrl: "https://rpc.mainnet.desmos.network",
    ibcChains: [],
    gasAdjustment: 1.5,
    gasFee: {
      amount: 0.01,
      denom: "udsm",
    },
    defaultGas: {
      "/cosmos.bank.v1beta1.MsgSend": 200000,
      "/cosmos.staking.v1beta1.MsgDelegate": 400000,
      "/cosmos.staking.v1beta1.MsgBeginRedelegate": 400000,
      "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward": 200000,
      "/cosmos.staking.v1beta1.MsgUndelegate": 400000,
      "/ibc.applications.transfer.v1.MsgTransfer": 400000,
      "/cosmos.gov.v1beta1.MsgSubmitProposal": 400000,
      "/cosmos.gov.v1beta1.MsgDeposit": 400000,
      "/cosmos.gov.v1beta1.MsgVote": 400000,
      "/cosmos.distribution.v1beta1.MsgSetWithdrawAddress": 400000,
      "/desmos.profiles.v1beta1.MsgSaveProfile": 400000,
      "/desmos.profiles.v1beta1.MsgLinkChainAccount": 400000,
      "/desmos.profiles.v1beta1.MsgUnlinkChainAccount": 400000,
    },
  },
};

export default chains;
