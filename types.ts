export interface Wallet {
  id: string
  type: 'mnemonic' | 'ledger'
  name: string
  mnemonic?: string // For mnemonic type
  createdAt: number
}

export interface Account {
  walletId: string
  address: string
  crypto: string
  account: number // HD Path account
  change: number // HD Path change
  index: number // HD Path index
  name: string
  fav: boolean
  createdAt: number
}

export interface CreateAccountParams {
  walletId: string
  address: string
  account: number
  change: number
  index: number
  name: string
  crypto: string
}

export interface CreateWalletParams {
  name: string
  type: 'mnemonic' | 'ledger'
  mnemonic?: string // For mnemonic type
  addresses: string[]
  cryptos: string[]
  securityPassword: string
}
