"use client";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { toast } from "sonner";
import { LocalUser } from "../utils/localUser";
import { ClientOnly } from "./ClientOnly";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { Heading } from "./ui/Heading";
import { Input } from "./ui/Input";

export function InitialForm() {
  const router = useRouter();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = new FormData(e.currentTarget).get("name")?.toString().trim();

    if (!name) {
      toast("Por favor, insira um nome válido.");
      return;
    }
    new LocalUser(name);
    router.refresh();
  };

  return (
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
  );
}
