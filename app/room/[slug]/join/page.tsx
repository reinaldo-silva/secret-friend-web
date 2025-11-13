import { ClientOnly } from "@/app/components/ClientOnly";
import { ParticipantsCard } from "@/app/components/Participants";

export default async function JoinPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <main className="w-full max-w-xl animate-fade-in flex flex-col gap-2">
      <ClientOnly>
        <ParticipantsCard slug={slug} />
      </ClientOnly>
    </main>
  );
}
