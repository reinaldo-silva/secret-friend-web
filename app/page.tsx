import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { InfoCard } from "./components/ui/InfoCard";
import { InitialForm } from "./initialForm";

export default async function Home() {
  const cookieStore = await cookies();
  const userLocal = cookieStore.get("userLocal")?.value;

  if (userLocal) {
    redirect("/room");
  }

  return (
    <main className="max-w-xl flex-1 flex flex-col items-center justify-center">
      <InitialForm />

      <InfoCard
        variant="primary"
        title="Atenção!"
        description="Essa aplicação é um MVP, portanto, os servidores podem ser reiniciados a qualquer momento, resultando na perda dos dados dos sorteios criados."
        className="mt-4"
      />
    </main>
  );
}
