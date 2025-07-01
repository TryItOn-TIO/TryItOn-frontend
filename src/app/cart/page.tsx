"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus, X } from "@/components/common/icons";
import { Button } from "@/components/common/button";
import { Checkbox } from "@/components/common/checkbox";
import { Separator } from "@/components/common/separator";
import { useAuthGuard } from "@/hooks/useAuthGuard";

type CartItem = {
  id: string;
  name: string;
  size: string;
  originalPrice: number;
  salePrice: number;
  quantity: number;
  image: string;
  category: string;
};

const Cart = () => {
  useAuthGuard();

  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Motorcycle Piping Mesh Short Sleeve Black",
      size: "L",
      originalPrice: 59000,
      salePrice: 200000,
      quantity: 1,
      image: "/placeholder.svg?height=120&width=120",
      category: "론디 모던사이클",
    },
    {
      id: "2",
      name: "Motorcycle Piping Mesh Short Sleeve Black",
      size: "L",
      originalPrice: 59000,
      salePrice: 40000,
      quantity: 1,
      image: "/placeholder.svg?height=120&width=120",
      category: "론디 모던사이클",
    },
    {
      id: "3",
      name: "Motorcycle Piping Mesh Short Sleeve Black",
      size: "L",
      originalPrice: 59000,
      salePrice: 9500,
      quantity: 1,
      image: "/placeholder.svg?height=120&width=120",
      category: "무신사 스탠다드",
    },
  ]);

  const [selectedItems, setSelectedItems] = useState<string[]>(
    cartItems.map((item) => item.id)
  );
  const [allSelected, setAllSelected] = useState(true);

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

  const handleQuantityChange = (itemId: string, change: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
    setSelectedItems(selectedItems.filter((id) => id !== itemId));
  };

  const handleRemoveSelectedItems = () => {
    setCartItems(cartItems.filter((item) => !selectedItems.includes(item.id)));
    setSelectedItems([]);
    setAllSelected(false);
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

  return (
    <div className="w-full px-4 py-8 overflow-x-hidden">
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
              onClick={handleRemoveSelectedItems}
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
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="mt-4 text-xs text-black mb-3">
                            택배 배송 07/1(화) 밤 12시 이전 주문 시 내일 도착
                            예정
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-black text-black hover:bg-black hover:text-white"
                                onClick={() =>
                                  handleQuantityChange(item.id, -1)
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
                                onClick={() => handleQuantityChange(item.id, 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <Button
                              variant="outline"
                              className="border-black text-black hover:bg-black hover:text-white"
                              size="sm"
                            >
                              구매 서용
                            </Button>
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
    </div>
  );
};

export default Cart;
