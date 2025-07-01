import AvatarLayout from "@/components/layout/AvatarProducts";
import { mainProductsDummy } from "@/mock/mainProducts";
import AvatarProducts from "./_components/AvatarProducts";
import MainProductList from "./_components/MainProductList";

export default function Home() {
  const { recommended, ranked, avatarInfo } = mainProductsDummy;

  return (
    <AvatarLayout
      avatarSlot={<AvatarProducts avatarInfo={avatarInfo} />}
      productSlot={
        <MainProductList recommended={recommended} ranked={ranked} />
      }
    />
  );
}
