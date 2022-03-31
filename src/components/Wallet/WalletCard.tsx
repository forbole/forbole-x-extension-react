import React from 'react'
import { ReactComponent as DsmAvatar } from '../../assets/images/cryptocurrencies/dsm.svg'
import { ReactComponent as IconCopy } from '../../assets/images/icons/icon_copy.svg'
import { ReactComponent as IconQrcode } from '../../assets/images/icons/icon_qrcode.svg'
import { ReactComponent as IconMore } from '../../assets/images/icons/icon_more.svg'
import { Loadable } from 'recoil'
import toast from 'react-hot-toast';

type Props = {
  account: Loadable<AccountDetail>
}

const WalletCard = ({ account }: Props) => {
  const [isCopySuccess, setIsCopySuccess] = React.useState(false)

  const copyText = React.useCallback(
    (e) => {
      e.stopPropagation()
      navigator.clipboard.writeText(account.contents.address)
      setIsCopySuccess(true)
      toast.success('Copied to Clipboard!')
    },
    [account.contents.address]
  )


  return (
    <div className="mx-5 p-6 rounded-xl bg-popup-100">
      <div className="w-full flex items-start space-x-3 mb-3">
        <DsmAvatar className="w-10 h-10 self-center" />
        <div className='w-full'>
          <h4>{account.contents.name}</h4>
          <div className="flex items-center space-x-1">
            <span className="text-font-200 text-xs leading-none">{account.contents.address}</span>
            <IconCopy onClick={copyText} className='cursor-pointer' />
            <IconQrcode className='cursor-pointer' />
          </div>
        </div>
        <IconMore className='cursor-pointer' />
      </div>
      <div className='flex justify-between space-x-4'>
            <button className='nightwind-prevent text-white bg-primary-100 w-full py-[9px] rounded-md'>Delegate</button>
            <button className='nightwind-prevent text-white bg-[#1EC490] w-full py-[9px] rounded-md'>Send</button>
            <button className='nightwind-prevent text-white bg-[#ECB140] w-full py-[9px] rounded-md'>Withdraw Rewards</button>
          </div>
    </div>
  )
}

export default WalletCard
