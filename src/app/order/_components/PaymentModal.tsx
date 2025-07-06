"use client";

import { X } from "lucide-react";
import PaymentInfo from "./PaymentInfo";
import CouponSection from "./CouponSection";
import { usePaymentWidgets } from "./usePaymentWidgets";
import { useOrderCreation } from "./useOrderCreation";
import { useState, useEffect } from "react";
import { mypageApi } from "@/api/mypage";
import { UserProfile, Address } from "@/types/mypage";

type OrderItem = {
  id: string
  name: string
  size: string
  quantity: number
  originalPrice: number
  salePrice: number
  image: string
  category?: string
}

type PaymentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  orderName: string;
  orderItems: OrderItem[];
  addressId?: number;
}

export default function PaymentModal({ isOpen, onClose, amount, orderName, orderItems, addressId }: PaymentModalProps) {
  const { ready, widgets, paymentAmount, updateAmount } = usePaymentWidgets(isOpen, amount);
  const { createOrder } = useOrderCreation();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  // 사용자 정보 로드
  useEffect(() => {
    if (isOpen) {
      console.log('PaymentModal 열림 - 초기 상태:', { addressId, userProfile, selectedAddress });
      
      const loadUserData = async () => {
        try {
          // 사용자 프로필이 없는 경우에만 로드
          if (!userProfile) {
            console.log('사용자 프로필 로드 시작');
            const profile = await mypageApi.getProfile();
            setUserProfile(profile);
            console.log('사용자 프로필 로드 완료:', profile);
          }

          // 배송지 ID가 있지만 배송지 정보가 없는 경우에만 로드
          if (addressId && !selectedAddress) {
            console.log('배송지 정보 로드 시작:', addressId);
            const addresses = await mypageApi.getAddresses();
            const address = addresses.find(addr => addr.addressId === addressId);
            setSelectedAddress(address || null);
            console.log('배송지 정보 로드 완료:', address);
          }
        } catch (error) {
          console.error('PaymentModal 사용자 정보 로드 실패:', error);
        }
      };

      loadUserData();
    } else {
      // 모달이 닫힐 때 상태 초기화 (선택적)
      // setUserProfile(null);
      // setSelectedAddress(null);
    }
  }, [isOpen, addressId, userProfile, selectedAddress]);

  // 디버깅용 로그
  console.log("PaymentModal - 전달받은 데이터:", {
    amount,
    paymentAmount,
    addressId,
    userProfile,
    selectedAddress
  });

  const handleCouponChange = async (isChecked: boolean) => {
    await updateAmount({
      currency: paymentAmount.currency,
      value: isChecked ? paymentAmount.value - 5000 : paymentAmount.value + 5000,
    });
  };

  const handlePayment = async () => {
    if (!widgets) return;

    console.log("=== 결제 시작 - 금액 정보 상세 ===");
    console.log("전달받은 amount:", amount);
    console.log("현재 paymentAmount:", paymentAmount);
    console.log("paymentAmount.value:", paymentAmount.value);
    console.log("주문 상품들:", orderItems.map(item => ({
      name: item.name,
      quantity: item.quantity,
      salePrice: item.salePrice,
      total: item.salePrice * item.quantity
    })));
    
    const frontendTotal = orderItems.reduce((sum, item) => sum + (item.salePrice * item.quantity), 0);
    console.log("프론트엔드 계산 총액:", frontendTotal);
    console.log("결제 요청 금액:", paymentAmount.value);
    console.log("금액 일치 여부:", frontendTotal === paymentAmount.value);

    try {
      // 배송지 ID 확인 (더 상세한 검증)
      if (!addressId) {
        console.error('배송지 ID가 없습니다:', { addressId, selectedAddress });
        alert('배송지를 선택해주세요. 주문 페이지에서 배송지를 확인해주세요.');
        return;
      }

      if (!selectedAddress) {
        console.error('배송지 정보가 없습니다:', { addressId, selectedAddress });
        alert('배송지 정보를 불러올 수 없습니다. 페이지를 새로고침해주세요.');
        return;
      }

      console.log('주문 생성 시작 - 상세 정보:', {
        addressId,
        selectedAddress,
        orderItems,
        orderItemsCount: orderItems.length
      });

      // 데이터 유효성 검사
      if (!addressId || addressId <= 0) {
        console.error('유효하지 않은 배송지 ID:', addressId);
        alert('배송지를 다시 선택해주세요.');
        return;
      }

      if (!orderItems || orderItems.length === 0) {
        console.error('주문 상품이 없습니다:', orderItems);
        alert('주문할 상품이 없습니다.');
        return;
      }

      // 각 상품의 ID 유효성 검사
      const invalidItems = orderItems.filter(item => !item.id || Number(item.id) <= 0);
      if (invalidItems.length > 0) {
        console.error('유효하지 않은 상품 ID:', invalidItems);
        alert('상품 정보에 오류가 있습니다. 다시 시도해주세요.');
        return;
      }

      // 주문 생성 (백엔드 금액 검증을 위해 계산된 금액 포함)
      const calculatedAmount = orderItems.reduce((sum, item) => sum + (item.salePrice * item.quantity), 0);
      
      const orderRequest = {
        addressId: addressId,
        amount: calculatedAmount, // 백엔드 검증을 위해 추가
        orderItems: orderItems.map(item => ({ 
          variantId: Number(item.id),
          quantity: item.quantity 
        }))
      };
      
      console.log("프론트엔드 계산 금액:", calculatedAmount);
      console.log("결제 위젯 금액:", paymentAmount.value);
      console.log("금액 일치 여부:", calculatedAmount === paymentAmount.value);
      
      console.log("=== 주문 상품 상세 분석 ===");
      orderItems.forEach((item, index) => {
        console.log(`상품 ${index + 1}:`, {
          id: item.id,
          name: item.name,
          size: item.size,
          quantity: item.quantity,
          originalPrice: item.originalPrice,
          salePrice: item.salePrice,
          itemTotal: item.salePrice * item.quantity,
          variantId: Number(item.id)
        });
      });
      
      console.log("주문 생성 요청 데이터 (최종):", JSON.stringify(orderRequest, null, 2));
      
      const order = await createOrder(orderRequest);
      
      console.log("=== 주문 생성 완료 ===");
      console.log("백엔드 응답:", order);
      console.log("주문 ID:", order.orderId);
      console.log("주문 이름:", order.orderName);
      console.log("백엔드 계산 금액:", order.amount);
      console.log("프론트엔드 결제 금액:", paymentAmount.value);
      console.log("백엔드-프론트엔드 금액 일치:", order.amount === paymentAmount.value);

      // 금액 불일치 시 백엔드 금액 사용
      const finalPaymentAmount = order.amount;
      console.log("최종 결제 금액:", finalPaymentAmount);

      // 토스페이먼츠 결제 요청 (올바른 API 사용법)
      console.log("토스페이먼츠 결제 요청 시작...");
      
      await widgets.requestPayment({
        orderId: order.orderId,
        orderName: order.orderName,
        successUrl: window.location.origin + "/success",
        failUrl: window.location.origin + "/fail",
        customerEmail: userProfile?.email || "customer@example.com",
        customerName: selectedAddress?.receiver || userProfile?.username || "고객",
        customerMobilePhone: (selectedAddress?.primaryNum || '').replace(/-/g, ''),
      });
    } catch (error) {
      console.error("결제 오류:", error);
      const errorMessage = error instanceof Error ? error.message : '결제 요청 중 오류가 발생했습니다.';
      alert(errorMessage);
    }
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
          {/* 배송지 정보 확인 */}
          {selectedAddress ? (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-black mb-2">배송지 정보</h3>
              <div className="text-sm text-gray-700">
                <p className="font-medium">{selectedAddress.receiver}</p>
                <p>[{selectedAddress.zipCode}] {selectedAddress.address}</p>
                <p>{selectedAddress.addressDetail}</p>
                <p>{selectedAddress.primaryNum}</p>
              </div>
            </div>
          ) : (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">
                ⚠️ 배송지 정보가 없습니다. 주문 페이지에서 배송지를 선택해주세요.
              </p>
            </div>
          )}

          {/* 주문 정보 */}
          <PaymentInfo orderName={orderName} amount={paymentAmount.value} orderItems={orderItems} />

          {/* 결제 UI */}
          <div id="payment-method" className="mb-4" />
          
          {/* 이용약관 UI */}
          <div id="agreement" className="mb-4" />

          {/* 쿠폰 적용 */}
          <CouponSection ready={ready} onCouponChange={handleCouponChange} />

          {/* 결제하기 버튼 */}
          <button
            className={`w-full py-4 rounded-lg font-medium transition-colors ${
              !ready || !selectedAddress || !addressId
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                : 'bg-black text-white hover:bg-gray-800'
            }`}
            disabled={!ready || !selectedAddress || !addressId}
            onClick={handlePayment}
          >
            {!selectedAddress || !addressId
              ? '배송지를 선택해주세요'
              : `${paymentAmount.value.toLocaleString()}원 결제하기`
            }
          </button>
        </div>
      </div>
    </div>
  );
}
