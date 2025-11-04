import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ServerIsAlive } from "./components/ServerIsAlive";
import { WebSocketProvider } from "./contexts/WebsocketContext";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-100 min-h-screen`}
      >
        <WebSocketProvider>
          <ServerIsAlive />
          <div className="max-w-4xl mx-auto">{children}</div>
        </WebSocketProvider>
      </body>
    </html>
  );
}
