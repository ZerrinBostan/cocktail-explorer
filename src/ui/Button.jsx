import React from 'react';

const sizeClasses = {
  xsmall: 'py-4 px-5 text-sm',
  small: 'py-4 text-sm',
  medium: 'px-6 py-5 text-sm',
  large: 'px-5 py-3 text-base',
};

const Button = React.forwardRef(({ text, size = 'medium', className = '', onClick, ...props}, ref) => {
  const sizeClass = sizeClasses[size] || sizeClasses.medium;

  return (
    <button
      className={`w-full ${sizeClass} font-bold leading-none text-black transition duration-300 rounded-2xl bg-indigo hover:bg-purple-blue-600 hover:text-white focus:ring-4 focus:ring-purple-blue-100 ${className}`}
      onClick={onClick}
      ref={ref}
      {...props}
    >
      {text}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
