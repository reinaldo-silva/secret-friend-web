"use client";
import { Gift, Shuffle } from "lucide-react";
import { Text } from "./components/ui/Text";
import { Heading } from "./components/ui/Heading";
import { Button } from "./components/ui/Button";
import { Input } from "./components/ui/Input";

export default function Home() {
  const step = "create";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <header className="mb-12 text-center animate-fade-in">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="size-12 rounded-xl flex items-center justify-center bg-gradient text-zinc-50">
            <Gift className="size-6" />
          </div>
          <Heading>Amigo Secreto</Heading>
        </div>
        {step === "create" && (
          <p className="text-lg">
            Crie seu sorteio de forma simples e divertida
          </p>
        )}
      </header>
      {/* <Link href="/room" className="btn">
        Ir para Salas de Sorteio
      </Link> */}

      <div className="gap-2 flex">
        <Button>
          <Shuffle className="size-4 mr-4" />

          <Text size="sm" className="font-semibold">
            Criar Novo Sorteio
          </Text>
        </Button>
        <Button variant="ghost">Criar Novo Sorteio</Button>
        <Button variant="outline">Criar Novo Sorteio</Button>
      </div>
      <Input label="Ola" />

      <main className="w-full flex-1 flex items-center justify-center"></main>

      <footer className="mt-12 text-center text-sm animate-fade-in">
        <Text size="sm">
          Feito com ❤️ para tornar seu amigo secreto especial
        </Text>
      </footer>
    </div>
  );
}
