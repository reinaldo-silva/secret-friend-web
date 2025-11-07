import clsx from "clsx";
import { ComponentProps } from "react";

interface IHeadingProps extends ComponentProps<"h1"> {
  size?: "sm" | "md" | "lg";
}

export function Heading({
  size = "lg",
  className,
  children,
  ...props
}: Readonly<IHeadingProps>) {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
  };

  return (
    <h1 className={clsx(sizeClasses[size], "font-bold text-zinc-800", className)} {...props}>
      {children}
    </h1>
  );
}
