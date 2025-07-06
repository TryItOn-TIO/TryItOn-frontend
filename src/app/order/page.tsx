"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/common/button";
import { Card, CardContent } from "@/components/common/card";
import { Separator } from "@/components/common/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/order/_components/select";
import PaymentModal from "@/app/order/_components/PaymentModal";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { mypageApi } from "@/api/mypage";
import { UserProfile, Address } from "@/types/mypage";
import { useSearchParams } from "next/navigation";

type OrderItem = {
  id: string;
  name: string;
  size: string;
  quantity: number;
  originalPrice: number;
  salePrice: number;
  image: string;
  category?: string;
  color?: string;
  brand?: string;
  variantId?: number;
};

export default function OrderPage() {
  useAuthGuard();
  const searchParams = useSearchParams();

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [addressError, setAddressError] = useState<string | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [orderType, setOrderType] = useState<'cart' | 'direct'>('cart'); // 주문 타입 추가
  const [newAddress, setNewAddress] = useState({
    zipCode: '',
    address: '',
    addressDetail: '',
    receiver: '',
    primaryNum: '',
    alternateNum: '',
    isDefaultAddr: true,
    deliverRequest: '문 앞에 놓아주세요'
  });

  // 간단 배송지 등록
  const handleQuickAddressAdd = () => {
    // 사용자 프로필 정보로 초기값 설정
    if (userProfile) {
      setNewAddress(prev => ({
        ...prev,
        receiver: userProfile.username || '',
      }));
    }
    setShowAddressForm(true);
  };

  // 배송지 등록 처리
  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newAddress.receiver || !newAddress.address || !newAddress.primaryNum) {
      alert('필수 정보를 모두 입력해주세요.');
      return;
    }

    try {
      console.log('배송지 등록 시도:', newAddress);
      
      // 백엔드 API 호출 시도
      try {
        await mypageApi.addAddress(newAddress);
        console.log('배송지 등록 성공');
        
        // 배송지 목록 다시 조회
        const addressList = await mypageApi.getAddresses();
        setAddresses(addressList);
        const addedAddress = addressList.find(addr => addr.receiver === newAddress.receiver);
        setSelectedAddress(addedAddress || addressList[0]);
        setAddressError(null);
        setShowAddressForm(false);
        
        alert('배송지가 등록되었습니다.');
      } catch (apiError: any) {
        console.error('배송지 등록 API 실패:', apiError);
        
        // API가 없는 경우 로컬에서 처리 (개발 환경)
        if (process.env.NODE_ENV === 'development') {
          const tempAddress: Address = {
            addressId: Date.now(), // 임시 ID
            ...newAddress
          };
          
          const updatedAddresses = [...addresses, tempAddress];
          setAddresses(updatedAddresses);
          setSelectedAddress(tempAddress);
          setAddressError(null);
          setShowAddressForm(false);
          
          console.log('개발 환경에서 로컬 배송지 추가:', tempAddress);
          alert('배송지가 등록되었습니다. (개발 모드)');
        } else {
          throw apiError;
        }
      }
    } catch (error) {
      console.error('배송지 등록 실패:', error);
      alert('배송지 등록에 실패했습니다.');
    }
  };

  // 사용자 정보 및 배송지 정보 로드
  useEffect(() => {
    const loadUserData = async () => {
      try {
        setIsLoading(true);
        setAddressError(null);
        
        // 사용자 프로필 조회
        const profile = await mypageApi.getProfile();
        setUserProfile(profile);

        // 배송지 목록 조회
        try {
          console.log('배송지 목록 조회 시작...');
          const addressList = await mypageApi.getAddresses();
          console.log('배송지 목록 조회 결과:', addressList);
          setAddresses(addressList);
          
          if (addressList.length > 0) {
            // 기본 배송지 우선 선택, 없으면 첫 번째 배송지 선택
            const defaultAddress = addressList.find(addr => addr.isDefaultAddr) || addressList[0];
            setSelectedAddress(defaultAddress);
            console.log('기본 배송지 설정:', defaultAddress);
          } else {
            console.log('등록된 배송지가 없음');
            setAddressError('등록된 배송지가 없습니다. 배송지를 먼저 등록해주세요.');
          }
        } catch (addressApiError: any) {
          console.error('배송지 조회 실패:', addressApiError);
          console.error('배송지 API 응답:', addressApiError.response);
          
          // API 엔드포인트가 없는 경우 임시 처리
          if (addressApiError.response?.status === 404) {
            console.log('배송지 API가 구현되지 않음 - 개발 환경에서 기본 배송지 생성');
            
            // 개발 환경에서만 기본 배송지 생성
            if (process.env.NODE_ENV === 'development') {
              const defaultAddress: Address = {
                addressId: 1,
                zipCode: '12345',
                address: '서울시 강남구 테헤란로 123',
                addressDetail: '456호',
                receiver: userProfile?.username || '사용자',
                primaryNum: '010-1234-5678',
                alternateNum: null,
                isDefaultAddr: true,
                deliverRequest: '문 앞에 놓아주세요'
              };
              
              setAddresses([defaultAddress]);
              setSelectedAddress(defaultAddress);
              console.log('개발용 기본 배송지 생성:', defaultAddress);
            } else {
              setAddressError('배송지 API가 구현되지 않았습니다.');
            }
          } else {
            setAddressError('배송지 정보를 불러올 수 없습니다.');
          }
        }

      } catch (error) {
        console.error('사용자 정보 로드 실패:', error);
        setAddressError('사용자 정보를 불러올 수 없습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  // 주문 상품 정보 로드 (카트 또는 직접 구매)
  useEffect(() => {
    // URL 파라미터에서 직접 구매 정보 확인
    const directOrderData = searchParams.get('data');
    
    if (directOrderData) {
      // 직접 구매
      try {
        const orderInfo = JSON.parse(directOrderData);
        console.log("직접 구매 상품 정보:", orderInfo);
        
        const directOrderItem: OrderItem = {
          id: orderInfo.productId.toString(),
          name: orderInfo.productName,
          brand: orderInfo.brand,
          size: orderInfo.size,
          color: orderInfo.color,
          quantity: orderInfo.quantity,
          originalPrice: orderInfo.originalPrice,
          salePrice: orderInfo.price,
          image: orderInfo.image,
          variantId: orderInfo.variantId
        };
        
        setOrderItems([directOrderItem]);
        setOrderType('direct');
      } catch (error) {
        console.error("직접 구매 상품 정보를 불러오는데 실패했습니다:", error);
        alert("상품 정보를 불러오는데 실패했습니다.");
      }
    } else {
      // 카트에서 전달받은 주문 상품 정보 로드
      const savedOrderItems = localStorage.getItem("orderItems");
      if (savedOrderItems) {
        try {
          const parsedItems = JSON.parse(savedOrderItems);
          console.log("카트에서 전달받은 주문 상품:", parsedItems);
          setOrderItems(parsedItems);
          setOrderType('cart');
          // localStorage 삭제를 결제 완료 후로 연기
          // localStorage.removeItem("orderItems");
        } catch (error) {
          console.error("주문 상품 정보를 불러오는데 실패했습니다:", error);
        }
      }
    }
  }, [searchParams]);

  const totalOriginalPrice = orderItems.reduce(
    (sum, item) => sum + item.originalPrice * item.quantity,
    0
  );
  const totalSalePrice = orderItems.reduce(
    (sum, item) => sum + item.salePrice * item.quantity,
    0
  );
  const totalDiscount = totalOriginalPrice - totalSalePrice;
  const shippingFee = 0;
  const finalAmount = totalSalePrice + shippingFee;

  const handlePaymentModalOpen = () => {
    console.log('결제 모달 열기 시도:', {
      selectedAddress,
      addressId: selectedAddress?.addressId,
      addressError
    });

    if (!selectedAddress) {
      alert('배송지를 선택해주세요.');
      return;
    }

    if (addressError) {
      alert('배송지 정보에 오류가 있습니다. 배송지를 다시 확인해주세요.');
      return;
    }

    setIsPaymentModalOpen(true);
  };

  const orderName = `${orderItems[0]?.name}${
    orderItems.length > 1 ? ` 외 ${orderItems.length - 1}건` : ""
  }`;

  // 로딩 중일 때
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <div className="text-lg text-gray-600">주문 정보를 불러오는 중...</div>
          <div className="text-sm text-gray-500 mt-2">사용자 정보 및 배송지를 확인하고 있습니다.</div>
        </div>
      </div>
    );
  }

  // 주문 상품이 없을 때
  if (orderItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-semibold text-gray-600 mb-4">
            주문할 상품이 없습니다
          </div>
          <Button
            onClick={() => window.location.href = '/cart'}
            className="bg-black text-white hover:bg-gray-800"
          >
            장바구니로 이동
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 w-full overflow-x-hidden">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <h1 className="text-2xl font-bold mb-8 text-black">주문서</h1>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 w-full">
          {/* 주문 정보 */}
          <div className="flex-1 lg:flex-[2] space-y-6 min-w-0">
            {/* 배송지 정보 */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-black">
                    배송지 정보
                  </h2>
                  <button 
                    onClick={() => window.location.href = '/mypage/address'}
                    className="text-sm text-blue-600 cursor-pointer hover:underline"
                  >
                    배송지 관리
                  </button>
                </div>

                {addressError ? (
                  <div className="space-y-4">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-yellow-800 mb-1">
                            배송지 정보가 필요합니다
                          </h3>
                          <p className="text-sm text-yellow-700 mb-3">
                            주문을 완료하려면 배송지를 등록해주세요.
                          </p>
                          <div className="flex space-x-3">
                            <button
                              onClick={() => window.location.href = '/mypage/address'}
                              className="text-sm bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition-colors"
                            >
                              배송지 관리 페이지로 이동
                            </button>
                            <button
                              onClick={handleQuickAddressAdd}
                              className="text-sm border border-yellow-600 text-yellow-700 px-4 py-2 rounded-md hover:bg-yellow-50 transition-colors"
                            >
                              여기서 빠른 등록
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {showAddressForm && (
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h4 className="font-medium text-black mb-4">배송지 등록</h4>
                        <form onSubmit={handleAddressSubmit} className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                수령인 *
                              </label>
                              <input
                                type="text"
                                value={newAddress.receiver}
                                onChange={(e) => setNewAddress({...newAddress, receiver: e.target.value})}
                                className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
                                placeholder="수령인 이름"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                연락처 *
                              </label>
                              <input
                                type="tel"
                                value={newAddress.primaryNum}
                                onChange={(e) => setNewAddress({...newAddress, primaryNum: e.target.value})}
                                className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
                                placeholder="010-1234-5678"
                                required
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                우편번호
                              </label>
                              <input
                                type="text"
                                value={newAddress.zipCode}
                                onChange={(e) => setNewAddress({...newAddress, zipCode: e.target.value})}
                                className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
                                placeholder="12345"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                주소 *
                              </label>
                              <input
                                type="text"
                                value={newAddress.address}
                                onChange={(e) => setNewAddress({...newAddress, address: e.target.value})}
                                className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
                                placeholder="서울시 강남구 테헤란로 123"
                                required
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              상세주소
                            </label>
                            <input
                              type="text"
                              value={newAddress.addressDetail}
                              onChange={(e) => setNewAddress({...newAddress, addressDetail: e.target.value})}
                              className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
                              placeholder="아파트, 동/호수 등"
                            />
                          </div>
                          
                          <div className="flex space-x-3 pt-4">
                            <button
                              type="submit"
                              className="flex-1 bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
                            >
                              배송지 등록
                            </button>
                            <button
                              type="button"
                              onClick={() => setShowAddressForm(false)}
                              className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50 transition-colors"
                            >
                              취소
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>
                ) : selectedAddress ? (
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-black">
                          {selectedAddress.receiver}
                        </h3>
                        {selectedAddress.isDefaultAddr && (
                          <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
                            기본 배송지
                          </span>
                        )}
                      </div>
                      <div className="space-y-1 text-sm text-gray-700">
                        <p>[{selectedAddress.zipCode}] {selectedAddress.address}</p>
                        <p>{selectedAddress.addressDetail}</p>
                        <p>{selectedAddress.primaryNum}</p>
                        {selectedAddress.alternateNum && (
                          <p className="text-gray-600">
                            보조 연락처: {selectedAddress.alternateNum}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* 다른 배송지 선택 */}
                    {addresses.length > 1 && (
                      <div>
                        <label className="block text-sm font-medium mb-2 text-black">
                          다른 배송지 선택
                        </label>
                        <select
                          value={selectedAddress.addressId}
                          onChange={(e) => {
                            const addressId = parseInt(e.target.value);
                            const address = addresses.find(addr => addr.addressId === addressId);
                            setSelectedAddress(address || null);
                          }}
                          className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
                        >
                          {addresses.map((address) => (
                            <option key={address.addressId} value={address.addressId}>
                              {address.receiver} - {address.address} {address.addressDetail}
                              {address.isDefaultAddr ? ' (기본)' : ''}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-gray-500 mb-4">배송지 정보를 불러오는 중...</div>
                  </div>
                )}

                {selectedAddress && (
                  <div className="mt-4">
                    <Select defaultValue={selectedAddress.deliverRequest || "default"}>
                      <SelectTrigger
                        className="w-full bg-white text-black border-gray-300"
                        style={{
                          color: "#000000",
                          backgroundColor: "#ffffff",
                          opacity: 1,
                          borderColor: "#d1d5db",
                        }}
                      >
                        <SelectValue
                          placeholder="배송 요청 사항을 선택하세요"
                          style={{
                            color: "#000000",
                            opacity: 1,
                            fontWeight: "500",
                          }}
                        />
                      </SelectTrigger>
                      <SelectContent
                        style={{ backgroundColor: "#ffffff", color: "#000000" }}
                      >
                        <SelectItem
                          value="default"
                          style={{ color: "#000000", opacity: 1 }}
                        >
                          배송 요청 사항을 선택하세요
                        </SelectItem>
                        <SelectItem
                          value="door"
                          style={{ color: "#000000", opacity: 1 }}
                        >
                          문 앞에 놓아주세요
                        </SelectItem>
                        <SelectItem
                          value="security"
                          style={{ color: "#000000", opacity: 1 }}
                        >
                          경비실에 맡겨주세요
                        </SelectItem>
                        <SelectItem
                          value="call"
                          style={{ color: "#000000", opacity: 1 }}
                        >
                          배송 전 연락주세요
                        </SelectItem>
                        <SelectItem
                          value="direct"
                          style={{ color: "#000000", opacity: 1 }}
                        >
                          직접 받겠습니다
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 주문 상품 */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4 text-black">
                  주문 상품 {orderItems.length}개
                </h2>

                <div className="space-y-4">
                  {orderItems.map((item, index) => (
                    <div key={item.id} className="w-full">
                      <div className="flex space-x-4 w-full">
                        <div className="flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="rounded-lg bg-gray-100 object-cover"
                          />
                        </div>
                        <div className="flex-1 space-y-1 min-w-0 overflow-hidden">
                          {item.brand && (
                            <p className="text-xs text-gray-500">{item.brand}</p>
                          )}
                          <h3 className="font-medium text-sm text-black break-words line-clamp-2">
                            {item.name}
                          </h3>
                          <p className="text-sm text-black">
                            {item.color && `${item.color} / `}{item.size} / {item.quantity}개
                          </p>
                          <div className="space-y-1">
                            {item.originalPrice !== item.salePrice && (
                              <p className="text-sm text-gray-400 line-through">
                                {item.originalPrice.toLocaleString()}원
                              </p>
                            )}
                            <p className="font-bold text-black">
                              {item.salePrice.toLocaleString()}원
                            </p>
                          </div>
                          <p className="text-xs text-black">
                            택배 배송 {new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('ko-KR', {
                              month: 'numeric',
                              day: 'numeric'
                            })} 출고 예정
                          </p>
                        </div>
                      </div>
                      {index < orderItems.length - 1 && (
                        <Separator className="mt-4" />
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-black">구매 혜택</span>
                    <ChevronDown className="h-4 w-4 text-black" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 결제 정보 */}
          <div className="flex-1 lg:flex-[1] min-w-0">
            <div className="space-y-6">
              {/* 결제 금액 */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h2 className="font-bold text-lg text-black">결제 금액</h2>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-black">상품 금액</span>
                      <span className="text-black">
                        {totalOriginalPrice.toLocaleString()}원
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-black">할인 금액</span>
                      <span className="text-red-500">
                        -{totalDiscount.toLocaleString()}원
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-black">배송비</span>
                      <span className="text-blue-500">무료배송</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-bold text-lg">
                    <span className="text-black">총 결제 금액</span>
                    <span className="text-black">
                      {finalAmount.toLocaleString()}원
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* 적립 혜택 */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h2 className="font-bold text-lg text-black">적립 혜택</h2>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-black">회원 적립 (1%)</span>
                      <span className="font-medium text-black">
                        {Math.floor(finalAmount * 0.01).toLocaleString()}원
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-black">후기 적립금</span>
                      <span className="text-black">0원</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2 text-xs text-gray-500">
                    <p>• 주문 내용을 확인했으며, 결제에 동의합니다.</p>
                    <p>• 회원님의 개인정보는 안전하게 관리됩니다.</p>
                    <p>
                      • TIO는 통신판매중개자로, 상품정보/주문/배송/환불의 의무와 책임은 각 판매자에게 있습니다.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* 결제하기 버튼 */}
              <Button
                className="w-full bg-black text-white hover:bg-gray-800 py-4 text-lg font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                onClick={handlePaymentModalOpen}
                disabled={!selectedAddress || addressError !== null}
              >
                {addressError 
                  ? '배송지를 등록해주세요'
                  : selectedAddress 
                    ? `${finalAmount.toLocaleString()}원 결제하기`
                    : '배송지 정보를 확인하는 중...'
                }
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 결제 모달 */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        amount={finalAmount}
        orderName={orderName}
        orderItems={orderItems}
        addressId={selectedAddress?.addressId}
      />
    </div>
  );
}
