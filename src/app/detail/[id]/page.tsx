type Params = {
  params: Promise<{ id: string }>;
};

const Detail = async ({ params }: Params) => {
  const { id } = await params;

  return (
      <div className="w-full bg-gray-50">
      </div>
  );
};

export default Detail;
