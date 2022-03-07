import React from 'react'
import classNames from 'classnames'

interface Props {
  children: JSX.Element
  onClick?: React.MouseEventHandler
  type?: 'select'
  selected?: boolean
}

const ButtonArea = ({ children, onClick, selected, type }: Props) => {
  return (
    <div
      className={classNames(
        `${type === 'select' && 'bg-popup-100 border-0 hover:bg-gray-200'}`,
        'border rounded-sm cursor-pointer w-full'
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default ButtonArea
