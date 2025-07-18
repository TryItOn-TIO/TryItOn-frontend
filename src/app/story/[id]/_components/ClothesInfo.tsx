import ProductActionCard from "@/components/ui/ProductActionCard";
import type { ProductResponse } from "@/types/product";

type ClothesInfoProps = {
  data: ProductResponse[];
};

const ClothesInfo = ({ data }: ClothesInfoProps) => {
  return (
    <div className="w-full max-w-sm md:max-w-md space-y-6 animate-fadeIn py-4">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">착장 정보</h2>
        <p className="text-sm text-gray-600">
          이 스토리에서 착용한 아이템들을 확인해보세요
        </p>
      </div>

      <div className="space-y-4 pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {data.map((product, index) => (
          <div
            key={product.id}
            className="transform transition-all duration-300 hover:scale-101"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <ProductActionCard data={product} />
          </div>
        ))}
      </div>

      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p className="text-lg">🤷‍♀️</p>
          <p className="text-sm mt-2">착장 정보가 없습니다</p>
        </div>
      )}
    </div>
  );
};

export default ClothesInfo;
