/* eslint-disable camelcase */
declare module "*.svg" {
  const content: any;
  export default content;
}
declare module "@ledgerhq/hw-transport-webusb";

type AppUnlockState = "locked" | "unlocking" | "unlocked";

interface Account {
  walletId: string;
  address: string;
  chain: string;
  hdPath: {
    account: number;
    change: number;
    index: number;
  };
  name: string;
  fav: boolean;
  createdAt: number;
}

interface CreateAccountParams {
  walletId: string;
  chain: string;
  name: string;
  address: string;
  hdPath: {
    account: number;
    change: number;
    index: number;
  };
}

interface UpdateAccountParams {
  name?: string;
  fav?: boolean;
}

type WalletType = "ledger" | "mnemonic" | "private key";

interface Wallet {
  type: WalletType;
  name: string;
  id: string;
  createdAt: number;
}

interface IBCChain {
  name: string;
  image: string;
  channel: string;
  chainId: string;
  addressPrefix: string;
  crypto: string;
}

interface Chain {
  name: string;
  prefix?: string;
  ecosystem: "cosmos";
  chainId: string;
  chainName: string;
  image: string;
  coinType: number;
  blockExplorerBaseUrl: string;
  rpcApiUrl: string;
  ledgerAppName: string;
  ibcChains: IBCChain[];
  gasAdjustment: number;
  gasFee: { amount: number; denom: string };
  defaultGas: { [typeUrl: string]: number };
}

interface Profile {
  bio: string;
  coverPic: string;
  dtag: string;
  nickname: string;
  profilePic: string;
}

interface ChainConnection {
  creationTime: number;
  externalAddress: string;
  userAddress: string;
  chainName: string;
}

interface VestingPeriod {
  amount: TokenAmount;
  date: number;
}

interface CreateWalletParams {
  type: WalletType;
  name: string;
  chains: string[];
  mnemonic?: string;
  privateKey?: string;
  addresses: string[];
  securityPassword: string;
}

interface UpdateWalletParams {
  name?: string;
  securityPassword?: string;
  newSecurityPassword?: string;
}

interface TransactionMsgDelegate {
  typeUrl: "/cosmos.staking.v1beta1.MsgDelegate";
  value: {
    delegatorAddress: string;
    validatorAddress: string;
    amount: { amount: string; denom: string };
  };
}

interface TransactionMsgUndelegate {
  typeUrl: "/cosmos.staking.v1beta1.MsgUndelegate";
  value: {
    delegatorAddress: string;
    validatorAddress: string;
    amount: { amount: string; denom: string };
  };
}

interface TransactionMsgRedelegate {
  typeUrl: "/cosmos.staking.v1beta1.MsgBeginRedelegate";
  value: {
    delegatorAddress: string;
    validatorSrcAddress: string;
    validatorDstAddress: string;
    amount: { amount: string; denom: string };
  };
}

interface TransactionMsgWithdrawReward {
  typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward";
  value: {
    delegatorAddress: string;
    validatorAddress: string;
  };
}

interface TransactionMsgSend {
  typeUrl: "/cosmos.bank.v1beta1.MsgSend";
  value: {
    fromAddress: string;
    toAddress: string;
    amount: Array<{ amount: string; denom: string }>;
  };
}

interface TransactionMsgMultiSend {
  typeUrl: "/cosmos.bank.v1beta1.MsgMultiSend";
  value: {
    inputs: Array<{
      address: string;
      coins: Array<{ amount: string; denom: string }>;
    }>;
    outputs: Array<{
      address: string;
      coins: Array<{ amount: string; denom: string }>;
    }>;
  };
}

interface TransactionMsgIBCTransfer {
  typeUrl: "/ibc.applications.transfer.v1.MsgTransfer";
  value: {
    sourcePort: string;
    sourceChannel: string;
    token: {
      denom: string;
      amount: string;
    };
    sender: string;
    receiver: string;
    timeoutTimestamp?: number;
  };
}

interface TransactionMsgSubmitProposal {
  typeUrl: "/cosmos.gov.v1beta1.MsgSubmitProposal";
  value: {
    content:
      | {
          typeUrl: "/cosmos.gov.v1beta1.TextProposal";
          value: {
            description: string;
            title: string;
          };
        }
      | {
          typeUrl: "/cosmos.params.v1beta1.ParameterChangeProposal";
          value: {
            description: string;
            title: string;
            changes: { subspace: string; key: string; value: string }[];
          };
        }
      | {
          typeUrl: "/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal";
          value: {
            title: string;
            description: string;
            plan: {
              name: string;
              time?: number;
              height?: number;
              info: string;
              upgradedClientState?: any;
            };
          };
        }
      | {
          typeUrl: "/cosmos.distribution.v1beta1.CommunityPoolSpendProposal";
          value: {
            title: string;
            description: string;
            recipient: string;
            amount: Array<{ amount: string; denom: string }>;
          };
        };
    initialDeposit: [
      {
        amount: string;
        denom: string;
      }
    ];
    proposer: string;
  };
}

interface TransactionMsgVote {
  typeUrl: "/cosmos.gov.v1beta1.MsgVote";
  value: {
    option: 1 | 2 | 3 | 4; // Yes, Abstain, No, No with Veto
    proposalId: number;
    voter: string;
  };
}

interface TransactionMsgDeposit {
  typeUrl: "/cosmos.gov.v1beta1.MsgDeposit";
  value: {
    amount: {
      amount: string;
      denom: string;
    }[];
    depositor: string;
    proposalId: number;
  };
}

interface TransactionMsgSetWithdrawAddress {
  typeUrl: "/cosmos.distribution.v1beta1.MsgSetWithdrawAddress";
  value: {
    delegatorAddress: string;
    withdrawAddress: string;
  };
}

interface TransactionMsgSaveProfile {
  typeUrl: "/desmos.profiles.v1beta1.MsgSaveProfile";
  value: {
    dtag: string;
    nickname?: string;
    bio?: string;
    profilePicture?: string;
    coverPicture?: string;
    creator: string;
  };
}

interface ChainLinkProof {
  plainText: string;
  pubKey: {
    typeUrl: "/cosmos.crypto.secp256k1.PubKey";
    value: string;
  };
  signature: string;
}

interface TransactionMsgLinkChainAccount {
  typeUrl: "/desmos.profiles.v1beta1.MsgLinkChainAccount";
  value: {
    chainAddress: {
      typeUrl: "/desmos.profiles.v1beta1.Bech32Address";
      value: {
        prefix: string;
        value: string; // address
      };
    };
    chainConfig: {
      name: string;
    };
    proof: ChainLinkProof;
    signer: string;
  };
}

interface TransactionMsgUnlinkChainAccount {
  typeUrl: "/desmos.profiles.v1beta1.MsgUnlinkChainAccount";
  value: {
    chainName: string;
    owner: string;
    target: string;
  };
}

type TransactionMsg =
  | TransactionMsgDelegate
  | TransactionMsgUndelegate
  | TransactionMsgRedelegate
  | TransactionMsgWithdrawReward
  | TransactionMsgSend
  | TransactionMsgMultiSend
  | TransactionMsgIBCTransfer
  | TransactionMsgSubmitProposal
  | TransactionMsgVote
  | TransactionMsgDeposit
  | TransactionMsgSetWithdrawAddress
  | TransactionMsgSaveProfile
  | TransactionMsgLinkChainAccount
  | TransactionMsgUnlinkChainAccount;

interface Transaction {
  msgs: TransactionMsg[];
  memo: string;
  fee?: {
    amount: Array<{ amount: string; denom: string }>;
    gas: string;
  };
}
