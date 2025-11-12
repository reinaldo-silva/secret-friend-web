"use client";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { toast } from "sonner";
import { useWebSocket } from "../contexts/WebsocketContext";
import { Button } from "./ui/Button";
import { Heading } from "./ui/Heading";
import { Input } from "./ui/Input";
import { Text } from "./ui/Text";

export function CreateRoom() {
  const { sendMessage, handleCreateRoom } = useWebSocket();
  const router = useRouter();

  function create(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const roomName = formData.get("roomName")?.toString().trim();

    if (!roomName) {
      toast("Room name cannot be empty.");
      return;
    }

    const { slug, admin } = handleCreateRoom(roomName);

    const payload = {
      type: "create_room",
      roomId: slug,
      roomName,
      adminId: admin.id,
      adminName: admin.name,
    };

    sendMessage(payload);
    router.push(`/room/${slug}`);
  }

  // function startDraw() {
  //   if (!room) return;

  //   const payload = {
  //     type: "start_draw",
  //     roomId: room.slug,
  //     adminId: room.admin.id,
  //   };
  //   sendMessage(payload);
  // }

  return (
    <form onSubmit={create} className="flex flex-col text-center gap-2">
      <div className="mb-4">
        <Heading size="sm">Crie seu sorteio!</Heading>
        <Text>Como vai se chamar seu sorteio?</Text>
      </div>
      <Input
        type="text"
        placeholder="Turma do escritorio"
        required
        name="roomName"
        className="w-full"
      />
      <Button type="submit">Criar sorteio</Button>
    </form>
  );
}
