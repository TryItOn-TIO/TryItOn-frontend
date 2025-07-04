"use client";

import React from "react";
import CategoryProductList from "@/app/category/[id]/_components/CategoryProductList";

type Props = {
  categoryId: number;
};

const CategoryClient = ({ categoryId }: Props) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <CategoryProductList categoryId={categoryId} />
    </div>
  );
};

export default CategoryClient;
