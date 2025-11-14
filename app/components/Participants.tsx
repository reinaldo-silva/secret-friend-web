"use client";
import { Card } from "@/app/components/ui/Card";
import { Heading } from "@/app/components/ui/Heading";
import { useWebSocket } from "@/app/contexts/WebsocketContext";
import { Crown } from "lucide-react";
import { Loader } from "./Loader";

export function ParticipantsCard() {
  const { room, currentUser } = useWebSocket();

  if (!room) {
    return <Loader />;
  }

  return (
    <Card className="animate-fade-in">
      <Heading size="sm">Participantes</Heading>
      <div className="flex flex-wrap gap-2 mt-4">
        {room.participants.map((p, key) => (
          <div key={key} className="badge-gradient animate-fade-in">
            <div className="flex items-center gap-2">
              <span className="truncate max-w-[120px]">{p.name}</span>
              {p.id === room.admin.id && (
                <Crown size={18} className="text-yellow-500" />
              )}
              {p.id === currentUser?.id && (
                <span className="text-blue-500">(You)</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
