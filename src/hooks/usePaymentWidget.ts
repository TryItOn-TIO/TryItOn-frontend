'use client';
import { useEffect, useState } from 'react';
import { TossPaymentWidget } from '@/types/payment';

declare global {
  interface Window {
    PaymentWidget: (clientKey: string, customerKey: string) => Promise<TossPaymentWidget>;
  }
}
// ★★★ [오류 수정] SDK URL 마지막에 .js를 추가했습니다. ★★★
const TOSS_SDK_URL = "https://js.tosspayments.com/v2/payment-widget.js";

export function usePaymentWidget(clientKey: string, customerKey: string) {
  const [paymentWidget, setPaymentWidget] = useState<TossPaymentWidget | null>(null);

  useEffect(() => {
    const scriptId = "toss-payment-sdk";
    // 이미 스크립트가 로드되어 있는지 확인
    if (document.getElementById(scriptId)) {
        return;
    }

    // 스크립트가 없다면 새로 생성하고 추가
    const script = document.createElement("script");
    script.src = TOSS_SDK_URL;
    script.id = scriptId;
    script.async = true;

    script.onload = () => {
      if (window.PaymentWidget) {
        console.log("SDK 로드 성공, 위젯 초기화를 시도합니다.");
        window.PaymentWidget(clientKey, customerKey).then(setPaymentWidget);
      }
    };
    
    script.onerror = (error) => {
      console.error("토스 결제 위젯 SDK 로딩에 실패했습니다. URL을 확인해주세요.", error);
    };

    document.head.appendChild(script);
  }, [clientKey, customerKey]);

  return paymentWidget;
}
