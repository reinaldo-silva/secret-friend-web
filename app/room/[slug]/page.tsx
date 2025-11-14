import { ButtonDraw } from "@/app/components/ButtonDraw";
import { ClientOnly } from "@/app/components/ClientOnly";
import { RoomInformation } from "@/app/components/RoomInformation";
import { AddParticipantForm } from "../../components/AddParticipantForm";
import { ParticipantsCard } from "../../components/Participants";

export default async function newRoom() {
  return (
    <main className="w-full max-w-xl animate-fade-in flex flex-col gap-2">
      <RoomInformation />
      <AddParticipantForm />
      <ClientOnly>
        <ParticipantsCard />
      </ClientOnly>
      <ButtonDraw />
    </main>
  );
}
