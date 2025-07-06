"use client";

import { CATEGORY, CATEGORY_LABELS } from "@/constants/category";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const CategoryHeader = () => {
  const router = useRouter();
  const pathname = usePathname();

  // 카테고리 조건부 렌더링
  if (
    pathname == "/signin" ||
    pathname == "/signup" ||
    (pathname.includes("/story/") && pathname != "/story/create") // 스토리 상세 페이지
  ) {
    return;
  }

  return (
    <div className="w-screen h-[5vh] py-4 bg-black flex justify-center">
      <div className="w-full max-w-[1440px] bg-black text-white font-light text-[0.9rem] flex items-center gap-5 mx-10">
        {Object.values(CATEGORY)
          .filter((v) => typeof v == "number")
          .map((categoryId) => (
            <div
              key={categoryId}
              className={`cursor-pointer ${
                pathname == `/category/${categoryId}` ||
                (pathname == "/" && categoryId === 0)
                  ? "font-semibold border-b-2"
                  : ""
              }`}
              onClick={() =>
                categoryId == 0
                  ? router.push("/")
                  : router.push(`/category/${categoryId}`)
              }
            >
              {CATEGORY_LABELS[categoryId as CATEGORY]}
            </div>
          ))}
      </div>
    </div>
  );
};

export default CategoryHeader;
