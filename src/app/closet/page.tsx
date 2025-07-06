import React from "react";

const Closet = () => {
  return (
    <div>
      <div>Closet 페이지 입니다</div>
    </div>
  );
};

export default Closet;

// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import AvatarLayout from "@/components/layout/AvatarProducts";
// import AvatarWearInfo from "@/components/common/AvatarWearInfo";
// import ProductCard from "@/components/common/ProductCard";
// import { useAuthGuard } from "@/hooks/useAuthGuard";
// import type { ProductResponse } from "@/types/product";
// import type { AvatarProductInfo } from "@/types/avatar";

// // 확장된 아바타 타입 정의
// type ExtendedAvatarInfo = AvatarProductInfo & {
//   createdAt: string;
// };

// // 더미 데이터 - 카트 페이지 패턴 따라서
// const closetDummyData = {
//   // 현재 아바타 정보
//   latestAvatar: {
//     avatarImg: "/images/dummy/ex10.png",
//     productNames: ["플리츠 스커트 슬림 베스트 원피스", "SQUARE BAG MINI_BLACK", "척테일러 올스타 캔버스 블랙"],
//     avatarId: 1,
//     bookmarked: false,
//     createdAt: "2025-07-05T10:00:00Z"
//   } as ExtendedAvatarInfo,

//   // 저장된 착장들 (북마크된 아바타들)
//   bookmarkedAvatars: [
//     {
//       avatarImg: "/images/dummy/ex10.png",
//       productNames: ["머슬핏 티셔츠 화이트", "스탠다드핏 슬랙스"],
//       avatarId: 2,
//       bookmarked: true,
//       createdAt: "2025-07-04T10:00:00Z"
//     },
//     {
//       avatarImg: "/images/dummy/ex10.png",
//       productNames: ["유니버시티 화이트", "루즈핏 워크팬츠"],
//       avatarId: 3,
//       bookmarked: true,
//       createdAt: "2025-07-03T10:00:00Z"
//     },
//     {
//       avatarImg: "/images/dummy/ex10.png",
//       productNames: ["세미핏 카라 니트", "플리츠 스커트"],
//       avatarId: 4,
//       bookmarked: true,
//       createdAt: "2025-07-02T10:00:00Z"
//     },
//   ] as ExtendedAvatarInfo[],

//   // 찜 목록
//   wishlistProducts: [
//     {
//       id: 1,
//       productName: "데일리 쿨 하프 니트",
//       brand: "메이커",
//       price: 25000,
//       sale: 25000,
//       img1: "/images/dummy/ex10.png",
//       liked: true,
//       wishlistCount: 120,
//       createdAt: "2025-06-30T10:51:53.469Z",
//       categoryId: 1,
//       categoryName: "상의",
//     },
//     {
//       id: 2,
//       productName: "더블니 루즈핏 워크팬츠 2종",
//       brand: "메이커",
//       price: 39500,
//       sale: 39500,
//       img1: "/images/dummy/ex10.png",
//       liked: true,
//       wishlistCount: 80,
//       createdAt: "2025-06-30T10:51:53.469Z",
//       categoryId: 2,
//       categoryName: "하의",
//     },
//     {
//       id: 3,
//       productName: "오버핏 크루넥 유니버시티",
//       brand: "메이커",
//       price: 13100,
//       sale: 13100,
//       img1: "/images/dummy/ex10.png",
//       liked: true,
//       wishlistCount: 50,
//       createdAt: "2025-06-30T10:51:53.469Z",
//       categoryId: 1,
//       categoryName: "상의",
//     },
//     {
//       id: 4,
//       productName: "린넨라이크 반팔 니트 시리즈",
//       brand: "메이커",
//       price: 29900,
//       sale: 29900,
//       img1: "/images/dummy/ex10.png",
//       liked: true,
//       wishlistCount: 90,
//       createdAt: "2025-06-30T10:51:53.469Z",
//       categoryId: 1,
//       categoryName: "상의",
//     },
//     {
//       id: 5,
//       productName: "Double Knee Bermuda Pants",
//       brand: "메이커",
//       price: 87200,
//       sale: 87200,
//       img1: "/images/dummy/ex10.png",
//       liked: true,
//       wishlistCount: 60,
//       createdAt: "2025-06-30T10:51:53.469Z",
//       categoryId: 2,
//       categoryName: "하의",
//     },
//     {
//       id: 6,
//       productName: "플리츠 스커트 슬림 베스트 원피스",
//       brand: "메이커",
//       price: 45000,
//       sale: 45000,
//       img1: "/images/dummy/ex10.png",
//       liked: true,
//       wishlistCount: 75,
//       createdAt: "2025-06-29T10:51:53.469Z",
//       categoryId: 3,
//       categoryName: "원피스",
//     },
//   ] as ProductResponse[],
// };

// const categories = ["전체", "상의", "아우터", "바지", "원피스", "스커트", "슈즈"];

// export default function ClosetPage() {
//   useAuthGuard(); // 카트 페이지처럼 인증 가드 사용

//   const [selectedCategory, setSelectedCategory] = useState("전체");
//   const [bookmarkedAvatars, setBookmarkedAvatars] = useState(closetDummyData.bookmarkedAvatars);

//   // 카테고리 필터링
//   const filteredProducts = selectedCategory === "전체"
//     ? closetDummyData.wishlistProducts
//     : closetDummyData.wishlistProducts.filter(product => product.categoryName === selectedCategory);

//   // 날짜 포맷팅 함수 (Hydration 문제 방지)
//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     return `${year}.${month}.${day}`;
//   };

//   // 북마크 토글 핸들러 (카트 페이지의 상태 관리 패턴 따라서)
//   const handleBookmarkToggle = (avatarId: number) => {
//     setBookmarkedAvatars(prev =>
//       prev.map(avatar =>
//         avatar.avatarId === avatarId
//           ? { ...avatar, bookmarked: !avatar.bookmarked }
//           : avatar
//       )
//     );
//   };

//   // 아바타 섹션 (왼쪽 20%)
//   const AvatarSection = () => (
//     <div className="w-full h-full">
//       {closetDummyData.latestAvatar ? (
//         <AvatarWearInfo avatarInfo={closetDummyData.latestAvatar} />
//       ) : (
//         <div className="text-center py-8 text-gray-500">
//           최근 착장이 없습니다.
//         </div>
//       )}

//       {/* 착장 관리 버튼들 */}
//       <div className="mt-4 space-y-2 px-4">
//         <button className="w-full px-4 py-2 text-sm bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
//           새 착장 만들기
//         </button>
//         <button className="w-full px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
//           현재 착장 저장
//         </button>
//       </div>
//     </div>
//   );

//   // 저장된 착장 카드 컴포넌트
//   const SavedOutfitCard = ({ outfit }: { outfit: ExtendedAvatarInfo }) => (
//     <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
//       <div className="aspect-[3/4] relative bg-gray-100">
//         <Image
//           src={outfit.avatarImg || "/images/dummy/ex10.png"}
//           alt="저장된 착장"
//           fill
//           className="object-cover"
//         />
//         {/* 북마크 아이콘 */}
//         <button
//           onClick={() => handleBookmarkToggle(outfit.avatarId)}
//           className="absolute top-2 right-2"
//         >
//           <Image
//             src={outfit.bookmarked ? "/images/common/bookmark_filled.svg" : "/images/common/bookmark.svg"}
//             width={20}
//             height={20}
//             alt="북마크"
//           />
//         </button>
//       </div>
//       <div className="p-3">
//         <h4 className="font-medium text-sm mb-1">저장된 착장</h4>
//         <div className="text-xs text-gray-500 mb-2">{formatDate(outfit.createdAt)}</div>
//         <div className="space-y-1">
//           {outfit.productNames.slice(0, 2).map((name, idx) => (
//             <div key={idx} className="text-xs text-gray-600 truncate">• {name}</div>
//           ))}
//           {outfit.productNames.length > 2 && (
//             <div className="text-xs text-gray-400">+{outfit.productNames.length - 2}개 더</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );

//   // 상품 섹션 (오른쪽 80%) - 세로로 저장된 착장 + 찜목록
//   const ProductSection = () => (
//     <div className="w-full space-y-8 px-4 py-8">
//       {/* 저장된 착장 섹션 (상단) */}
//       <div>
//         <h2 className="text-xl font-semibold mb-4">저장한 착장</h2>
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {bookmarkedAvatars.map((outfit) => (
//             <SavedOutfitCard key={outfit.avatarId} outfit={outfit} />
//           ))}
//         </div>
//         {bookmarkedAvatars.length === 0 && (
//           <div className="text-center py-8 text-gray-500">
//             저장된 착장이 없습니다.
//           </div>
//         )}
//       </div>

//       {/* 찜 목록 섹션 (하단) */}
//       <div>
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-xl font-semibold">찜 목록</h2>
//           {/* 카테고리 필터 */}
//           <div className="flex gap-2">
//             {categories.map((category) => (
//               <button
//                 key={category}
//                 onClick={() => setSelectedCategory(category)}
//                 className={`px-3 py-1 text-sm rounded-full transition-colors ${
//                   selectedCategory === category
//                     ? "bg-black text-white"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//               >
//                 {category}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* 상품 그리드 */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {filteredProducts.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>

//         {filteredProducts.length === 0 && (
//           <div className="text-center py-8 text-gray-500">
//             {selectedCategory === "전체" ? "찜한 상품이 없습니다." : `${selectedCategory} 카테고리에 찜한 상품이 없습니다.`}
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <AvatarLayout
//       avatarSlot={<AvatarSection />}
//       productSlot={<ProductSection />}
//     />
//   );
// }
