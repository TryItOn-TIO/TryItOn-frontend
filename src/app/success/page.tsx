"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { confirmPaymentApi } from "@/api/payment";
import { PaymentConfirmResponseDto } from "@/types/payment";
import { Button } from "@/components/common/button";
import { Card, CardContent } from "@/components/common/card";
import { CheckCircle, Package, CreditCard, Calendar } from "lucide-react";

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [result, setResult] = useState<PaymentConfirmResponseDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const paymentKey = searchParams.get("paymentKey");
    const orderId = searchParams.get("orderId");
    const amount = searchParams.get("amount");

    console.log("Success page params:", { paymentKey, orderId, amount });

    // 토큰 상태 확인
    const token = localStorage.getItem("accessToken");
    console.log("Success page - 토큰 상태:", {
      hasToken: !!token,
      tokenLength: token?.length,
      tokenPreview: token?.substring(0, 20) + "...",
    });

    if (paymentKey && orderId && amount) {
      console.log("결제 승인 API 호출 시작...");

      confirmPaymentApi({
        paymentKey,
        orderId: orderId,
        amount: Number(amount),
      })
        .then((response) => {
          console.log("결제 승인 성공:", response);
          setResult(response);
          setIsLoading(false);

          // 결제 성공 후 주문 관련 localStorage 정리
          localStorage.removeItem("orderItems");
          console.log("주문 완료 - localStorage 정리됨");
        })
        .catch((err) => {
          console.error("Payment confirmation error:", err);
          console.error("Error details:", {
            status: err.response?.status,
            statusText: err.response?.statusText,
            data: err.response?.data,
          });

          // 401/403 에러가 아닌 경우에만 fail 페이지로 이동
          if (err.response?.status !== 401 && err.response?.status !== 403) {
            router.push(
              `/fail?message=${
                err.response?.data?.message || "알 수 없는 오류"
              }`
            );
          }
        });
    } else {
      setIsLoading(false);
    }
  }, [router, searchParams]);

  if (isLoading) {
    return (
      <div className="w-screen min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">결제 승인 처리 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* 성공 헤더 */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-black mb-2">
            주문이 완료되었습니다!
          </h1>
          <p className="text-gray-600">
            주문해 주셔서 감사합니다. 주문 내역을 확인해보세요.
          </p>
        </div>

        {result && (
          <div className="space-y-6">
            {/* 주문 정보 카드 */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Package className="w-5 h-5 text-black mr-2" />
                  <h2 className="text-lg font-semibold text-black">
                    주문 정보
                  </h2>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">주문번호</span>
                    <span className="font-medium text-black">
                      {result.orderId}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">주문일시</span>
                    <span className="font-medium text-black">
                      {new Date().toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 결제 정보 카드 */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <CreditCard className="w-5 h-5 text-black mr-2" />
                  <h2 className="text-lg font-semibold text-black">
                    결제 정보
                  </h2>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">결제 방법</span>
                    <span className="font-medium text-black">
                      {result.method === "CARD" ? "신용카드" : result.method}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">결제 금액</span>
                    <span className="font-bold text-xl text-black">
                      {Number(result.totalAmount).toLocaleString()}원
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">결제 상태</span>
                    <span className="font-medium text-green-600">
                      결제 완료
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 배송 안내 카드 */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Calendar className="w-5 h-5 text-black mr-2" />
                  <h2 className="text-lg font-semibold text-black">
                    배송 안내
                  </h2>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-800 font-medium mb-1">
                      배송 예정일
                    </p>
                    <p className="text-blue-700">
                      {new Date(
                        Date.now() + 2 * 24 * 60 * 60 * 1000
                      ).toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}{" "}
                      도착 예정
                    </p>
                  </div>
                  <p className="text-gray-600">
                    • 주문 확인 후 1-2일 내에 출고됩니다.
                  </p>
                  <p className="text-gray-600">
                    • 배송 상황은 마이페이지 &gt; 주문내역에서 확인하실 수
                    있습니다.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* 액션 버튼들 */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => router.push("/mypage/orders")}
                className="flex-1 bg-black text-white hover:bg-gray-800"
              >
                주문내역 확인
              </Button>
              <Button
                onClick={() => router.push("/")}
                variant="outline"
                className="flex-1 border-black text-black hover:bg-black hover:text-white"
              >
                쇼핑 계속하기
              </Button>
            </div>
          </div>
        )}

        {!result && (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-red-600 mb-4">
                주문 정보를 불러올 수 없습니다.
              </p>
              <Button
                onClick={() => router.push("/")}
                className="bg-black text-white hover:bg-gray-800"
              >
                홈으로 이동
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-lg text-gray-600">페이지를 불러오는 중...</div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
