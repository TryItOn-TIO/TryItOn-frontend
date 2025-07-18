/* 카테고리 상품 목록 표시 */

"use client";

import React, { useMemo, useState } from "react";
import CategoryProductList from "@/app/category/[id]/_components/CategoryProductList";
import CategoryFilter from "@/app/closet/_components/CategoryFilter";
import { child_category } from "@/constants/category";

type Props = {
  categoryId: number;
};

const CategoryClient = ({ categoryId }: Props) => {
  // const categories = ["전체", "긴소매 티셔츠", "반소매 티셔츠"];
  const [selectedCategory, setSelectedCategory] = useState("전체");

  const categories = useMemo(() => {
    const filteredChildCategories = child_category.filter(
      (item) => item.category_id === categoryId
    );

    const categoryNames = filteredChildCategories.map(
      (item) => item.categoryName
    );

    return ["전체", ...categoryNames];
  }, [categoryId]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-5">
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <CategoryProductList categoryId={categoryId} />
    </div>
  );
};

export default CategoryClient;
