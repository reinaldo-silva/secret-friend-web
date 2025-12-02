"use client";
import { Card } from "@/app/components/ui/Card";
import { Heading } from "@/app/components/ui/Heading";
import { useWebSocket } from "@/app/contexts/WebsocketContext";
import { clsx } from "clsx";
import { Crown, Link as LinkIcon, X } from "lucide-react";
import { toast } from "sonner";
import { Dialog } from "./Dialog";
import { Loader } from "./Loader";

export function ParticipantsCard() {
  const { room, currentUser, sendMessage, onlineUsers } = useWebSocket();

  async function copyParticipantResultLink(link: string) {
    if (typeof window === "undefined") {
      return;
    }

    await navigator.clipboard.writeText(link);
    toast("Link copiado para a área de transferência.");
  }

  const removeUser = (userId: string) => {
    if (!room || !currentUser) {
      return;
    }

    sendMessage({
      type: "leave_room",
      roomId: room.slug,
      clientId: userId,
    });
  };

  if (!room) {
    return <Loader />;
  }

  return (
    <Card className="animate-fade-in">
      <Heading size="sm">Participantes</Heading>
      <div className="flex flex-wrap gap-2 mt-4">
        {room.participants.map((p, key) => {
          const secretToken = room.secretList?.[p.id] ?? "";
          const online = onlineUsers.some((user) => user.id === p.id);

          return (
            <div key={key} className="badge-gradient animate-fade-in">
              <div className="flex items-center gap-2">
                <span
                  className={clsx("size-2 rounded-full", {
                    "bg-red-500": !online,
                    "bg-green-400": online,
                  })}
                />
                <span className="truncate max-w-[120px]">{p.name}</span>
                {p.id === room.admin.id && (
                  <Crown size={18} className="text-yellow-500" />
                )}
                {p.id === currentUser?.id && (
                  <span className="text-blue-500">(Você)</span>
                )}
                {room.secretList && (
                  <button
                    type="button"
                    className="cursor-pointer"
                    onClick={() =>
                      copyParticipantResultLink(
                        `${window.location.href}/result?token=${secretToken}`
                      )
                    }
                  >
                    <LinkIcon size={16} />
                  </button>
                )}
                {!room.secretList &&
                  room.admin.id === currentUser?.id &&
                  p.id !== currentUser?.id && (
                    <Dialog
                      title={`Remover ${p.name} do sortieo?`}
                      description="Essa ação não pode ser desfeita. Tem certeza que deseja remover este participante da sala?"
                      handleConfirm={() => removeUser(p.id)}
                    >
                      <button
                        className="cursor-pointer text-red-500"
                        type="button"
                      >
                        <X size={16} />
                      </button>
                    </Dialog>
                  )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
