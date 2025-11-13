"use client";
import { Card } from "@/app/components/ui/Card";
import { Heading } from "@/app/components/ui/Heading";
import { SERVER_STATUS, useWebSocket } from "@/app/contexts/WebsocketContext";
import { Crown } from "lucide-react";
import { useEffect, useEffectEvent } from "react";
import { Loader } from "./Loader";

export function ParticipantsCard({ slug }: { slug: string }) {
  const { room, sendMessage, status, currentUser } = useWebSocket();

  const getRoomById = useEffectEvent(() => {
    sendMessage({
      type: "get_room_by_id",
      roomId: slug,
    });
  });

  useEffect(() => {
    if (status === SERVER_STATUS.ALIVE && !room) {
      getRoomById();
    }
  }, [status, room]);

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
