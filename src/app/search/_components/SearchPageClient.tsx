"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchSearchResults } from "@/api/search";
import SearchResults from "@/app/search/_components/SearchResults";
import type { SearchProductResponse } from "@/types/product";

export default function SearchPageClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const [results, setResults] = useState<SearchProductResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) return;

    const fetch = async () => {
      setLoading(true);
      const res = await fetchSearchResults(query);
      setResults(res);
      setLoading(false);
    };

    fetch();
  }, [query]);

  return (
    <main className="max-w-6xl mx-auto p-4">
      <h2 className="text-lg font-semibold mb-4">"{query}" 검색 결과</h2>
      {loading && <p>검색 중입니다...</p>}
      {results && (
        <SearchResults
          products={results.products}
          totalCount={results.totalCount}
        />
      )}
    </main>
  );
}
