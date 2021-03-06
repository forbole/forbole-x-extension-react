import React from 'react'
import classNames from 'classnames'
import { ReactComponent as Loading } from '../../assets/images/icons/loading.svg'

interface Props {
  text?: string
  onClick?: (x: any) => void
  type?: any
  loading?: boolean
  disabled?: boolean
  secondary?: boolean
}

const Button = ({ text, onClick, type, loading, disabled, secondary }: Props) => {
  return (
    <button
      disabled={loading || disabled}
      type={type}
      onClick={onClick}
      className={classNames(
        `${
          secondary ? 'bg-secondary-100 dark:bg-primary-100' : 'bg-primary-100 dark:bg-primary-100'
        } hover:opacity-80 disabled:opacity-50 dark:disabled:opacity-50`,
        'nightwind-prevent focus:outline-none inline-flex items-center w-full justify-center space-x-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white'
      )}
    >
      {loading && <Loading className="w-4 h-4 nightwind-prevent text-white animate-spin" />}
      <p>{text}</p>
    </button>
  )
}

export default Button
