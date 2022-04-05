import { useDeleteWallet } from '../../recoil/wallets'
import Button from '../Element/button'
import Dialog from '../Element/dialog'

interface Props {
  wallet: Wallet
  onClose(): void
  open: boolean
}

const DeleteWalletDialog = ({ wallet, open, onClose }: Props) => {
  const deleteWallet = useDeleteWallet()
  return (
    <Dialog open={open} onClose={onClose}>
      <div className="flex flex-col items-center pt-28">
        <h2 className="text-center">Delete Wallet</h2>
        <p className="max-w-sm text-center mt-8 mb-12">
          Are you sure you would like to delete this Wallet?
        </p>
        <div className="flex w-full">
          <div className="ml-8 mr-4 flex-1">
            <Button onClick={onClose} text="Cancel" secondary />
          </div>
          <div className="mr-8 ml-4 flex-1">
            <Button
              onClick={() => {
                deleteWallet(wallet.id)
                onClose()
              }}
              text="Yes"
            />
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default DeleteWalletDialog
