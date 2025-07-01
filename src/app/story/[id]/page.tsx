import StoryClient from "@/app/story/[id]/_components/StoryClient";
import { notFound } from "next/navigation";
import { getStories } from "@/api/story";
import { dummyStories } from "@/mock/story";

// 정적으로 생성할 경로 지정
export async function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }];
}

// 정적 페이지에 필요한 데이터 요청
export default async function Page({ params }: { params: { id: string } }) {
  const id = Number(params.id);

  try {
    const stories = dummyStories; // 실제 API 요청
    // const stories = await getStories(); // 실제 API 요청
    return (
      <div className="w-full">
        <StoryClient storyId={id} initialData={stories} />
      </div>
    );
  } catch (error) {
    // 상품이 없는 경우 404 페이지로 이동
    return notFound();
  }
}
