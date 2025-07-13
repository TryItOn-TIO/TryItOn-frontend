import { Suspense } from "react";
import SearchPageClient from "@/app/search/_components/SearchPageClient";

export default function SearchPage() {
  return (
    <Suspense fallback={<p>로딩 중...</p>}>
      <SearchPageClient />
    </Suspense>
  );
}
