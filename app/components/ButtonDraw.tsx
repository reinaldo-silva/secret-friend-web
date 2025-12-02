"use client";
import { useWebSocket } from "../contexts/WebsocketContext";
import { ButtonResult } from "./ButtonResult";
import { Dialog } from "./Dialog";
import { Loader } from "./Loader";
import { Button } from "./ui/Button";

export function ButtonDraw({ slug }: { slug: string }) {
  const { room, sendMessage } = useWebSocket();

  function startDraw() {
    if (!room) {
      return;
    }

    const payload = {
      type: "start_draw",
      roomId: room?.slug,
      adminId: room.admin.id,
    };
    sendMessage(payload);
  }

  if (!room) {
    return <Loader />;
  }

  return (
    <Dialog
      title={`Realizar o sorteio agora?`}
      description="Verifique que todos os participantes estejam no sorteio. Após iniciar, não será possível adicionar ou remover participantes."
      handleConfirm={startDraw}
    >
      {room.alreadyDraw ? (
        <ButtonResult slug={slug} />
      ) : (
        <Button type="button" className="animate-fade-in">
          Iniciar sorteio
        </Button>
      )}
    </Dialog>
  );
}
