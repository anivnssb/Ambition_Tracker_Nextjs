import React from "react";

type Styles = { primary: string; secondary: string; outline: string };

export const TailwindButton: React.FC<
  React.PropsWithChildren & {
    variant: keyof Styles;
  }
> = ({ children, variant = "primary", ...props }) => {
  const base = "px-4 py-2 rounded-xl font-medium transition-colors";

  const styles: Styles = {
    primary: "bg-brand text-white hover:bg-brand-light shadow-button",
    secondary:
      "bg-surface-light text-text border border-gray-300 hover:bg-gray-50",
    outline: "border border-brand text-brand hover:bg-brand/10",
  };

  return (
    <button className={`${base} ${styles[variant]}`} {...props}>
      {children}
    </button>
  );
};
