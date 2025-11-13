"use client";
import { useWebSocket } from "../contexts/WebsocketContext";
import { Loader } from "./Loader";
import { Button } from "./ui/Button";

export function ButtonDraw() {
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
    <Button onClick={startDraw} type="button" className="animate-fade-in">
      Iniciar sorteio
    </Button>
  );
}
