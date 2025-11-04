import clsx from "clsx";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost";
}

export function Button({
  children,
  variant,
  ...props
}: Readonly<IButtonProps>) {
  const variantClasses = {
    primary: "bg-gradient text-zinc-50 hover:opacity-90",
    outline: "border-[0.5px] border-zinc-300 text-zinc-800 hover:bg-zinc-100",
    ghost:
      "bg-transparent text-zinc-800 hover:bg-purple-100 hover:text-purple-800",
  };

  return (
    <button
      className={clsx(
        "px-6 py-2 rounded-xl transition duration-200 cursor-pointer flex items-center",
        variantClasses[variant || "primary"]
      )}
      {...props}
    >
      {children}
    </button>
  );
}
