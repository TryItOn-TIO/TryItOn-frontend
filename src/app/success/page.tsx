'use client';
import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { confirmPaymentApi } from "@/api/payment";
import { PaymentConfirmResponseDto } from "@/types/payment";

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [result, setResult] = useState<PaymentConfirmResponseDto | null>(null);

  useEffect(() => {
    const paymentKey = searchParams.get("paymentKey");
    const orderId = searchParams.get("orderId");
    const amount = searchParams.get("amount");
    
    console.log("Success page params:", { paymentKey, orderId, amount }); // 디버깅용
    
    if (paymentKey && orderId && amount) {
      confirmPaymentApi({ 
        paymentKey, 
        orderId: orderId, // 문자열 그대로 전달
        amount: Number(amount) 
      })
        .then(setResult)
        .catch(err => {
          console.error("Payment confirmation error:", err);
          router.push(`/fail?message=${err.response?.data?.message || '알 수 없는 오류'}`);
        });
    }
  }, [router, searchParams]);

  return (
    <div className="wrapper">
      <div className="box_section">
        <h2>결제 성공</h2>
        {result ? <>
          <p>{`주문번호: ${result.orderId}`}</p>
          <p>{`결제 금액: ${Number(result.totalAmount).toLocaleString()}원`}</p>
        </> : <p>승인 처리 중...</p>}
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (<Suspense fallback={<div>Loading...</div>}><SuccessContent /></Suspense>);
}
