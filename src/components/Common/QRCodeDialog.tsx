import { useTranslation } from 'react-i18next'
import React from 'react'
import toast from 'react-hot-toast'
import QRCode from 'react-qr-code'
import Dialog from '../Element/dialog'

type Props = {
  open: boolean
  onClose: () => void
  address: string
}

const QRCodeDialog: React.FC<Props> = ({ open, onClose, address }) => {
  const { t } = useTranslation('common')
  return (
    <Dialog
      title={t('share address')}
      open={open}
      onClose={() => {
        onClose()
      }}
      toPrevStage={null}
    >
      <div className="flex flex-col mt-8 px-4">
        <p>Address</p>
        <div className="flex items-center text-font-200 justify-between border-b pb-4 mb-8">
          <p>{address}</p>
          <button
            onClick={() => {
              navigator.clipboard.writeText(address)
              toast.success('Copied to Clipboard!')
            }}
            className="rounded px-2 border border-font-200 hover:opacity-80"
          >
            Copy
          </button>
        </div>
        <p>Share to</p>
        <div className="flex flex-col items-center mt-8">
          <QRCode value={address} size={180} />
          <p className="mt-4">Scan for address</p>
        </div>
      </div>
    </Dialog>
  )
}

export default QRCodeDialog
