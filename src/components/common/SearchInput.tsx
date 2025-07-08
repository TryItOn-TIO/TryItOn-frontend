"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";
import { fetchSearchSuggestions } from "@/api/search";
import Image from "next/image";

export default function SearchInput() {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const debounced = useDebounce(inputValue, 300);
  const router = useRouter();

  useEffect(() => {
    if (!debounced.trim()) {
      setSuggestions([]);
      return;
    }

    const fetch = async () => {
      const data = await fetchSearchSuggestions(debounced);
      setSuggestions(data);
    };

    fetch();
  }, [debounced]);

  const handleSearch = (keyword: string) => {
    if (!keyword.trim()) return;
    router.push(`/search?query=${encodeURIComponent(keyword)}`);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(inputValue);
    }
  };

  return (
    <div className="relative w-full h-10">
      <input
        type="text"
        value={inputValue}
        placeholder="검색어를 입력하세요"
        onChange={(e) => {
          setInputValue(e.target.value);
          setShowSuggestions(true);
        }}
        onKeyDown={handleKeyDown}
        className="w-full placeholder:text-slate-400 bg-[#f2f2f2] text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
      />
      <button
        className="absolute right-3 top-1.5"
        onClick={() => handleSearch(inputValue)}
      >
        <Image
          src="/images/common/search.svg"
          width={25}
          height={25}
          alt="검색"
        />
      </button>

      {showSuggestions && (
        <ul className="absolute z-10 mt-2 w-full bg-white border rounded shadow max-h-60 overflow-y-auto">
          {suggestions.length > 0 ? (
            suggestions.map((s, idx) => (
              <li
                key={idx}
                onClick={() => handleSearch(s)}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              >
                {s}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">검색 결과가 없습니다.</li>
          )}
        </ul>
      )}
    </div>
  );
}
