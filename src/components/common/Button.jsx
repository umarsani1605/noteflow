import PropTypes from "prop-types";
import React from "react";

function Button({
  variant = "primary",
  icon: Icon,
  onClick,
  children,
  ...props
}) {
  const variantStyles = {
    primary: "bg-[#007afc] text-white hover:bg-[#0053e0]",
    secondary:
      "bg-transparent text-slate-700 hover:bg-slate-200 dark:text-slate-200 dark:hover:bg-slate-600",
  };

  return (
    <button
      className={`flex h-10 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-300 ${variantStyles[variant]}`}
      onClick={onClick}
      {...props}
    >
      {Icon && <Icon className="w-5" />}
      {children}
    </button>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary"]),
  icon: PropTypes.object,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default Button;
