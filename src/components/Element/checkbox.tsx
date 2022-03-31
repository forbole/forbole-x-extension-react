import React from 'react'

const Checkbox: React.FC<any> = (props) => {
  return (
    <input
      className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm checked:bg-primary-100 checked:border-primary-100 focus:outline-none transition duration-200cursor-pointer"
      type="checkbox"
      {...props}
    />
  )
}

export default Checkbox
