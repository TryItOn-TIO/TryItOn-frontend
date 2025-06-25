import Link from "next/link";

export default function Home() {
  const pageInfo = [
    { route: "cart", name: "장바구니" },
    { route: "category", name: "카테고리별 상품" },
    { route: "closet", name: "옷장" },
    { route: "detail/1", name: "상품 상세" },
    { route: "mypage", name: "마이페이지" },
    { route: "pay", name: "결제" },
    { route: "signin", name: "로그인" },
    { route: "signup", name: "회원가입" },
    { route: "story", name: "스토리" },
    { route: "tryon-room", name: "친구와 함께 고르기" },
  ];

  return (
    <div>
      <h1>Home 페이지 입니다</h1>
      <ul>
        {pageInfo.map(({ route, name }) => (
          <li key={route} className="text-pink-600 underline">
            <Link href={`/${route}`}>{name} 페이지</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
