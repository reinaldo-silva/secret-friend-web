"use client";
import { useRouter } from "next/navigation";
import { useWebSocket } from "../contexts/WebsocketContext";
import { Button } from "./ui/Button";

export function ExitRoomButton() {
  const router = useRouter();
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

    router.push("/room");
  };

  if (currentUser?.id === room?.admin.id) {
    return null;
  }

  return (
    <Button
      className="flex-1 animate-fade-in"
      type="button"
      onClick={leaveRoom}
      variant={"danger"}
    >
      Sair do sorteio
    </Button>
  );
}
