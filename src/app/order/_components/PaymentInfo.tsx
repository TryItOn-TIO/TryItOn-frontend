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

type PaymentInfoProps ={
  orderName: string;
  amount: number;
  orderItems: OrderItem[];
}

export default function PaymentInfo({ orderName, amount, orderItems }: PaymentInfoProps) {
  return (
    <div className="mb-6">
      {/* 주문 요약 */}
      <div className="p-4 bg-gray-50 rounded-lg mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">주문명</span>
          <span className="text-sm font-medium text-black">{orderName}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">결제금액</span>
          <span className="text-lg font-bold text-black">{amount.toLocaleString()}원</span>
        </div>
      </div>

      {/* 주문 상품 목록 */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-700 mb-2">주문 상품 ({orderItems.length}개)</h3>
        {orderItems.map((item) => (
          <div key={item.id} className="flex items-center space-x-3 p-3 bg-white rounded-lg border">
            <img
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              className="w-12 h-12 object-cover rounded bg-gray-100"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-black truncate">{item.name}</p>
              <p className="text-xs text-gray-500">{item.size} / {item.quantity}개</p>
              <p className="text-sm font-medium text-black">{(item.salePrice * item.quantity).toLocaleString()}원</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
