"use client";
import { Loader } from "@/app/components/Loader";
import { Button } from "@/app/components/ui/Button";
import { Card } from "@/app/components/ui/Card";
import { Input } from "@/app/components/ui/Input";
import { useWebSocket } from "@/app/contexts/WebsocketContext";
import { generateId } from "@/app/utils";
import { Plus } from "lucide-react";
import { FormEvent } from "react";
import { toast } from "sonner";
import { Text } from "./ui/Text";

export function AddParticipantForm() {
  const { room, sendMessage } = useWebSocket();

  function addManual(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!room) return;

    if (room.alreadyDraw) {
      toast("Não é possível adicionar participantes após o sorteio.");
      return;
    }

    const pid = generateId("p_");

    const formData = new FormData(e.currentTarget);

    const participantName = formData.get("name")?.toString().trim();

    if (!participantName) {
      toast("O nome do participante não pode estar vazio.");
      return;
    }

    const payload = {
      type: "add_participant",
      roomId: room.slug,
      adminId: room.admin.id,
      participantId: pid,
      name: participantName,
    };

    sendMessage(payload);
    e.currentTarget.reset();
  }

  if (!room) {
    return <Loader />;
  }

  return (
    <Card className="animate-fade-in space-y-2">
      <form onSubmit={addManual} className="flex w-full gap-2">
        <Input
          placeholder="Nome do novo participante"
          name="name"
          disabled={room.alreadyDraw}
        />
        <Button type="submit" disabled={room.alreadyDraw}>
          <Plus />
        </Button>
      </form>
      {room.alreadyDraw && (
        <Text className="font-semibold text-zinc-400!" size="sm">
          Não é possível adicionar participantes após o sorteio
        </Text>
      )}
    </Card>
  );
}
