"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { ButtonArrowLeft } from "./ui/ButtonArrowLeft";

export function ExitButton() {
  const router = useRouter();

  const handleLeaveApp = () => {
    Cookies.remove("userLocal");
    router.refresh();
  };

  return (
    <ButtonArrowLeft
      description="Sair"
      type="button"
      onClick={handleLeaveApp}
      className="absolute top-4 px-1 py-0.5 left-4 animate-fade-in"
    />
  );
}
