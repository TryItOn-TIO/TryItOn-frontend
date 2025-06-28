"use client";

import { CATEGORY, CATEGORY_LABELS } from "@/constants/category";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const CategoryHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentId = Number(pathname.split("/").pop());

  return (
    <div className="w-full bg-black px-5 py-2 text-white font-light text-[0.9rem] flex items-center gap-5">
      {Object.values(CATEGORY)
        .filter((v) => typeof v === "number")
        .map((categoryId) => (
          <div
            key={categoryId}
            className={`cursor-pointer ${
              currentId === categoryId ? "font-semibold border-b-2" : ""
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
  );
};

export default CategoryHeader;
