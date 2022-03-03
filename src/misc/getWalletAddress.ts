import { DirectSecp256k1HdWallet, DirectSecp256k1Wallet } from '@cosmjs/proto-signing'
import { stringToPath } from '@cosmjs/crypto'
import { LedgerSigner } from '@cosmjs/ledger-amino'
import get from 'lodash/get'
import { Buffer } from 'buffer'

const DEFAULT_HD_COIN_TYPE = 118 // ATOM
const DEFAULT_HD_ACCOUNT = 0
const DEFAULT_HD_CHANGE = 0
const DEFAULT_HD_INDEX = 0
const DEFAULT_LEDGER_APP_NAME = 'Cosmos'

export interface Params {
  prefix: string
  mnemonic?: string
  privateKey?: string
  ledgerTransport?: any
  hdPath?: {
    coinType?: number
    account?: number
    change?: number
    index?: number
  }
  ledgerAppName?: string
  showAddressOnLedger?: string
}

const getWalletAddress = async (params: Params): Promise<string> => {
  let signer
  // Generate by Private Key
  if (params.privateKey) {
    signer = await DirectSecp256k1Wallet.fromKey(
      Buffer.from(params.privateKey, 'hex'),
      params.prefix
    )
    const accounts = await signer.getAccounts()
    return accounts[0].address
  }

  const signerOptions = {
    hdPaths: [
      stringToPath(
        `m/44'/${get(params, ['hdPath', 'coinType'], DEFAULT_HD_COIN_TYPE)}'/${get(
          params,
          ['hdPath', 'account'],
          DEFAULT_HD_ACCOUNT
        )}'/${get(params, ['hdPath', 'change'], DEFAULT_HD_CHANGE)}/${get(
          params,
          ['hdPath', 'index'],
          DEFAULT_HD_INDEX
        )}`
      ),
    ],
    prefix: params.prefix,
  }
  // Mnemonic
  if (params.mnemonic) {
    signer = await DirectSecp256k1HdWallet.fromMnemonic(params.mnemonic, signerOptions)
  } else {
    signer = new LedgerSigner(params.ledgerTransport, {
      ...signerOptions,
      ledgerAppName: params.ledgerAppName || DEFAULT_LEDGER_APP_NAME,
    } as any)
  }
  const accounts = await signer.getAccounts()
  if (params.ledgerTransport && params.showAddressOnLedger) {
    await signer.showAddressAndPubKey(accounts[0].address, params.prefix)
  }
  return accounts[0].address
}

export default getWalletAddress
