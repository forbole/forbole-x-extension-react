import React from 'react'
import {
  EmailShareButton,
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share'
import { ReactComponent as FacebookIcon } from '../../assets/images/icons/facebook.svg'
import { ReactComponent as TwitterIcon } from '../../assets/images/icons/twitter.svg'
import { ReactComponent as TelegramIcon } from '../../assets/images/icons/telegram.svg'
import { ReactComponent as WhatsappIcon } from '../../assets/images/icons/whatsapp.svg'
import { ReactComponent as EmailIcon } from '../../assets/images/icons/gmail.svg'

type Props = {
  mnemonicPhraseBackup: string
}

const ShareList = ({mnemonicPhraseBackup}: Props) => {
  return (
    <div className="grid grid-cols-4 gap-10">
      <div className="flex flex-col space-y-2">
        <FacebookShareButton
          url="https://www.forbole.com/"
          quote={mnemonicPhraseBackup}
          hashtag="#forbole-X"
          className="flex self-center"
        >
          <FacebookIcon className="w-10 h-10 hover:opacity-80" />
        </FacebookShareButton>
        <p className="text-center">Facebook</p>
      </div>
      <div className="flex flex-col space-y-2">
        <TwitterShareButton
          className="flex self-center"
          url="https://www.forbole.com/"
          title={mnemonicPhraseBackup}
          hashtags={['#forbole']}
        >
          <TwitterIcon className="w-10 h-10 hover:opacity-80" />
        </TwitterShareButton>
        <p className="text-center">Twitter</p>
      </div>
      <div className="flex flex-col space-y-2">
        <TelegramShareButton className="flex self-center" url="https://www.forbole.com/" title={mnemonicPhraseBackup}>
          <TelegramIcon className="w-10 h-10 hover:opacity-80" />
        </TelegramShareButton>
        <p className="text-center">Telegram</p>
      </div>
      <div className="flex flex-col space-y-2">
        <WhatsappShareButton
          className="flex self-center"
          url="https://www.forbole.com/"
          title={mnemonicPhraseBackup}
          separator=":: "
        >
          <WhatsappIcon className="w-10 h-10 hover:opacity-80" />
        </WhatsappShareButton>
        <p className="text-center">Whatsapp</p>
      </div>
      <div className="flex flex-col space-y-2">
        <EmailShareButton
          className="flex self-center"
          url="https://www.forbole.com/"
          subject="My Address"
          body={mnemonicPhraseBackup}
          separator=":: "
        >
          <EmailIcon className="w-10 h-10 hover:opacity-80" />
        </EmailShareButton>
        <p className="text-center">Email</p>
      </div>
    </div>
  )
}

export default ShareList
