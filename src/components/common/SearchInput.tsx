"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";
import { fetchSearchSuggestions } from "@/api/search";
import Image from "next/image";

export default function SearchInput() {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1); // -1은 아무것도 선택 안함
  /* 현재 값이 입력이 완료된 상태인지 아닌지를 나타내주는 속성 */
  const [isComposing, setIsComposing] = useState(false);

  const debounced = useDebounce(inputValue, 300);
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

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

  /* 외부 클릭 시 자동완성 창 닫기 */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (keyword: string) => {
    if (!keyword.trim()) return;
    router.push(`/search?query=${encodeURIComponent(keyword)}`);
    setShowSuggestions(false);
    setInputValue(""); // (검색 실행 후) 입력창 초기화
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isComposing) {
      handleSearch(e.currentTarget.value); // 사용자가 입력한 최신 값을 그대로 검색에 넘겨줌
    }
  };

  return (
    <div className="relative w-full h-10" ref={wrapperRef}>
      <input
        type="text"
        value={inputValue}
        placeholder="검색어를 입력하세요"
        onChange={(e) => {
          setInputValue(e.target.value);
          setShowSuggestions(true);
        }}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={(e) => {
          setIsComposing(false);
          setInputValue(e.currentTarget.value); // 조합 끝난 후 값 다시 세팅
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
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`px-4 py-2 cursor-pointer ${
                  selectedIndex === idx
                    ? "bg-gray-100 font-medium"
                    : "hover:bg-gray-100"
                }`}
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
