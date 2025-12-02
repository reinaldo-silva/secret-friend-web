"use client";
import { useWebSocket } from "../contexts/WebsocketContext";
import { Dialog } from "./Dialog";
import { Button } from "./ui/Button";

export function ExitRoomButton() {
  const { room, sendMessage, currentUser } = useWebSocket();

  const leaveRoom = () => {
    if (!room || !currentUser) {
      return;
    }

    sendMessage({
      type: "leave_room",
      roomId: room.slug,
      clientId: currentUser.id,
    });
  };

  if (!room || currentUser?.id === room.admin.id || room.alreadyDraw) {
    return null;
  }

  return (
    <Dialog
      title={`Deseja sair desse soteio?`}
      description="Você poderá entrar novamente se tiver o link da sala, porém nao estará mais participando do sorteio."
      handleConfirm={leaveRoom}
    >
      <Button className="flex-1 animate-fade-in" type="button" variant="danger">
        Sair do sorteio
      </Button>
    </Dialog>
  );
}
