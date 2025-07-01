// 카테고리별 상품 목업 데이터
export interface CategoryProduct {
  id: number;
  productName: string;
  img1: string;
  price: number;
  sale: number;
  liked: boolean;
  brand: string;
  wishlistCount: number;
  createdAt: string;
  categoryId: number;
  categoryName: string;
}

export interface CategoryProductResponse {
  products: {
    content: CategoryProduct[];
    number: number;
    totalPages: number;
    totalElements: number;
    size: number;
    first: boolean;
    last: boolean;
  };
}

// 카테고리별 상품 데이터
export const categoryProductsDummy: {
  [categoryId: number]: CategoryProductResponse[];
} = {
  // 카테고리 1: 상의
  1: [
    {
      products: {
        content: [
          {
            id: 101,
            productName: "오버핏 후드티",
            img1: "/images/dummy/ex10.png",
            price: 59000,
            sale: 5000,
            liked: false,
            brand: "유니클로",
            wishlistCount: 85,
            createdAt: "2025-06-30T10:51:53.469Z",
            categoryId: 1,
            categoryName: "상의",
          },
          {
            id: 102,
            productName: "베이직 크루넥 티셔츠",
            img1: "/images/dummy/ex10.png",
            price: 29000,
            sale: 0,
            liked: true,
            brand: "무지",
            wishlistCount: 142,
            createdAt: "2025-06-29T15:30:20.469Z",
            categoryId: 1,
            categoryName: "상의",
          },
          {
            id: 103,
            productName: "스트라이프 셔츠",
            img1: "/images/dummy/ex10.png",
            price: 79000,
            sale: 10000,
            liked: false,
            brand: "자라",
            wishlistCount: 67,
            createdAt: "2025-06-28T09:15:10.469Z",
            categoryId: 1,
            categoryName: "상의",
          },
          {
            id: 104,
            productName: "아디다스 트랙자켓",
            img1: "/images/dummy/ex10.png",
            price: 89000,
            sale: 15000,
            liked: true,
            brand: "아디다스",
            wishlistCount: 203,
            createdAt: "2025-06-27T14:22:35.469Z",
            categoryId: 1,
            categoryName: "상의",
          },
          {
            id: 105,
            productName: "나이키 드라이핏 티셔츠",
            img1: "/images/dummy/ex10.png",
            price: 45000,
            sale: 0,
            liked: false,
            brand: "나이키",
            wishlistCount: 156,
            createdAt: "2025-06-26T11:45:12.469Z",
            categoryId: 1,
            categoryName: "상의",
          },
          {
            id: 106,
            productName: "린넨 블렌드 셔츠",
            img1: "/images/dummy/ex10.png",
            price: 65000,
            sale: 8000,
            liked: true,
            brand: "COS",
            wishlistCount: 94,
            createdAt: "2025-06-25T16:30:45.469Z",
            categoryId: 1,
            categoryName: "상의",
          },
        ],
        number: 0,
        totalPages: 3,
        totalElements: 18,
        size: 6,
        first: true,
        last: false,
      },
    },
    // 두 번째 페이지
    {
      products: {
        content: [
          {
            id: 107,
            productName: "폴로 랄프로렌 폴로셔츠",
            img1: "/images/dummy/ex10.png",
            price: 120000,
            sale: 20000,
            liked: false,
            brand: "폴로 랄프로렌",
            wishlistCount: 78,
            createdAt: "2025-06-24T13:20:30.469Z",
            categoryId: 1,
            categoryName: "상의",
          },
          {
            id: 108,
            productName: "무지 맨투맨",
            img1: "/images/dummy/ex10.png",
            price: 39000,
            sale: 0,
            liked: true,
            brand: "무지",
            wishlistCount: 189,
            createdAt: "2025-06-23T10:15:25.469Z",
            categoryId: 1,
            categoryName: "상의",
          },
          {
            id: 109,
            productName: "무지 맨투맨",
            img1: "/images/dummy/ex10.png",
            price: 39000,
            sale: 0,
            liked: true,
            brand: "무지",
            wishlistCount: 189,
            createdAt: "2025-06-23T10:15:25.469Z",
            categoryId: 1,
            categoryName: "상의",
          },
        ],
        number: 1,
        totalPages: 3,
        totalElements: 18,
        size: 6,
        first: false,
        last: false,
      },
    },
  ],

  // 카테고리 2
  2: [
    {
      products: {
        content: [
          {
            id: 201,
            productName: "디키즈 워크팬츠",
            img1: "/images/dummy/ex10.png",
            price: 79000,
            sale: 0,
            liked: false,
            brand: "디키즈",
            wishlistCount: 120,
            createdAt: "2025-06-30T10:51:53.469Z",
            categoryId: 2,
            categoryName: "하의",
          },
          {
            id: 202,
            productName: "리바이스 501 진",
            img1: "/images/dummy/ex10.png",
            price: 129000,
            sale: 20000,
            liked: true,
            brand: "리바이스",
            wishlistCount: 245,
            createdAt: "2025-06-29T14:30:20.469Z",
            categoryId: 2,
            categoryName: "하의",
          },
          {
            id: 203,
            productName: "와이드 슬랙스",
            img1: "/images/dummy/ex10.png",
            price: 89000,
            sale: 15000,
            liked: false,
            brand: "유니클로",
            wishlistCount: 167,
            createdAt: "2025-06-28T09:15:10.469Z",
            categoryId: 2,
            categoryName: "하의",
          },
          {
            id: 204,
            productName: "카고 팬츠",
            img1: "/images/dummy/ex10.png",
            price: 69000,
            sale: 10000,
            liked: true,
            brand: "스톤아일랜드",
            wishlistCount: 98,
            createdAt: "2025-06-27T16:22:35.469Z",
            categoryId: 2,
            categoryName: "하의",
          },
          {
            id: 205,
            productName: "조거 팬츠",
            img1: "/images/dummy/ex10.png",
            price: 45000,
            sale: 0,
            liked: false,
            brand: "나이키",
            wishlistCount: 134,
            createdAt: "2025-06-26T11:45:12.469Z",
            categoryId: 2,
            categoryName: "하의",
          },
          {
            id: 206,
            productName: "치노 팬츠",
            img1: "/images/dummy/ex10.png",
            price: 59000,
            sale: 5000,
            liked: true,
            brand: "갭",
            wishlistCount: 76,
            createdAt: "2025-06-25T13:30:45.469Z",
            categoryId: 2,
            categoryName: "하의",
          },
        ],
        number: 0,
        totalPages: 2,
        totalElements: 12,
        size: 6,
        first: true,
        last: false,
      },
    },
  ],

  // 카테고리 3
  3: [
    {
      products: {
        content: [
          {
            id: 301,
            productName: "나이키 에어포스 1",
            img1: "/images/dummy/ex10.png",
            price: 139000,
            sale: 0,
            liked: true,
            brand: "나이키",
            wishlistCount: 312,
            createdAt: "2025-06-30T10:51:53.469Z",
            categoryId: 3,
            categoryName: "신발",
          },
          {
            id: 302,
            productName: "아디다스 스탠스미스",
            img1: "/images/dummy/ex10.png",
            price: 119000,
            sale: 20000,
            liked: false,
            brand: "아디다스",
            wishlistCount: 287,
            createdAt: "2025-06-29T14:30:20.469Z",
            categoryId: 3,
            categoryName: "신발",
          },
          {
            id: 303,
            productName: "컨버스 척테일러",
            img1: "/images/dummy/ex10.png",
            price: 79000,
            sale: 10000,
            liked: true,
            brand: "컨버스",
            wishlistCount: 198,
            createdAt: "2025-06-28T09:15:10.469Z",
            categoryId: 3,
            categoryName: "신발",
          },
          {
            id: 304,
            productName: "반스 올드스쿨",
            img1: "/images/dummy/ex10.png",
            price: 89000,
            sale: 0,
            liked: false,
            brand: "반스",
            wishlistCount: 156,
            createdAt: "2025-06-27T16:22:35.469Z",
            categoryId: 3,
            categoryName: "신발",
          },
          {
            id: 305,
            productName: "뉴발란스 990v5",
            img1: "/images/dummy/ex10.png",
            price: 259000,
            sale: 30000,
            liked: true,
            brand: "뉴발란스",
            wishlistCount: 234,
            createdAt: "2025-06-26T11:45:12.469Z",
            categoryId: 3,
            categoryName: "신발",
          },
          {
            id: 306,
            productName: "닥터마틴 1460",
            img1: "/images/dummy/ex10.png",
            price: 189000,
            sale: 25000,
            liked: false,
            brand: "닥터마틴",
            wishlistCount: 145,
            createdAt: "2025-06-25T13:30:45.469Z",
            categoryId: 3,
            categoryName: "신발",
          },
        ],
        number: 0,
        totalPages: 2,
        totalElements: 10,
        size: 6,
        first: true,
        last: false,
      },
    },
  ],

  // 카테고리 4
  4: [
    {
      products: {
        content: [
          {
            id: 401,
            productName: "레이밴 선글라스",
            img1: "/images/dummy/ex10.png",
            price: 189000,
            sale: 30000,
            liked: false,
            brand: "레이밴",
            wishlistCount: 167,
            createdAt: "2025-06-30T10:51:53.469Z",
            categoryId: 4,
            categoryName: "액세서리",
          },
          {
            id: 402,
            productName: "애플워치 스포츠밴드",
            img1: "/images/dummy/ex10.png",
            price: 65000,
            sale: 0,
            liked: true,
            brand: "애플",
            wishlistCount: 298,
            createdAt: "2025-06-29T14:30:20.469Z",
            categoryId: 4,
            categoryName: "액세서리",
          },
          {
            id: 403,
            productName: "가죽 벨트",
            img1: "/images/dummy/ex10.png",
            price: 89000,
            sale: 15000,
            liked: false,
            brand: "구찌",
            wishlistCount: 123,
            createdAt: "2025-06-28T09:15:10.469Z",
            categoryId: 4,
            categoryName: "액세서리",
          },
          {
            id: 404,
            productName: "버킷햇",
            img1: "/images/dummy/ex10.png",
            price: 35000,
            sale: 5000,
            liked: true,
            brand: "스투시",
            wishlistCount: 89,
            createdAt: "2025-06-27T16:22:35.469Z",
            categoryId: 4,
            categoryName: "액세서리",
          },
        ],
        number: 0,
        totalPages: 1,
        totalElements: 4,
        size: 6,
        first: true,
        last: true,
      },
    },
  ],
};

// 카테고리별 상품을 가져오는 함수
export const getCategoryProducts = (
  categoryId: number,
  page: number = 0
): CategoryProductResponse => {
  const categoryData = categoryProductsDummy[categoryId];

  if (!categoryData || !categoryData[page]) {
    // 데이터가 없으면 빈 응답 반환
    return {
      products: {
        content: [],
        number: page,
        totalPages: 0,
        totalElements: 0,
        size: 6,
        first: true,
        last: true,
      },
    };
  }

  return categoryData[page];
};
