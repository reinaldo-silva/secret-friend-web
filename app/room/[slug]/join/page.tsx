import { ButtonResult } from "@/app/components/ButtonResult";
import { ClientOnly } from "@/app/components/ClientOnly";
import { ParticipantsCard } from "@/app/components/Participants";
import { RoomInformation } from "@/app/components/RoomInformation";

export default async function JoinPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <main className="w-full max-w-xl animate-fade-in flex flex-col gap-2">
      <RoomInformation />
      <ClientOnly>
        <ParticipantsCard />
      </ClientOnly>
      <ButtonResult slug={slug} />
    </main>
  );
}
