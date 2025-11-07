"use client";
import Cookies from "js-cookie";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Text } from "./ui/Text";

export function ExitButton() {
  const router = useRouter();

  const handleLeaveApp = () => {
    Cookies.remove("userLocal");
    router.refresh();
  };

  return (
    <button
      className="absolute top-4 px-1 py-0.5 left-4 flex items-center gap-2 border-b-2 cursor-pointer hover:opacity-60 animate-fade-in"
      onClick={handleLeaveApp}
      type="button"
    >
      <ArrowLeft size={16} />
      <Text size="sm" className="font-semibold">
        Sair
      </Text>
    </button>
  );
}
