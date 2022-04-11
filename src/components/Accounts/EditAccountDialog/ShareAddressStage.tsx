import React from 'react'
import toast from 'react-hot-toast'
import {
  EmailShareButton,
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share'
import QRCode from 'react-qr-code'
import { ReactComponent as FacebookIcon } from '../../../assets/images/icons/facebook.svg'
import { ReactComponent as TwitterIcon } from '../../../assets/images/icons/twitter.svg'
import { ReactComponent as TelegramIcon } from '../../../assets/images/icons/telegram.svg'
import { ReactComponent as WhatsappIcon } from '../../../assets/images/icons/whatsapp.svg'
import { ReactComponent as EmailIcon } from '../../../assets/images/icons/gmail.svg'

type Props = {
  address: string
}

const ShareAddressStage: React.FC<Props> = ({ address }) => {
  return (
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
      <div className="flex items-center space-x-6 py-4">
        <FacebookShareButton url="https://www.forbole.com/" quote={address} hashtag="#forbole-X">
          <FacebookIcon className="w-12 h-12 hover:opacity-80" />
        </FacebookShareButton>
        <TwitterShareButton url="https://www.forbole.com/" title={address} hashtags={['#forbole']}>
          <TwitterIcon className="w-12 h-12 hover:opacity-80" />
        </TwitterShareButton>
        <TelegramShareButton url="https://www.forbole.com/" title={address}>
          <TelegramIcon className="w-12 h-12 hover:opacity-80" />
        </TelegramShareButton>
        <WhatsappShareButton url="https://www.forbole.com/" title={address} separator=":: ">
          <WhatsappIcon className="w-12 h-12 hover:opacity-80" />
        </WhatsappShareButton>
        <EmailShareButton
          url="https://www.forbole.com/"
          subject="My Address"
          body={address}
          separator=":: "
        >
          <EmailIcon className="w-12 h-12 hover:opacity-80" />
        </EmailShareButton>
      </div>
      <div className="flex flex-col items-center mt-8">
        <QRCode value={address} size={180} />
        <p className="mt-4">Scan for address</p>
      </div>
    </div>
  )
}

export default ShareAddressStage
