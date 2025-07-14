import { GoogleOAuthProvider } from "@react-oauth/google";
import type { Metadata } from "next";
import "@/styles/globals.css";
import Header from "@/components/layout/Header";
import ScrollToTop from "@/components/common/ScrollToTop";
import CategoryHeader from "@/components/layout/CategoryHeader";
import Providers from "@/app/providers";

export const metadata: Metadata = {
  title: "Try It On | 지금 바로 입어보세요!",
  description:
    "착장부터 결제까지, 가상 착장 서비스를 통해 쇼핑의 질이 높아지는 경험을 해 보세요!",
  icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
        >
          <Providers>
            {/* header 상단에 고정 */}
            <div className="fixed top-0 left-0 z-10">
              <Header />
              <CategoryHeader />
            </div>
            {/* layout을 제외한 컨텐츠 - header size: 15vh */}
            <div className="flex justify-center mt-[15vh]">
              <div className="flex justify-start w-full max-w-[1280px]">
                {children}
              </div>
            </div>
            <ScrollToTop />
            {/* 새로운 통합 헤더 */}
            <Header />

            {/* 고정된 헤더 높이만큼 상단 여백 추가 */}
            <main className="w-full pt-20 px-4 pb-8 max-w-screen-2xl mx-auto">
              {children}
            </main>

            {/* Scroll to Top 버튼 - 모든 페이지에서 사용 */}
            <ScrollToTop />
          </Providers>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
