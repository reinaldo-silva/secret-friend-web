"use client";
import clsx from "clsx";
import { motion, useAnimation } from "framer-motion";
import { ComponentPropsWithoutRef } from "react";

interface IButtonProps extends ComponentPropsWithoutRef<typeof motion.button> {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost" | "danger";
}

export const variantClasses = {
  primary: "bg-gradient text-zinc-50 hover:opacity-90",
  outline: "border-[0.5px] border-zinc-300 text-zinc-800 hover:bg-zinc-100",
  ghost:
    "bg-purple-100 border border-purple-300 hover:bg-purple-100 text-purple-600 font-semibold",
  danger:
    "bg-red-200 border-red-500 border text-red-600 hover:bg-red-100 font-semibold",
};

export function Button({
  children,
  variant,
  className,
  ...props
}: Readonly<IButtonProps>) {
  const controls = useAnimation();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await controls.start({ scale: 0.9, transition: { duration: 0.1 } });
    await controls.start({
      scale: 1,
      transition: { type: "tween", stiffness: 400, damping: 20 },
    });

    props.onClick?.(e);
  };

  return (
    <motion.button
      animate={controls}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "tween",
        ease: "easeInOut",
        duration: 0.2,
      }}
      onClick={handleClick}
      className={clsx(
        "px-6 py-2 rounded-xl transition duration-200 cursor-pointer flex items-center justify-center disabled:cursor-not-allowed",
        variantClasses[variant || "primary"],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
