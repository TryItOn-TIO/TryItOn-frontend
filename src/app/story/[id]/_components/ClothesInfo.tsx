import ProductActionCard from "@/components/ui/ProductActionCard";
import React from "react";
import { ProductResponse } from "@/types/product";

type ClothesInfoProps = {
  data: ProductResponse[];
};

const ClothesInfo = ({ data }: ClothesInfoProps) => {
  return (
    <div className="w-full max-w-[500px] space-y-14">
      {data.map((product) => (
        <ProductActionCard key={product.id} data={product} />
      ))}
    </div>
  );
};

export default ClothesInfo;
