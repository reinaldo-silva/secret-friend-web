"use client";
import { Clipboard } from "lucide-react";
import { toast } from "sonner";
import { useWebSocket } from "../contexts/WebsocketContext";
import { Heading } from "./ui/Heading";
import { Loader } from "./Loader";

export function RoomInformation() {
  const { room } = useWebSocket();
  async function copyRoomLink() {
    if (typeof window === "undefined") {
      return;
    }

    await navigator.clipboard.writeText(window.location.href);
    toast("Link copiado para a área de transferência.");
  }

  if (!room) {
    return <Loader />;
  }

  return (
    <div className="flex justify-between items-end p-1 animate-fade-in">
      <div className="flex flex-col truncate">
        <span className="font-semibold text-zinc-400 -mb-2">Sorteio:</span>
        <Heading size="md" className="truncate">
          {room?.name}
        </Heading>
      </div>
      <button
        onClick={copyRoomLink}
        type="button"
        className="flex items-center justify-end font-semibold min-w-[120px] text-zinc-400 gap-1 hover:text-zinc-700 cursor-pointer"
      >
        <span>link da sala</span>
        <Clipboard size={16} />
      </button>
    </div>
  );
}
