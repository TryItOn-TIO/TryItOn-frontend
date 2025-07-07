"use client";

import ProductCard from "@/components/common/ProductCard";
import type { ProductResponse } from "@/types/product";

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  products: ProductResponse[];
}

export default function ProductSection({
  title,
  subtitle,
  products,
}: ProductSectionProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
            {subtitle && <p className="text-gray-600">{subtitle}</p>}
          </div>
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-gray-50 cursor-pointer">
            전체보기
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
