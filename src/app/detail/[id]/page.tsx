import DetailClient from "@/app/detail/[id]/_components/DetailClient";

type Params = {
  params: Promise<{ id: string }>;
};

const Detail = async ({ params }: Params) => {
  const { id } = await params;

  return (
    <div className="w-full">
      <DetailClient productId={Number(id)} />
    </div>
  );
};

export default Detail;
