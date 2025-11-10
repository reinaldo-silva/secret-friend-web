export default async function newRoom({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main>
      <h1 className="text-2xl font-semibold mb-4">Sala: {slug}</h1>
    </main>
  );
}
