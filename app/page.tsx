"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect } from "react";
import { ClientOnly } from "./components/ClientOnly";
import { Button } from "./components/ui/Button";
import { Card } from "./components/ui/Card";
import { Heading } from "./components/ui/Heading";
import { InfoCard } from "./components/ui/InfoCard";
import { Input } from "./components/ui/Input";
import { LocalStorage } from "./utils/localstorage";
import { LocalUser } from "./utils/localUser";

const localStorage = new LocalStorage();

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.get<string>("localUser");

    if (storedUser) {
      router.push("/room");
    }
  }, [router]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = new FormData(e.currentTarget).get("name")?.toString().trim();

    if (!name) {
      alert("Por favor, insira um nome válido.");
      return;
    }
    const newUser = new LocalUser(localStorage, name);
    localStorage.set("localUser", JSON.stringify(newUser.user));
    router.push("/room");
  };

  return (
    <main className="max-w-xl flex-1 flex flex-col items-center justify-center">
      <ClientOnly>
        <Card className="gap-2 flex flex-col w-full animate-fade-in">
          <Heading size="sm" className="text-center">
            Informe seu nome para iniciarmos
          </Heading>
          <form onSubmit={handleSubmit}>
            <Input
              label="Nome"
              type="text"
              name="name"
              placeholder="Exemplo: João"
              className="w-full"
            />
            <Button type="submit" className="w-full mt-2">
              Continuar!
            </Button>
          </form>
        </Card>
      </ClientOnly>

      <InfoCard
        variant="primary"
        title="Atenção!"
        description="Essa aplicação é um MVP, portanto, os servidores podem ser reiniciados a qualquer momento, resultando na perda dos dados dos sorteios criados."
        className="mt-4"
      />
    </main>
  );
}
