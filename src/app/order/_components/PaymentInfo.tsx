type PaymentInfoProps ={
  orderName: string;
  amount: number;
}

export default function PaymentInfo({ orderName, amount }: PaymentInfoProps) {
  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-600">주문명</span>
        <span className="text-sm font-medium text-black">{orderName}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">결제금액</span>
        <span className="text-lg font-bold text-black">{amount.toLocaleString()}원</span>
      </div>
    </div>
  );
}
