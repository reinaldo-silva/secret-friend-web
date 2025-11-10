import clsx from "clsx";
import { ArrowLeft } from "lucide-react";
import { ComponentProps } from "react";
import { Text } from "./Text";

interface ButtonArrowLeftProps extends ComponentProps<"button"> {
  description: string;
}

export function ButtonArrowLeft({
  description,
  className,
  ...rest
}: ButtonArrowLeftProps) {
  return (
    <button
      className={clsx(
        "flex items-center gap-2 border-b-2 cursor-pointer hover:opacity-60",
        className
      )}
      {...rest}
    >
      <ArrowLeft size={16} />
      <Text size="sm" className="font-semibold">
        {description}
      </Text>
    </button>
  );
}
