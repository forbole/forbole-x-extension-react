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
        `${type === 'select' && selected ? 'border-gray-500' : 'hover:border-gray-500'}`,
        'border rounded-sm cursor-pointer'
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default ButtonArea
