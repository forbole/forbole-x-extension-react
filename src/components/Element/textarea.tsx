import React from 'react'
import classNames from 'classnames'

interface Props {
  className?: string
}

const Textarea = ({ className }: Props) => {
  return (
    <textarea
      className={classNames(
        className,
        'shadow-sm focus:ring-primary-100 focus:border-primary-100 block w-full text-sm bg-popup-100 border-gray-300 rounded-sm px-3 py-2'
      )}
    />
  )
}

export default Textarea
