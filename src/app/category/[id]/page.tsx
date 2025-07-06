import AvatarLayout from "@/components/layout/AvatarProducts";
import CategoryClient from "@/app/category/[id]/_components/CategoryClient";
import CategoryAvatarClient from "@/app/category/[id]/_components/CategoryAvatarClient";

type Props = {
  params: Promise<{ id: string }>; // Promise 타입으로 변경
};

export async function generateStaticParams() {
  return [
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
    { id: "6" },
  ];
}

const CategoryPage = async ({ params }: Props) => {
  // async 추가
  const resolvedParams = await params; // await 추가
  const categoryId = Number(resolvedParams.id);

  return (
    <AvatarLayout
      avatarSlot={<CategoryAvatarClient />}
      productSlot={<CategoryClient categoryId={categoryId} />}
    />
  );
};

export default CategoryPage;
