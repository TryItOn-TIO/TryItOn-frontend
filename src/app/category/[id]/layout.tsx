import Providers from "@/app/category/[id]/providers";

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Providers>{children}</Providers>;
}
