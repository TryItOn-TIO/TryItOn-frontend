interface CouponSectionProps {
  ready: boolean;
  onCouponChange: (isChecked: boolean) => void;
}

export default function CouponSection({ ready, onCouponChange }: CouponSectionProps) {
  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          className="rounded"
          disabled={!ready}
          onChange={(event) => onCouponChange(event.target.checked)}
        />
        <span className="text-sm text-black">5,000원 쿠폰 적용</span>
      </label>
    </div>
  );
}
