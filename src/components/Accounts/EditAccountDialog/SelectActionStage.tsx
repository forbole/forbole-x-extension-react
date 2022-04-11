import React from 'react'
import { ReactComponent as ArrowIcon } from '../../../assets/images/icons/arrow_right.svg'

type Props = {
  onChangeMoniker(): void
  onShareAddress(): void
  onRemove(): void
}

const ButtonItem: React.FC<{ text: string; onClick: () => void; destructive?: boolean }> = ({
  text,
  onClick,
  destructive,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex justify-between items-center p-4 bg-popup-100 hover:opacity-70 mb-[1px] ${
        destructive ? 'text-primary-100' : ''
      }`}
    >
      {text}
      {!destructive && (
        <ArrowIcon className="w-[18px] h-[18px] fill-icon-light dark:fill-icon-dark" />
      )}
    </button>
  )
}

const SelectActionStage = ({ onChangeMoniker, onShareAddress, onRemove }: Props) => {
  return (
    <div className="flex flex-col mt-8 mx-4 rounded overflow-hidden">
      <ButtonItem text="Change account moniker" onClick={onChangeMoniker} />
      <ButtonItem text="Share address" onClick={onShareAddress} />
      <ButtonItem text="Remove Account" destructive onClick={onRemove} />
    </div>
  )
}

export default SelectActionStage
