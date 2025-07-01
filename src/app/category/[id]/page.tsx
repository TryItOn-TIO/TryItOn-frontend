import AvatarLayout from "@/components/layout/AvatarProducts";
import { mainProductsDummy } from "@/mock/mainProducts";
import AvatarProducts from "@/app/(home)/_components/AvatarProducts";
import CategoryClient from "./_components/CategoryClient";

type Params = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }];
}

const Category = async ({ params }: Params) => {
  const { id } = await params;
  const categoryId = Number(id);

  // 메인과 동일한 아바타 정보 사용
  const { avatarInfo } = mainProductsDummy;

  return (
    <AvatarLayout
      avatarSlot={<AvatarProducts avatarInfo={avatarInfo} />}
      productSlot={<CategoryClient categoryId={categoryId} />}
    />
  );
};

export default Category;
