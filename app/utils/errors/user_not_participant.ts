import { toast } from "sonner";

export function user_not_participant(push: (path: string) => void) {
  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "";

  if (currentPath.includes("/result")) {
    return;
  }

  toast("Você não é um participante desse sorteio");
  push("/room");
}
