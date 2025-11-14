import { GetRoom } from "@/app/components/GetRoom";

export default async function LayoutRoomBySlug({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <>
      <GetRoom slug={slug} />
      {children}
    </>
  );
}
