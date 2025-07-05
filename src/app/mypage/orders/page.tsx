"use client";

import { useState } from "react";
import { ChevronLeft, Package, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { useOrders } from "@/hooks/useMypage";
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function OrdersPage() {
  useAuthGuard();
  const router = useRouter();
  const { orders, totalPages, currentPage, isLoading, error, fetchOrders } = useOrders();
  const [pageSize] = useState(10);

  const handlePageChange = (page: number) => {
    fetchOrders(page, pageSize);
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'PENDING': '주문 대기',
      'CONFIRMED': '주문 확인',
      'PROCESSING': '처리 중',
      'SHIPPED': '배송 중',
      'DELIVERED': '배송 완료',
      'COMPLETED': '주문 완료',
      'CANCELLED': '주문 취소',
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colorMap: { [key: string]: string } = {
      'PENDING': 'text-yellow-600 bg-yellow-50',
      'CONFIRMED': 'text-blue-600 bg-blue-50',
      'PROCESSING': 'text-purple-600 bg-purple-50',
      'SHIPPED': 'text-orange-600 bg-orange-50',
      'DELIVERED': 'text-green-600 bg-green-50',
      'COMPLETED': 'text-green-600 bg-green-50',
      'CANCELLED': 'text-red-600 bg-red-50',
    };
    return colorMap[status] || 'text-gray-600 bg-gray-50';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">주문내역을 불러오는 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-red-600">오류: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => router.back()}
            className="mr-4 p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">주문 내역</h1>
        </div>

        {/* 주문 목록 */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">주문 내역이 없습니다</h3>
            <p className="text-gray-500">첫 주문을 시작해보세요!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.orderId} className="bg-white rounded-lg shadow-sm p-6">
                {/* 주문 헤더 */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        주문번호: {order.orderUid}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(order.createdAt).toLocaleDateString('ko-KR')}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.orderStatus)}`}>
                      {getStatusText(order.orderStatus)}
                    </span>
                    <div className="text-lg font-bold text-gray-900 mt-1">
                      {order.totalAmount.toLocaleString()}원
                    </div>
                  </div>
                </div>

                {/* 주문 상품 목록 */}
                <div className="space-y-3">
                  {order.orderItems.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <img
                        src={item.productImageUrl || '/placeholder.svg'}
                        alt={item.productName}
                        className="w-16 h-16 object-cover rounded-md bg-gray-100"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.productName}</h4>
                        <div className="text-sm text-gray-500 mt-1">
                          사이즈: {item.size} | 수량: {item.quantity}개
                        </div>
                        <div className="text-sm font-medium text-gray-900 mt-1">
                          {item.price.toLocaleString()}원
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i)}
                  className={`px-4 py-2 rounded-md ${
                    currentPage === i
                      ? 'bg-black text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
