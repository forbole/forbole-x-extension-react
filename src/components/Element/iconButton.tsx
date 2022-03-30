import React from 'react'
import classNames from 'classnames'
import { ReactComponent as Loading } from '../../assets/images/icons/loading.svg'

interface Props {
  onClick?: (x: any) => void
  loading?: boolean
  disabled?: boolean
  icon: React.ReactElement
}

const IconButton = ({ icon, onClick, loading, disabled }: Props) => {
  return (
    <button disabled={loading || disabled} onClick={onClick} className="hover:opacity-80">
      {loading && <Loading className="w-4 h-4 nightwind-prevent text-white animate-spin" />}
      {React.cloneElement(icon, {
        className: 'w-[18px] h-[18px] fill-icon-light dark:fill-icon-dark',
      })}
    </button>
  )
}

export default IconButton
