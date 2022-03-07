import React from 'react'
import classNames from 'classnames'
import { ReactComponent as Loading} from '../../assets/images/icons/loading.svg'

interface Props {
  text?: string
  onClick?: (x: any) => void
  type?: any
  bgColor?: string
  loading?: boolean
}

const Button = ({ text, onClick, type, bgColor, loading }: Props) => {
  return (
    <button
      disabled={loading}
      type={type}
      onClick={onClick}
      className={classNames(
        `bg-button-100 dark:bg-button-100 hover:bg-button-100`,
        'nightwind-prevent focus:outline-none inline-flex items-center w-full justify-center space-x-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white'
      )}
    >
      {loading && <Loading className='w-4 h-4 nightwind-prevent text-white animate-spin' />}
      <p>
      {text}
      </p>
    </button>
  )
}

export default Button
