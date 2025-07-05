import StoryClient from "@/app/story/[id]/_components/StoryClient";

export const dynamicParams = true;

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
