import React from 'react';

interface Props {
  text?: string;
  onClick?: (x: any) => void;
  type?: any;
}

const Button = ({ text, onClick, type }: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className='nightwind-prevent inline-flex items-center w-full justify-center py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
    >
      {text}
    </button>
  );
};

export default Button;
