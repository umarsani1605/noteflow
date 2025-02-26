import React from 'react';
import PropTypes from 'prop-types';

function Button({ variant = 'primary', icon, onClick, children, ...props }) {
  const variantStyles = {
    primary: 'bg-[#007afc] text-white hover:bg-[#0053e0]',
    secondary: 'bg-transparent text-slate-700 hover:bg-slate-200',
  };

  return (
    <button
      className={`flex gap-2 px-3 py-2 text-sm rounded-lg font-medium transition-colors duration-300 ${variantStyles[variant]}`}
      onClick={onClick}
      {...props}
    >
      {icon && <img src={icon} alt="icon" className="w-5" />}
      {children}
    </button>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary']),
  icon: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default Button;
