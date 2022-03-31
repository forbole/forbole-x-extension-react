import GetStarted from '../components/Layout/GetStarted'
import Layout from '../components/Layout/layout'
import WalletAccounts from '../components/Accounts'
import { currentWalletIdState, currentWalletState, walletsState } from '../recoil/wallets'
import { useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from 'recoil'
import UnlockDialog from '../components/Layout/UnlockDialog'
import { isFirstTimeUserState, passwordState } from '../recoil/general'
import Dropdown from '../components/Element/dropdown'
import { ReactComponent as WalletIcon } from '../assets/images/icons/icon_wallet_manage.svg'
import { ReactComponent as ArrowDownIcon } from '../assets/images/icons/icon_arrow_down.svg'
import CreateWalletDialog from '../components/Wallets/CreateWalletDialog'
import { useState } from 'react'
import DeleteWalletDialog from '../components/Wallets/DeleteWalletDialog'
import UpdateWalletNameDialog from '../components/Wallets/UpdateWalletNameDialog'
import UpdateWalletPasswordDialog from '../components/Wallets/UpdateWalletPasswordDialog'

const Wallet = () => {
  const firstTime = useRecoilValueLoadable(isFirstTimeUserState)
  const password = useRecoilValue(passwordState)
  const wallet = useRecoilValueLoadable(currentWalletState)
  const wallets = useRecoilValue(walletsState)
  const setCurrentWalletId = useSetRecoilState(currentWalletIdState)

  const [isCreateWalletDialogOpen, setIsCreateWalletDialogOpen] = useState(false)
  const [isDeleteWalletDialogOpen, setIsDeleteWalletDialogOpen] = useState(false)
  const [isUpdateWalletNameDialogOpen, setIsUpdateWalletNameDialogOpen] = useState(false)
  const [isUpdateWalletPasswordDialogOpen, setIsUpdateWalletPasswordDialogOpen] = useState(false)

  return (
    <Layout
      title={
        wallet.contents && (
          <Dropdown
            className="w-60 -right-24 text-center"
            items={wallets.map((w) => ({ title: w.name, onClick: () => setCurrentWalletId(w.id) }))}
          >
            <div className="flex items-center hover:opacity-60">
              <h4 className="mr-2">{wallet.contents?.name}</h4>
              <ArrowDownIcon />
            </div>
          </Dropdown>
        )
      }
      rightElement={
        wallet.contents && (
          <Dropdown
            items={[
              { title: 'Add Wallet', onClick: () => setIsCreateWalletDialogOpen(true) },
              {
                title: 'Change Wallet Moniker',
                onClick: () => setIsUpdateWalletNameDialogOpen(true),
              },
              {
                title: 'Change Wallet Security Password',
                onClick: () => setIsUpdateWalletPasswordDialogOpen(true),
              },
              { title: 'View Secret Recovery Phrase' },
              { title: 'Delete Wallet', onClick: () => setIsDeleteWalletDialogOpen(true) },
            ]}
          >
            <WalletIcon className="w-6 h-6 fill-dark dark:fill-white" />
          </Dropdown>
        )
      }
    >
      {firstTime.state !== 'hasValue' || firstTime.contents ? (
        <GetStarted />
      ) : (
        <>
          {wallet.contents && <WalletAccounts wallet={wallet.contents} />}
          <UnlockDialog open={!password} />
          <CreateWalletDialog
            open={isCreateWalletDialogOpen}
            onClose={() => setIsCreateWalletDialogOpen(false)}
          />
          <DeleteWalletDialog
            open={isDeleteWalletDialogOpen}
            onClose={() => setIsDeleteWalletDialogOpen(false)}
            wallet={wallet.contents}
          />
          <UpdateWalletNameDialog
            open={isUpdateWalletNameDialogOpen}
            onClose={() => setIsUpdateWalletNameDialogOpen(false)}
            wallet={wallet.contents}
          />
          <UpdateWalletPasswordDialog
            open={isUpdateWalletPasswordDialogOpen}
            onClose={() => setIsUpdateWalletPasswordDialogOpen(false)}
            wallet={wallet.contents}
          />
        </>
      )}
    </Layout>
  )
}

export default Wallet
