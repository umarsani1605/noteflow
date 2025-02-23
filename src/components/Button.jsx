import React from 'react';

function Button({ type = 'button', variant = 'primary', children, ...props }) {
  const variantStyles = {
    primary: 'bg-[#007afc] text-white hover:bg-[#0053e0]',
    secondary: 'bg-transparent text-[#007afc] border border-[#007afc] hover:bg-[#007afc] hover:text-white',
  };

  return (
    <>
      <button type={type} className={`px-5 py-2 text-sm rounded-lg font-medium transition-colors duration-300 ${variantStyles[variant]}`} {...props}>
        {children}
      </button>
    </>
  );
}

export default Button;
