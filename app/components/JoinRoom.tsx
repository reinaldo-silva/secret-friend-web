"use client";
import { ArrowRight } from "lucide-react";
import { FormEvent } from "react";
import { toast } from "sonner";
import { useWebSocket } from "../contexts/WebsocketContext";
import { Button } from "./ui/Button";
import { Heading } from "./ui/Heading";
import { Input } from "./ui/Input";
import { Text } from "./ui/Text";

export default function JoinRoom() {
  const { sendMessage, currentUser } = useWebSocket();

  function join(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!currentUser) {
      return;
    }

    const formData = new FormData(e.currentTarget);

    const roomId = formData.get("roomId")?.toString().trim();

    if (!roomId) {
      toast("Room name cannot be empty.");
      return;
    }

    const payload = {
      type: "join_room",
      roomId,
      clientId: currentUser.id,
      name: currentUser.name,
    };

    sendMessage(payload);
  }

  return (
    <form onSubmit={join} className="flex flex-col gap-2 text-center">
      <div className="mb-4">
        <Heading size="sm">Entre em um sorteio!</Heading>
        <Text>Digite o código de algum sorteio já existente</Text>
      </div>
      <div className="flex items-center gap-2">
        <Input
          type="text"
          placeholder="Digite o código da sala"
          required
          name="roomId"
        />
        <Button>
          <ArrowRight />
        </Button>
      </div>
    </form>
  );
}
