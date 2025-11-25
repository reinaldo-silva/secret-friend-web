"use client";
import { useWebSocket } from "../contexts/WebsocketContext";
import { ButtonResult } from "./ButtonResult";
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
    <>
      {room.alreadyDraw ? (
        <ButtonResult slug={slug} />
      ) : (
        <Button onClick={startDraw} type="button" className="animate-fade-in">
          Iniciar sorteio
        </Button>
      )}
    </>
  );
}
