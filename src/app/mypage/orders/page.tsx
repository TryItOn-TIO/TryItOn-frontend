"use client";

import { useState } from "react";
import { ChevronLeft, Package, Calendar, Truck, CheckCircle, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useOrders } from "@/hooks/useMypage";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useOrderDeletion } from "@/hooks/useOrderDeletion";
import Image from "next/image";

export default function OrdersPage() {
  useAuthGuard();
  const router = useRouter();
  const { orders, totalPages, currentPage, isLoading, error, fetchOrders } = useOrders();
  const { deleteOrder, isDeleting } = useOrderDeletion();
  const [pageSize] = useState(10);

  // 주문 삭제 처리
  const handleDeleteOrder = async (orderId: number, orderUid: string) => {
    const confirmMessage = `주문번호 ${orderUid}를 삭제하시겠습니까?\n삭제된 주문은 복구할 수 없습니다.`;
    
    if (!confirm(confirmMessage)) {
      return;
    }

    const success = await deleteOrder(orderId);
    if (success) {
      alert('주문이 성공적으로 삭제되었습니다.');
      // 주문 목록 새로고침
      fetchOrders(currentPage, pageSize);
    } else {
      alert('주문 삭제에 실패했습니다. 다시 시도해주세요.');
    }
  };

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
      'PENDING': 'text-yellow-600 bg-yellow-50 border-yellow-200',
      'CONFIRMED': 'text-blue-600 bg-blue-50 border-blue-200',
      'PROCESSING': 'text-purple-600 bg-purple-50 border-purple-200',
      'SHIPPED': 'text-orange-600 bg-orange-50 border-orange-200',
      'DELIVERED': 'text-green-600 bg-green-50 border-green-200',
      'COMPLETED': 'text-green-600 bg-green-50 border-green-200',
      'CANCELLED': 'text-red-600 bg-red-50 border-red-200',
    };
    return colorMap[status] || 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'SHIPPED':
        return <Truck className="w-4 h-4" />;
      case 'DELIVERED':
      case 'COMPLETED':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <div className="text-lg text-gray-600">주문내역을 불러오는 중...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-semibold text-red-600 mb-4">오류가 발생했습니다</div>
          <div className="text-gray-600 mb-6">{error}</div>
          <button
            onClick={() => fetchOrders(0, pageSize)}
            className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800"
          >
            다시 시도
          </button>
        </div>
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
            className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
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
            <p className="text-gray-500 mb-6">첫 주문을 시작해보세요!</p>
            <button
              onClick={() => router.push('/')}
              className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors"
            >
              쇼핑하러 가기
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.orderId} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                {/* 주문 헤더 */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {order.orderUid}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(order.createdAt).toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.orderStatus)}`}>
                        {getStatusIcon(order.orderStatus)}
                        <span className="ml-1">{getStatusText(order.orderStatus)}</span>
                      </div>
                      <div className="text-xl font-bold text-gray-900 mt-2">
                        {order.totalAmount.toLocaleString()}원
                      </div>
                    </div>
                  </div>
                </div>

                {/* 주문 상품 목록 */}
                <div className="p-6">
                  <div className="space-y-4">
                    {order.orderItems.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0">
                          <Image
                            src={item.imageUrl || '/placeholder.svg'}
                            alt={item.productName}
                            width={80}
                            height={80}
                            className="object-cover rounded-md bg-gray-100"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 text-lg mb-1">
                                {item.productName}
                              </h4>
                              <div className="text-sm text-gray-600 mb-2">
                                <span className="font-medium">{item.brand}</span>
                              </div>
                              <div className="flex items-center text-sm text-gray-500 space-x-4">
                                <span>수량: {item.quantity}개</span>
                                {item.size && <span>사이즈: {item.size}</span>}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-gray-900">
                                {item.price.toLocaleString()}원
                              </div>
                              <div className="text-sm text-gray-500">
                                단가
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 주문 액션 버튼들 */}
                  <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
                    {/* 왼쪽: 삭제 버튼 */}
                    <button 
                      onClick={() => handleDeleteOrder(order.orderId, order.orderUid)}
                      disabled={isDeleting}
                      className="flex items-center px-3 py-2 text-sm text-red-600 border border-red-300 rounded-md hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      {isDeleting ? '삭제 중...' : '주문 삭제'}
                    </button>

                    {/* 오른쪽: 기존 액션 버튼들 */}
                    <div className="flex space-x-3">
                      {order.orderStatus === 'DELIVERED' && (
                        <button className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                          리뷰 작성
                        </button>
                      )}
                      {order.orderStatus === 'SHIPPED' && (
                        <button className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                          배송 조회
                        </button>
                      )}
                      <button className="px-4 py-2 text-sm bg-black text-white rounded-md hover:bg-gray-800 transition-colors">
                        주문 상세
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
                className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                이전
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = Math.max(0, Math.min(totalPages - 5, currentPage - 2)) + i;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-4 py-2 text-sm rounded-md transition-colors ${
                      currentPage === pageNum
                        ? 'bg-black text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum + 1}
                  </button>
                );
              })}
              
              <button
                onClick={() => handlePageChange(Math.min(totalPages - 1, currentPage + 1))}
                disabled={currentPage === totalPages - 1}
                className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                다음
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
