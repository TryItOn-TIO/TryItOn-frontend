import StoryClient from "@/app/story/[id]/_components/StoryClient";
import { notFound } from "next/navigation";
import { dummyStories } from "@/mock/story";

// 정적으로 생성할 경로 지정
export async function generateStaticParams() {
  return Array.from({ length: 1000 }, (_, i) => ({ id: String(i + 1) })); // 범위 넓히기
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return (
    <div className="w-full">
      <StoryClient storyId={Number(id)} />
    </div>
  );
}
