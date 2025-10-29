"use client";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 className="text-2xl font-semibold mb-4">Sorteio — Amigo Secreto</h1>
      <Link href="/room" className="btn">
        Ir para Salas de Sorteio
      </Link>
    </main>
  );
}
