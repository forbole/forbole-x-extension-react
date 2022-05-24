import React from 'react'
import { ReactComponent as IconCopy } from '../../assets/images/icons/icon_copy.svg'
import { ReactComponent as IconQrcode } from '../../assets/images/icons/icon_qrcode.svg'
import { ReactComponent as IconMore } from '../../assets/images/icons/icon_more.svg'
import { Loadable } from 'recoil'
import chains from '../../misc/chains'
import toast from 'react-hot-toast'
import SendDialog from '../../components/TransactionDialogs/SendDialog'
import QRCodeDialog from '../Common/QRCodeDialog'

type Props = {
  account: Loadable<AccountDetail>
}

const WalletCard = ({ account }: Props) => {
  const [isCopySuccess, setIsCopySuccess] = React.useState(false)
  const [sendDialogOpen, setSendDialogOpen] = React.useState(false)
  const [qrDialogOpen, setQRDialogOpen] = React.useState(false)

  const copyText = React.useCallback(
    (e) => {
      e.stopPropagation()
      navigator.clipboard.writeText(account.contents.address)
      toast.success('Copied to Clipboard!')
    },
    [account.contents.address]
  )

  return (
    <>
      <div className="mx-5 p-6 rounded-xl bg-popup-100">
        <div className="w-full flex items-start space-x-3 mb-6">
          <img
            src={chains[account.contents.chain]?.image}
            className="w-9 h-9 self-center"
            alt={account.contents.chain}
          />
          <div className="w-full">
            <h4>{account.contents.name}</h4>
            <div className="flex items-center space-x-1">
              <span className="text-font-200 text-xs leading-none">{account.contents.address}</span>
              <IconCopy onClick={copyText} className="cursor-pointer" />
              <IconQrcode onClick={() => setQRDialogOpen(true)} className="cursor-pointer" />
            </div>
          </div>
          <IconMore className="cursor-pointer" />
        </div>
        <div className="flex justify-between space-x-4">
          <button className="nightwind-prevent text-white bg-primary-100 w-64 py-[9px] rounded-md">
            Delegate
          </button>
          <button
            className="nightwind-prevent text-white bg-success-100 w-64 py-[9px] rounded-md"
            onClick={() => setSendDialogOpen(true)}
          >
            Send
          </button>
          <button className="nightwind-prevent text-white bg-secondary-100 w-full py-[9px] rounded-md">
            Withdraw Rewards
          </button>
        </div>
      </div>
      <QRCodeDialog
        open={qrDialogOpen}
        onClose={() => setQRDialogOpen(false)}
        address={account.contents.address}
      />
      <SendDialog
        open={sendDialogOpen}
        onClose={() => setSendDialogOpen(false)}
        account={account.contents}
      />
    </>
  )
}

export default WalletCard
