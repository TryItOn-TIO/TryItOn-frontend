import { useRouter } from "next/navigation";

type TagProps = {
  text: string;
};

const Tag = ({ text }: TagProps) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/search?query=${text}`)}
      className="text-xs bg-gray-100 p-2 rounded-md cursor-pointer"
    >
      #{text}
    </div>
  );
};

export default Tag;
