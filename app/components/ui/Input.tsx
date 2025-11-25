import clsx from "clsx";
import { ComponentProps } from "react";

interface IInputProps extends ComponentProps<"input"> {
  label?: string;
}

export function Input({ label, className, ...props }: Readonly<IInputProps>) {
  return (
    <label className="flex flex-col flex-1">
      {label && (
        <span className="mb-1 text-sm font-semibold text-zinc-700">
          {label}
        </span>
      )}
      <input
        {...props}
        aria-label={label}
        className={clsx(
          "input p-2 rounded-xl bg-zinc-100 border border-zinc-300 outline-transparent focus:outline-purple-400 transition duration-200 disabled:cursor-not-allowed",
          className
        )}
      />
    </label>
  );
}
