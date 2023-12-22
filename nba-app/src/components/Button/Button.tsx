import React from 'react';

interface ButtonProps {
  disabled: boolean;
  onClick: () => void;
  type: 'button' | 'submit' | 'reset';
  className: string;
  name: string;
}

const Button: React.FC<ButtonProps> = ({
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  name,
}) => (
  <button
    disabled={disabled}
    onClick={onClick}
    type="button"
    className={`text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 ${
      disabled
        ? 'cursor-not-allowed opacity-50'
        : 'hover:bg-gray-100 focus:ring-4 focus:ring-gray-200'
    } ${className}`}
  >
    {name}
  </button>
);

export default Button;
