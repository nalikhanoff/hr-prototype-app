import React from "react";
import clsx from "clsx";
import styles from "./Input.module.scss";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    const inputClass = clsx(styles.input, { [styles.error]: error }, className);

    return (
      <div className={styles.wrapper}>
        {label && <label className={styles.label}>{label}</label>}
        <input ref={ref} className={inputClass} {...props} />
        {error && <div className={styles.errorText}>{error}</div>}
      </div>
    );
  }
);

Input.displayName = "Input";
