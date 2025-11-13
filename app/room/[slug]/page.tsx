import { ClientOnly } from "@/app/components/ClientOnly";
import { AddParticipantForm } from "../../components/AddParticipantForm";
import { ParticipantsCard } from "../../components/Participants";

export default async function newRoom({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main className="w-full max-w-xl animate-fade-in flex flex-col gap-2">
      <AddParticipantForm />
      <ClientOnly>
        <ParticipantsCard slug={slug} />
      </ClientOnly>
    </main>
  );
}
