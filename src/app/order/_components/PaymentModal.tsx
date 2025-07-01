"use client";

import { X } from "lucide-react";
import PaymentInfo from "./PaymentInfo";
import CouponSection from "./CouponSection";
import { usePaymentWidgets } from "./usePaymentWidgets";
import { useOrderCreation } from "./useOrderCreation";

type PaymentModalProps ={
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  orderName: string;
}

export default function PaymentModal({ isOpen, onClose, amount, orderName }: PaymentModalProps) {
  const { ready, widgets, paymentAmount, updateAmount } = usePaymentWidgets(isOpen, amount);
  const { createOrder } = useOrderCreation();

  const handleCouponChange = async (isChecked: boolean) => {
    await updateAmount({
      currency: paymentAmount.currency,
      value: isChecked ? paymentAmount.value - 5000 : paymentAmount.value + 5000,
    });
  };

  const handlePayment = async () => {
    if (!widgets) return;

    try {
      // 주문 생성
      const order = await createOrder(orderName, paymentAmount.value);
      
      console.log("결제 요청 데이터:", {
        orderId: order.orderId,
        orderName: order.orderName,
        amount: order.amount,
      });

      // 토스페이먼츠 결제 요청
      await widgets.requestPayment({
        orderId: order.orderId,
        orderName: order.orderName,
        successUrl: window.location.origin + "/success",
        failUrl: window.location.origin + "/fail",
        customerEmail: "customer@example.com",
        customerName: "고객",
        customerMobilePhone: "01012345678",
      });
    } catch {
      console.log("결제 오류");
      alert('결제 요청 중 오류가 발생했습니다:');
    }
    // } catch (error) {
    //   console.error("결제 오류:", error);
    //   alert(`결제 요청 중 오류가 발생했습니다: ${error.message || error}`);
    // }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 오버레이 */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* 모달 컨텐츠 */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-black">결제하기</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* 결제 내용 */}
        <div className="p-6">
          {/* 주문 정보 */}
          <PaymentInfo orderName={orderName} amount={paymentAmount.value} />

          {/* 결제 UI */}
          <div id="payment-method" className="mb-4" />
          
          {/* 이용약관 UI */}
          <div id="agreement" className="mb-4" />

          {/* 쿠폰 적용 */}
          <CouponSection ready={ready} onCouponChange={handleCouponChange} />

          {/* 결제하기 버튼 */}
          <button
            className="w-full bg-black text-white py-4 rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!ready}
            onClick={handlePayment}
          >
            {paymentAmount.value.toLocaleString()}원 결제하기
          </button>
        </div>
      </div>
    </div>
  );
}
