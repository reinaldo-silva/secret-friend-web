"use client";
import { Loader } from "@/app/components/Loader";
import { Button } from "@/app/components/ui/Button";
import { Card } from "@/app/components/ui/Card";
import { Heading } from "@/app/components/ui/Heading";
import { Input } from "@/app/components/ui/Input";
import { useWebSocket } from "@/app/contexts/WebsocketContext";
import { generateId } from "@/app/utils";
import { Clipboard, Plus } from "lucide-react";
import { FormEvent } from "react";
import { toast } from "sonner";

export function AddParticipantForm() {
  const { room, sendMessage } = useWebSocket();

  function addManual(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!room) return;

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
    <section>
      <div className="flex justify-between p-1">
        <Heading size="md">{room?.name}</Heading>
        <button
          onClick={copyRoomLink}
          type="button"
          className="flex items-center font-semibold text-zinc-400 gap-1 hover:text-zinc-700 cursor-pointer"
        >
          <span>link da sala</span>
          <Clipboard size={16} />
        </button>
      </div>
      <Card className="animate-fade-in">
        <form onSubmit={addManual} className="flex w-full gap-2">
          <Input placeholder="Nome do novo participante" name="name" />
          <Button type="submit">
            <Plus />
          </Button>
        </form>
      </Card>
    </section>
  );
}
