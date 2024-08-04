import React from 'react';

const Input = React.forwardRef(({
  id,
  type = 'text',
  name,
  error,
  showLabel = true,
  className,
  ...props
}, ref) => {
  return (
    <div className="flex flex-col">
      {showLabel && (
        <label
          htmlFor={id}
          className="flex flex-col mb-2 text-sm text-left text-grey-900"
        >
          {id.charAt(0).toUpperCase() + id.slice(1)}*
        </label>
      )}
      <input
        id={id}
        type={type}
        name={name}
        placeholder={name}
        className={`flex items-center px-5 py-4 mr-2 text-sm font-medium outline-none placeholder:text-slate bg-snow text-slate rounded-2xl ${
          error ? 'border-danger border-2' : 'focus:border-grey-400'
        } ${className}`}
        ref={ref}
        {...props}
      />
      {error && (
        <p className="text-left text-danger mb-5">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;

