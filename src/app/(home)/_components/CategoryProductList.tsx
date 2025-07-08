import React from "react";
import ProductCard from "@/components/common/ProductCard";

type CategoryProductListProps = {
  categories: Array<{
    categoryId: number;
    categoryName: string;
    products: any[];
  }>;
};

const CategoryProductList = ({ categories }: CategoryProductListProps) => {
  console.log("카테고리별 상품 표시:", categories.length, "개 카테고리");

  return (
    <div className="space-y-12 py-8 px-4">
      {categories.map((category) => (
        <section key={category.categoryId}>
          <h3 className="text-xl font-semibold mb-4 text-black">
            {category.categoryName}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-6">
            {(category.products || []).slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default CategoryProductList;
