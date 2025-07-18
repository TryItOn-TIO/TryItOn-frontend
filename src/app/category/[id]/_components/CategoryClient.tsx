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
  // 선택된 카테고리 상태 관리
  const [selectedCategory, setSelectedCategory] = useState("전체");

  // 선택된 카테고리명 매핑
  const categories = useMemo(() => {
    const filteredChildCategories = child_category.filter(
      (item) => item.category_id === categoryId
    );

    const categoryNames = filteredChildCategories.map(
      (item) => item.categoryName
    );

    return ["전체", ...categoryNames];
  }, [categoryId]);

  // 카테고리 id 반환
  const productCategoryId = useMemo(() => {
    if (selectedCategory === "전체") {
      return categoryId;
    } else {
      const foundCategory = child_category.find(
        (item) =>
          item.categoryName === selectedCategory &&
          item.category_id === categoryId
      );
      return foundCategory ? foundCategory.id : categoryId;
    }
  }, [selectedCategory, categoryId]);

  // 하위 카테고리 핸들러
  const handleCategoryChange = (category: string) => {
    console.log(productCategoryId);

    setSelectedCategory(category);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-5">
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <CategoryProductList categoryId={productCategoryId} />
    </div>
  );
};

export default CategoryClient;
