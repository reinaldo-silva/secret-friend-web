import clsx from "clsx";

interface ITextProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: "sm" | "base" | "lg";
}

export function Text({
  size = "base",
  className = "",
  children,
}: Readonly<ITextProps>) {
  const sizeClasses = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
  };

  return <span className={clsx(sizeClasses[size], className)}>{children}</span>;
}
