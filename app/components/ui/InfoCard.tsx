"use client";
import clsx from "clsx";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

interface InfoCardProps {
  title: string;
  description: string;
  variant?: "info" | "success" | "warning" | "error" | "primary";
  className?: string;
}

export function InfoCard({
  title,
  description,
  variant = "info",
  className,
}: Readonly<InfoCardProps>) {
  const variantClasses = {
    primary:
      "bg-gradient-to-r text-purple-800 from-purple-100 to-pink-100 border-purple-300 shadow-lg shadow-purple-200/50",
    info: "bg-blue-50 text-blue-800 border-blue-300",
    success: "bg-green-50 text-green-800 border-green-300",
    warning: "bg-yellow-50 text-yellow-800 border-yellow-300",
    error: "bg-red-50 text-red-800 border-red-300",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 15 }}
      className={clsx(
        "flex items-start gap-3 border p-4 rounded-2xl shadow-sm",
        variantClasses[variant],
        className
      )}
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="mt-1"
      >
        <AlertCircle size={22} className="opacity-80" />
      </motion.div>

      <div>
        <h3 className="font-semibold text-base">{title}</h3>
        <p className="text-sm opacity-80">{description}</p>
      </div>
    </motion.div>
  );
}
