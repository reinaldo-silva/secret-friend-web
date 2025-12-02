"use client";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { Dialog } from "./Dialog";
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
      <Dialog
        title={`Deseja sair?`}
        description="Essa ação não poderá ser desfeita. Você perderá o acesso às suas salas."
        handleConfirm={handleLeaveApp}
      >
        <ButtonArrowLeft
          description="Sair"
          type="button"
          className="absolute top-4 px-1 py-0.5 left-4 animate-fade-in"
        />
      </Dialog>
      {pathname !== "/room" && (
        <Dialog
          title={`Deseja voltar para criar/entrar salas?`}
          description="Voce será redirecionado para a página de salas. Perderá o acesso à sala atual."
          handleConfirm={() => {
            router.push("/room");
          }}
        >
          <ButtonArrowLeft
            description="Salas"
            type="button"
            className="absolute top-12 px-1 py-0.5 left-4 animate-fade-in"
          />
        </Dialog>
      )}
    </>
  );
}
