import type { InputProps } from "./Input.types";

import styles from "./Input.module.css";

export function Input({ ref, className, ...restProps }: InputProps) {
  return (
    <input
      {...restProps}
      ref={ref}
      className={className ? `${styles.input} ${className}` : styles.input}
    />
  );
}
