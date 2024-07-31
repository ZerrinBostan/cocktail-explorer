import React from 'react';

const Button = ({ text }) => {
  return (
    <button className="w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-indigo">
      {text}
    </button>
  );
};

export default Button;
