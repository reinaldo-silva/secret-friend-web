import clsx from "clsx";

interface IHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  size?: "sm" | "md" | "lg";
}

export function Heading({
  size = "lg",
  className = "",
  children,
}: Readonly<IHeadingProps>) {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
  };

  return (
    <h1 className={clsx(sizeClasses[size], "font-bold", className)}>
      {children}
    </h1>
  );
}
