import type { ButtonProps } from "./Button.types";
import styles from "./Button.module.css";

export function Button({
  variant = "primary",
  size = "md",
  type = "button",
  ref,
  children,
  className,
  ...restProps
}: ButtonProps) {
  return (
    <button
      {...restProps}
      ref={ref}
      type={type}
      data-variant={variant}
      data-size={size}
      className={className ? `${styles.button} ${className}` : styles.button}
    >
      {children}
    </button>
  );
}
