"use client";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import Cookies from "js-cookie";
import { Dices, DoorOpen, Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { ComponentProps, ReactNode, useState } from "react";
import { ClientOnly } from "./ClientOnly";
import { Dialog } from "./Dialog";
import { Text } from "./ui/Text";

export function Aside({ userLocal }: { userLocal?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, seIsOpen] = useState(false);

  const handleLeaveApp = () => {
    Cookies.remove("userLocal");
    seIsOpen(false);
    router.refresh();
  };

  function toggleMenu() {
    seIsOpen(!isOpen);
  }

  return (
    <div className="h-8 flex px-2 bg-zinc-100 z-50">
      {userLocal && (
        <>
          <button
            type="button"
            onClick={toggleMenu}
            className="flex items-center gap-2 text-sm"
          >
            <Menu size={16} />
            Menu
          </button>
          <AnimatePresence>
            {isOpen && (
              <>
                <motion.div
                  key="overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => seIsOpen(false)}
                  className="fixed inset-0 z-40"
                />

                <motion.aside
                  key="aside"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="fixed top-2 mt-8 left-4 border rounded-2xl bg-zinc-100/80 shadow-sm gap-2 flex flex-col p-4 px-6 z-50 backdrop-blur-md"
                >
                  <ClientOnly
                    fallback={
                      <div className="fixed top-4 left-4 bg-zinc-200 w-14 h-[26px] animate-pulse rounded-sm" />
                    }
                  >
                    {pathname !== "/room" && (
                      <Dialog
                        title={`Deseja voltar para criar/entrar salas?`}
                        description="Voce será redirecionado para a página de salas. Perderá o acesso à sala atual."
                        handleConfirm={() => {
                          router.push("/room");
                        }}
                      >
                        <ButtonArrowLeft
                          icon={<Dices />}
                          description="Salas"
                          type="button"
                          className="px-1 py-0.5 animate-fade-in"
                        />
                      </Dialog>
                    )}
                    <Dialog
                      title={`Deseja sair?`}
                      description="Essa ação não poderá ser desfeita. Você perderá o acesso às suas salas."
                      handleConfirm={handleLeaveApp}
                    >
                      <ButtonArrowLeft
                        variant="danger"
                        icon={<DoorOpen className="text-red-600" />}
                        description="Sair"
                        type="button"
                        className="px-1 py-0.5 animate-fade-in"
                      />
                    </Dialog>
                  </ClientOnly>
                </motion.aside>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

interface ButtonArrowLeftProps extends ComponentProps<"button"> {
  description: string;
  icon: ReactNode;
  variant?: "normal" | "danger";
}

function ButtonArrowLeft({
  description,
  className,
  variant = "normal",
  icon,
  ...rest
}: ButtonArrowLeftProps) {
  return (
    <button
      className={clsx(
        "flex items-center gap-2 cursor-pointer hover:opacity-60",
        className
      )}
      {...rest}
    >
      {icon}
      <Text
        size="sm"
        className={clsx("font-semibold", {
          "text-red-600!": variant === "danger",
        })}
      >
        {description}
      </Text>
    </button>
  );
}
