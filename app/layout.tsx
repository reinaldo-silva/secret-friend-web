import { Toaster } from "@/components/ui/sonner";
import { Gift } from "lucide-react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import { ClientOnly } from "./components/ClientOnly";
import { ExitButton } from "./components/ExitButton";
import { Heading } from "./components/ui/Heading";
import { Text } from "./components/ui/Text";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sorteio - Amigo Secreto",
  description: "Frontend para sorteio de amigo secreto",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const userLocal = cookieStore.has("userLocal");

  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-100 min-h-screen`}
      >
        <Toaster />
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
          {userLocal && (
            <ClientOnly
              fallback={
                <div className="fixed top-4 left-4 bg-zinc-200 w-14 h-[26px] animate-pulse rounded-sm" />
              }
            >
              <ExitButton />
            </ClientOnly>
          )}
          <header className="mb-12 text-center animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="size-12 rounded-xl flex items-center justify-center bg-gradient text-zinc-50">
                <Gift className="size-6" />
              </div>
              <Heading>Amigo Secreto</Heading>
            </div>
            <p className="text-lg">
              Crie seu sorteio de forma simples e divertida
            </p>
          </header>

          <main className="flex-1 flex justify-center items-center w-full">
            {children}
          </main>

          <footer className="mt-12 text-center text-sm animate-fade-in">
            <Text size="sm">
              Feito com ❤️ para tornar seu amigo secreto especial
            </Text>
          </footer>
        </div>
      </body>
    </html>
  );
}
