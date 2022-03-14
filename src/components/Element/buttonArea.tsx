import React from 'react'
import classNames from 'classnames'

interface Props {
  children: JSX.Element
  onClick?: React.MouseEventHandler
  type?: 'select'
  selected?: boolean
  index?: number
  length?: number
  className?: string
}

const ButtonArea = ({ children, onClick, selected, type, index, length, className }: Props) => {
  return (
    <div
      className={classNames(
        'border border-black border-opacity-20 hover:border-opacity-40 transition-colors rounded-sm cursor-pointer w-full',
        type === 'select' && `bg-popup-100 border-0 hover:bg-gray-200 rounded-none`,
        type==='select' && index === 0 &&`rounded-t-sm`,
        type==='select' && index+1 === length &&`rounded-b-sm`,
        selected && `bg-gray-200 dark:bg-gray-700`,
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default ButtonArea
