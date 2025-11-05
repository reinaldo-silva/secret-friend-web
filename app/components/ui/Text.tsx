import clsx from "clsx";
import { ComponentProps } from "react";

interface ITextProps extends ComponentProps<"span"> {
  size?: "sm" | "base" | "lg";
}

export function Text({
  size = "base",
  className,
  children,
  ...props
}: Readonly<ITextProps>) {
  const sizeClasses = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
  };

  return (
    <span className={clsx(sizeClasses[size], className)} {...props}>
      {children}
    </span>
  );
}
