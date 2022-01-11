import React from 'react';
import { useState } from 'react';

interface Props {}

export const Input = (props: Props) => {
  return (
    <div>
      <label htmlFor='email' className='sr-only'>
        Email
      </label>
      <input
        type='password'
        //   name={`${isConfirmingPassword?'confirmPassword':'password'}`}
        //   id={`${isConfirmingPassword?'confirmPassword':'password'}`}
        className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm border-gray-300 rounded-sm px-3 py-2 bg-popup-100'
        placeholder='Password'
        //   onChange={e => setPassword(e.target.value)}
      />
    </div>
  );
};

// export function useInput({ type, placeholder}) {
//     const [value, setValue] = useState('');
//     const input = (
//       <input
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//         type={type} //   name={`${isConfirmingPassword?'confirmPassword':'password'}`}
//         //   id={`${isConfirmingPassword?'confirmPassword':'password'}`}
//         className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm border-gray-300 rounded-sm px-3 py-2 bg-popup-100'
//         placeholder={placeholder}
//         //   onChange={e => setPassword(e.target.value)}
//       />
//     );
//     return [value, setValue, input];
//   }
