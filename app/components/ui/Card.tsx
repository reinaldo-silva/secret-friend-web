import clsx from "clsx";
import { ComponentProps } from "react";

export function Card({ children, className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={clsx(
        "rounded-lg border border-zinc-200 bg-zinc-50 p-6 shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
