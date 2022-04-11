import React from 'react'
import { ReactComponent as ArrowIcon } from '../../../assets/images/icons/arrow_right.svg'

type Props = {
  onChangeMoniker(): void
  onShareAddress(): void
  onRemove(): void
}

const ShareAddressStage = ({ onChangeMoniker, onShareAddress, onRemove }: Props) => {
  return <div className="flex flex-col mt-8 px-4"></div>
}

export default ShareAddressStage
