"use client";
import Cookies from "js-cookie";
import { useState } from "react";
import { ClientOnly } from "../components/ClientOnly";
import { CreateRoom } from "../components/CreateRoom";
import { Button } from "../components/ui/Button";
import { ButtonArrowLeft } from "../components/ui/ButtonArrowLeft";
import { Card } from "../components/ui/Card";
import { Heading } from "../components/ui/Heading";
import { Input } from "../components/ui/Input";
import { Text } from "../components/ui/Text";
import { User } from "../interfaces/user";

export default function RoomPage() {
  const [step, setStep] = useState<"home" | "create" | "join">("home");
  const userLocal: User = JSON.parse(Cookies.get("userLocal") || "{}");

  const isUserValid = userLocal && userLocal.name;

  if (!isUserValid) {
    return null;
  }

  return (
    <ClientOnly>
      <Card className="flex flex-col w-full gap-2 max-w-xl animate-fade-in">
        {step !== "home" && (
          <ButtonArrowLeft
            description="Voltar"
            onClick={() => setStep("home")}
            className="mr-auto"
          />
        )}
        {step === "home" && (
          <>
            <div className="mb-4 text-center">
              <Heading size="sm">Seja bem vindo(a), {userLocal.name}!</Heading>
              <Text>escolha uma opção abaixo</Text>
            </div>

            <Button
              className="w-full"
              type="button"
              onClick={() => setStep("create")}
            >
              Criar Sorteio
            </Button>

            <Button
              variant="ghost"
              className="w-full"
              onClick={() => setStep("join")}
            >
              Entrar em uma sala
            </Button>
          </>
        )}

        {step === "create" && <CreateRoom />}
        {step === "join" && (
          <form>
            <Input type="text" placeholder="Digite o código da sala" required />
          </form>
        )}
      </Card>
    </ClientOnly>
  );
}
