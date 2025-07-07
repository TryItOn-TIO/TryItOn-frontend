import { GoogleOAuthProvider } from "@react-oauth/google";
import type { Metadata } from "next";
import "@/styles/globals.css";
import Header from "@/components/layout/Header";
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
            {/* 새로운 통합 헤더 */}
            <Header />
            
            {/* 메인 컨텐츠 - 전체 너비 사용 */}
            <main className="w-full">
              {children}
            </main>
          </Providers>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
