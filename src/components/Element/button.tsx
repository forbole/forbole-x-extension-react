import React from 'react';

interface Props {
  text?: string;
  onClick?: (x: any) => void;
  type?: any;
  bgColor?: string;
}

const Button = ({ text, onClick, type, bgColor = 'indigo' }: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`nightwind-prevent bg-${bgColor}-600 dark:bg-${bgColor}-600 hover:bg-${bgColor}-700 focus:outline-none inline-flex items-center w-full justify-center py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white`}
    >
      {text}
    </button>
  );
};

export default Button;
