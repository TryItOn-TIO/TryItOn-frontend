"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus, X } from "@/components/common/icons";
import { Button } from "@/components/common/button";
import { Checkbox } from "@/components/common/checkbox";
import { Separator } from "@/components/common/separator";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useCartItems } from "@/hooks/useCartItems";
import Spinner from "@/components/common/Spinner";

type CartItem = {
  id: string;
  name: string;
  size: string;
  originalPrice: number;
  salePrice: number;
  quantity: number;
  image: string;
  category: string;
  variantId: number; // variantId 추가 이거 왜 자꾸 누락됨?
};

const Cart = () => {
  useAuthGuard(); // 인증 확인 - 로그인하지 않은 사용자는 signin 페이지로 리다이렉트

  const router = useRouter();
  const {
    items: backendCartItems,
    isLoading,
    error,
    updateCartItemQuantity,
    deleteCartItem,
    clearError,
  } = useCartItems();

  // 백엔드 데이터를 UI 형태로 변환
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (backendCartItems && backendCartItems.length > 0) {
      const transformedItems = backendCartItems.map((item) => ({
        id: item.cartItemId.toString(),
        name: item.productName,
        size: item.size,
        originalPrice: item.originalPrice || item.price, // originalPrice가 없으면 price 사용
        salePrice: item.price, // API에서 제공하는 할인된 가격
        quantity: item.quantity,
        image: item.imageUrl || "/placeholder.svg?height=120&width=120",
        category: item.brand,
        variantId: item.variantId, // variantId 추가
      }));
      setCartItems(transformedItems);
    } else {
      setCartItems([]);
    }
  }, [backendCartItems]);

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [allSelected, setAllSelected] = useState(true);

  // 선택된 아이템 업데이트
  useEffect(() => {
    if (cartItems.length > 0) {
      setSelectedItems(cartItems.map((item) => item.id));
      setAllSelected(true);
    }
  }, [cartItems]);

  const handleSelectAll = (checked: boolean | "indeterminate") => {
    const isChecked = checked === true;
    setAllSelected(isChecked);
    if (isChecked) {
      setSelectedItems(cartItems.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (
    itemId: string,
    checked: boolean | "indeterminate"
  ) => {
    const isChecked = checked === true;
    if (isChecked) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
      setAllSelected(false);
    }
  };

  const handleQuantityChange = async (itemId: string, change: number) => {
    const currentItem = cartItems.find((item) => item.id === itemId);
    if (!currentItem) return;

    const newQuantity = Math.max(1, currentItem.quantity + change);

    try {
      await updateCartItemQuantity(parseInt(itemId), newQuantity);
      // useCart 훅에서 자동으로 데이터를 다시 가져오므로 별도 상태 업데이트 불필요
    } catch (error) {
      console.error("수량 변경 실패:", error);
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      await deleteCartItem(parseInt(itemId));
      // useCart 훅에서 자동으로 데이터를 다시 가져오므로 별도 상태 업데이트 불필요
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } catch (error) {
      console.error("상품 삭제 실패:", error);
    }
  };

  const handleRemoveSelectedItems = async () => {
    try {
      // 선택된 아이템들을 순차적으로 삭제
      for (const itemId of selectedItems) {
        await deleteCartItem(parseInt(itemId));
      }
      setSelectedItems([]);
      setAllSelected(false);
    } catch (error) {
      console.error("선택 상품 삭제 실패:", error);
    }
  };

  const handlePurchase = () => {
    if (selectedItems.length === 0) {
      alert("구매할 상품을 선택해주세요.");
      return;
    }
    // 선택된 상품 정보를 주문 페이지로 전달하기 위해 localStorage에 저장
    const selectedCartItems = cartItems.filter((item) =>
      selectedItems.includes(item.id)
    );
    localStorage.setItem("orderItems", JSON.stringify(selectedCartItems));
    router.push("/order");
  };

  const selectedCartItems = cartItems.filter((item) =>
    selectedItems.includes(item.id)
  );
  const totalProductPrice = selectedCartItems.reduce(
    (sum, item) => sum + item.salePrice * item.quantity,
    0
  );
  const totalDiscount = selectedCartItems.reduce(
    (sum, item) => sum + (item.originalPrice - item.salePrice) * item.quantity,
    0
  );
  const shippingFee = 0;
  const totalPrice = totalProductPrice + shippingFee;

  const groupedItems = cartItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, CartItem[]>);

  const getDeliveryDateText = () => {
    const today = new Date();
    today.setDate(today.getDate() + 2); // 2일 후

    const month = String(today.getMonth() + 1).padStart(2, "0"); // 월: 0-based
    const date = String(today.getDate()).padStart(2, "0");

    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const day = days[today.getDay()]; // 요일

    return `${month}/${date}(${day})`;
  };

  return (
    <div className="w-full px-4 py-8 overflow-x-hidden">
      {/* 로딩 상태 */}
      {isLoading && (
        // <div className="flex justify-center items-center py-8">
        //   <div className="text-lg text-gray-600">장바구니를 불러오는 중...</div>
        // </div>
        <Spinner />
      )}

      {/* 에러 상태 */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-red-600">{error}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearError}
              className="text-red-600 hover:text-red-800"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* 장바구니가 비어있을 때 */}
      {!isLoading && (!backendCartItems || backendCartItems.length === 0) && (
        <div className="text-center py-16">
          <div className="text-xl font-semibold text-gray-600 mb-4">
            장바구니가 비어있습니다
          </div>
          <Button
            onClick={() => router.push("/")}
            className="bg-black text-white hover:bg-gray-800"
          >
            쇼핑 계속하기
          </Button>
        </div>
      )}

      {/* 기존 장바구니 UI */}
      {!isLoading && backendCartItems && backendCartItems.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 w-full max-w-none">
          {/* 장바구니 섹션 */}
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold mb-6 text-black">장바구니</h1>

            {/* 전체 선택 및 선택 삭제 */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={handleSelectAll}
                />
                <label className="text-sm font-medium cursor-pointer text-black">
                  전체 선택
                </label>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-black text-black hover:bg-black hover:text-white"
                onClick={async () => await handleRemoveSelectedItems()}
                disabled={selectedItems.length === 0}
              >
                선택 삭제
              </Button>
            </div>

            {/* 상품 목록 */}
            <div className="space-y-8">
              {Object.entries(groupedItems).map(([category, items]) => (
                <div key={category}>
                  <h2 className="text-lg font-semibold mb-4 text-black">
                    {category}
                  </h2>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="border rounded-lg p-4">
                        <div className="flex items-start space-x-4">
                          <Checkbox
                            checked={selectedItems.includes(item.id)}
                            onCheckedChange={(checked) =>
                              handleSelectItem(item.id, checked)
                            }
                          />
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded-md bg-gray-100"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium text-sm mb-1 text-black">
                                  {item.name}
                                </h3>
                                <p className="text-sm text-black mb-2">
                                  {item.size} / 1개
                                </p>
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm text-black line-through">
                                    {item.originalPrice.toLocaleString()}원
                                  </span>
                                  <span className="font-bold text-lg text-black">
                                    {item.salePrice.toLocaleString()}원
                                  </span>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={async () =>
                                  await handleRemoveItem(item.id)
                                }
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="mt-4 text-xs text-black mb-3">
                              택배 배송 {getDeliveryDateText()} 밤 12시 이전
                              주문 시 내일 도착 예정
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-black text-black hover:bg-black hover:text-white"
                                  onClick={async () =>
                                    await handleQuantityChange(item.id, -1)
                                  }
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="px-3 py-1 border border-black rounded text-sm min-w-[40px] text-center text-black">
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-black text-black hover:bg-black hover:text-white"
                                  onClick={async () =>
                                    await handleQuantityChange(item.id, 1)
                                  }
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 주문 요약 섹션 */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-6 text-black">구매 금액</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm text-black">
                  <span>상품 금액</span>
                  <span>{totalProductPrice.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-black">할인 금액</span>
                  <span className="text-red-500">
                    -{totalDiscount.toLocaleString()}원
                  </span>
                </div>
                <div className="flex justify-between text-sm text-black">
                  <span>배송비</span>
                  <div className="text-right">
                    <span className="text-blue-500 text-xs">무료배송</span>
                    <div>{shippingFee.toLocaleString()}원</div>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-black">
                    총 구매 금액
                  </span>
                  <span className="text-xl font-bold text-black">
                    {totalPrice.toLocaleString()}원
                  </span>
                </div>
                <div className="flex justify-between text-sm text-black">
                  <span>적립예정 마일리지</span>
                  <span>최대 0원</span>
                </div>
              </div>

              <Button
                className="w-full bg-black text-white hover:bg-gray-800 py-3"
                onClick={handlePurchase}
                disabled={selectedItems.length === 0}
              >
                구매하기 ({selectedItems.length}개)
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
