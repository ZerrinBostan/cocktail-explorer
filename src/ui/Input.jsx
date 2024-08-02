import React from 'react';

const Input = ({ id, type, placeholder, value, onChange, error, showLabel = true, ...props }) => {
  return (
    <div className="flex flex-col" {...props}>
      {showLabel && (
        <label htmlFor={id} className="flex flex-col mb-2 text-sm text-left text-grey-900">
          {id.charAt(0).toUpperCase() + id.slice(1)}*
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none placeholder:text-slate bg-snow text-slate rounded-2xl ${
          error ? 'border-danger border-2' : 'focus:border-grey-400'
        }`}
      />
    </div>
  );
};

export default Input;
