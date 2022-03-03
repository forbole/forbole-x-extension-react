import React from 'react'
import classNames from 'classnames'

interface Props {
  text?: string
  onClick?: (x: any) => void
  type?: any
  bgColor?: string
}

const Button = ({ text, onClick, type, bgColor }: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames(
        `bg-button-100 dark:bg-button-100 hover:bg-button-100`,
        'nightwind-prevent focus:outline-none inline-flex items-center w-full justify-center py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white'
      )}
    >
      {text}
    </button>
  )
}

export default Button
