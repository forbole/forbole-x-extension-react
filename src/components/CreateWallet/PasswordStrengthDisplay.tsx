import React from 'react'

type Props = {
  passwordSecurityLevel: number
}

const PasswordStrengthDisplay = ({ passwordSecurityLevel }: Props) => {
  const indicator = [
    { color: 'red-500', message: 'Weak' },
    { color: 'yellow-700', message: 'Medium' },
    { color: 'green-700', message: 'Strong' },
    { color: 'green-700', message: 'Strong' },
  ]

  return (
    <div className="flex w-full h-1 items-center">
      <div className="bg-red-500 bg-yellow-700 bg-green-700 bg-gray-200 bg-gray-800 text-red-500 text-yellow-700 text-green-700" />
      <div
        className={`nightwind-prevent bg-${indicator[0].color} w-full h-1`}
      />
      <div
        className={`nightwind-prevent ${
          passwordSecurityLevel > 0
            ? `bg-${indicator[1].color}`
            : 'bg-gray-200 dark:bg-gray-800 dark:opacity-10'
        }  w-full h-1`}
      />
      <div
        className={`nightwind-prevent ${
          passwordSecurityLevel > 1
            ? `bg-${indicator[2].color}`
            : 'bg-gray-200 dark:bg-gray-800 dark:opacity-10'
        }  w-full h-1`}
      />
      <p
        className={`ml-3 text-sm nightwind-prevent text-${indicator[passwordSecurityLevel].color}`}
      >
        {indicator[passwordSecurityLevel].message}
      </p>
    </div>
  )
}

export default PasswordStrengthDisplay
