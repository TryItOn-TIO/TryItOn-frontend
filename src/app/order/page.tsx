"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/common/button"
import { Card, CardContent } from "@/components/common/card"
import { Separator } from "@/components/common/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/order/_components/select"
import PaymentModal from "@/app/order/_components/PaymentModal"

type OrderItem ={
  id: string
  name: string
  size: string
  quantity: number
  originalPrice: number
  salePrice: number
  image: string
  category?: string // 카트에서 전달받을 때 사용
}

export default function OrderPage() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  
  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    {
      id: "1",
      name: "Motorcycle Piping Mesh Short Sleeve Black",
      size: "L",
      quantity: 1,
      originalPrice: 59000,
      salePrice: 20000,
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjNGNEY2Ii8+Cjwvc3ZnPgo=",
    },
    {
      id: "2",
      name: "Motorcycle Piping Mesh Short Sleeve Black",
      size: "L",
      quantity: 1,
      originalPrice: 59000,
      salePrice: 49500,
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjNGNEY2Ii8+Cjwvc3ZnPgo=",
    },
  ])

  // 카트에서 전달받은 주문 상품 정보 로드
  useEffect(() => {
    const savedOrderItems = localStorage.getItem("orderItems")
    if (savedOrderItems) {
      try {
        const parsedItems = JSON.parse(savedOrderItems)
        console.log("카트에서 전달받은 주문 상품:", parsedItems)
        setOrderItems(parsedItems)
        // 사용 후 localStorage에서 제거
        localStorage.removeItem("orderItems")
      } catch (error) {
        console.error("주문 상품 정보를 불러오는데 실패했습니다:", error)
      }
    }
  }, [])

  const [deliveryAddress] = useState({
    name: "설현아",
    address: "경기 용인시 처인구 명륜로 55 C412호",
    phone: "010-9481-7488",
  })

  const totalOriginalPrice = orderItems.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0)
  const totalSalePrice = orderItems.reduce((sum, item) => sum + item.salePrice * item.quantity, 0)
  const totalDiscount = totalOriginalPrice - totalSalePrice
  const shippingFee = 0
  const finalAmount = totalSalePrice + shippingFee

  const orderName = `${orderItems[0]?.name}${orderItems.length > 1 ? ` 외 ${orderItems.length - 1}건` : ''}`

  // 디버깅용 로그
  console.log("주문 페이지 - orderItems:", orderItems);
  console.log("주문 페이지 - finalAmount:", finalAmount);

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
                  <h2 className="text-lg font-semibold text-black">설현아</h2>
                  <span className="text-sm text-black">배송지 변경</span>
                </div>

                <div className="space-y-2 mb-4">
                  <p className="text-sm text-black">{deliveryAddress.address}</p>
                  <p className="text-sm text-black">{deliveryAddress.phone}</p>
                </div>

                <Select defaultValue="default">
                  <SelectTrigger 
                    className="w-full bg-white text-black border-gray-300" 
                    style={{ 
                      color: '#000000', 
                      backgroundColor: '#ffffff',
                      opacity: 1,
                      borderColor: '#d1d5db'
                    }}
                  >
                    <SelectValue 
                      placeholder="배송 요청 사항을 선택하세요" 
                      style={{ 
                        color: '#000000', 
                        opacity: 1,
                        fontWeight: '500'
                      }}
                    />
                  </SelectTrigger>
                  <SelectContent style={{ backgroundColor: '#ffffff', color: '#000000' }}>
                    <SelectItem value="default" style={{ color: '#000000', opacity: 1 }}>
                      배송 요청 사항을 선택하세요
                    </SelectItem>
                    <SelectItem value="door" style={{ color: '#000000', opacity: 1 }}>
                      문 앞에 놓아주세요
                    </SelectItem>
                    <SelectItem value="security" style={{ color: '#000000', opacity: 1 }}>
                      경비실에 맡겨주세요
                    </SelectItem>
                    <SelectItem value="call" style={{ color: '#000000', opacity: 1 }}>
                      배송 전 연락주세요
                    </SelectItem>
                    <SelectItem value="direct" style={{ color: '#000000', opacity: 1 }}>
                      직접 받겠습니다
                    </SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* 주문 상품 */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4 text-black">주문 상품 {orderItems.length}개</h2>

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
                          <h3 className="font-medium text-sm text-black break-words line-clamp-2">{item.name}</h3>
                          <p className="text-sm text-black">
                            {item.size} / {item.quantity}개
                          </p>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-400 line-through">
                              {item.originalPrice.toLocaleString()}원
                            </p>
                            <p className="font-bold text-black">{item.salePrice.toLocaleString()}원</p>
                          </div>
                          <p className="text-xs text-black">택배 배송 07/1(금) 출고 예정</p>
                        </div>
                      </div>
                      {index < orderItems.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-black">구매 서술</span>
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
                      <span className="text-black">{totalOriginalPrice.toLocaleString()}원</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-black">할인 금액</span>
                      <span className="text-red-500">-{totalDiscount.toLocaleString()}원</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-black">배송비</span>
                      <span className="text-blue-500">무료배송</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-bold text-lg">
                    <span className="text-black">총 결제 금액</span>
                    <span className="text-black">{finalAmount.toLocaleString()}원</span>
                  </div>
                </CardContent>
              </Card>

              {/* 적립 혜택 */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h2 className="font-bold text-lg text-black">적립 혜택</h2>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-black">LV.3 회원 + 1% 적립</span>
                      <span className="font-medium text-black">4,840원</span>
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
                      • TIO는 통신판매중개자로, 무신사 마켓의 상품정보/주문/배송/환불의 의무와 책임은 각 판매자에게
                      있습니다.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* 결제하기 버튼 */}
              <Button 
                className="w-full bg-black text-white hover:bg-gray-800 py-4 text-lg font-medium"
                onClick={() => setIsPaymentModalOpen(true)}
              >
                {finalAmount.toLocaleString()}원 결제하기
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
      />
    </div>
  )
}
