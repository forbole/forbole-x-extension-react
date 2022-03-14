import React from 'react'
import { useState } from 'react'

interface Props {
  placeholder?: string
}

export const Input = ({ placeholder }: Props) => {
  return (
    <div>
      <input
        type="password"
        className="shadow-sm focus:ring-primary-100 focus:border-primary-100 block w-full text-sm border-gray-300 rounded-sm px-3 py-2 bg-popup-100"
        placeholder={placeholder}
      />
    </div>
  )
}
