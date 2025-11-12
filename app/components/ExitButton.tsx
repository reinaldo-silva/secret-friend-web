"use client";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { ButtonArrowLeft } from "./ui/ButtonArrowLeft";

export function ExitButton() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLeaveApp = () => {
    Cookies.remove("userLocal");
    router.refresh();
  };

  return (
    <>
      <ButtonArrowLeft
        description="Sair"
        type="button"
        onClick={handleLeaveApp}
        className="absolute top-4 px-1 py-0.5 left-4 animate-fade-in"
      />
      {pathname !== "/room" && (
        <ButtonArrowLeft
          description="Salas"
          type="button"
          onClick={() => {
            router.push("/room");
          }}
          className="absolute top-12 px-1 py-0.5 left-4 animate-fade-in"
        />
      )}
    </>
  );
}
