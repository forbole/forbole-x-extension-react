import React from 'react'
import classNames from 'classnames'

const Textarea = ({ className, ...props }) => {
  return (
    <textarea
      className={classNames(
        className,
        'shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm bg-popup-100 border-gray-300 rounded-sm px-3 py-2'
      )}
      {...props}
    />
  )
}

export default Textarea
