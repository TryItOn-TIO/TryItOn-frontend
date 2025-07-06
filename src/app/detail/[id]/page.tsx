import DetailClient from "@/app/detail/[id]/_components/DetailClient";

export const dynamicParams = true;

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return (
    <div className="w-full">
      <DetailClient productId={Number(id)} />
    </div>
  );
}
