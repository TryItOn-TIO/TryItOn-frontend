'use client';

import { useState, useEffect } from 'react';
import type { AvatarUpdateData } from '@/types/socket';

interface AvatarDisplayProps {
  side: 'left' | 'right';
  userName?: string;
  onAvatarUpdate?: (data: AvatarUpdateData) => void;
}

export default function AvatarDisplay({ side, userName, onAvatarUpdate }: AvatarDisplayProps) {
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [productInfo, setProductInfo] = useState<any>(null);

  // 아바타 업데이트 이벤트 처리
  useEffect(() => {
    if (onAvatarUpdate) {
      const handleAvatarUpdate = (data: AvatarUpdateData) => {
        if (data.side === side) {
          setAvatarUrl(data.avatarUrl);
          setProductInfo(data.productInfo);
        }
      };

      // 부모 컴포넌트에서 아바타 업데이트 이벤트를 받을 수 있도록
      // 실제로는 Socket 이벤트 리스너에서 직접 처리해야 함
    }
  }, [side, onAvatarUpdate]);

  return (
    <div className={`flex flex-col items-center p-4 bg-white rounded-lg shadow ${
      side === 'left' ? 'border-l-4 border-blue-500' : 'border-r-4 border-green-500'
    }`}>
      {/* 사용자 정보 */}
      <div className="mb-4 text-center">
        <h3 className="font-semibold text-lg">
          {side === 'left' ? '왼쪽' : '오른쪽'} 사용자
        </h3>
        {userName && (
          <p className="text-sm text-gray-600">{userName}</p>
        )}
      </div>

      {/* 아바타 이미지 */}
      <div className="w-48 h-64 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-4">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={`${side} 아바타`}
            className="w-full h-full object-cover rounded-lg"
            onError={(e) => {
              console.error('아바타 이미지 로드 실패:', avatarUrl);
              setAvatarUrl('');
            }}
          />
        ) : (
          <div className="text-center text-gray-500">
            <div className="text-4xl mb-2">👤</div>
            <p className="text-sm">아바타 없음</p>
          </div>
        )}
      </div>

      {/* 상품 정보 */}
      {productInfo && (
        <div className="w-full p-3 bg-gray-50 rounded-md">
          <h4 className="font-medium text-sm mb-1">착용 중인 상품</h4>
          <p className="text-sm text-gray-700">{productInfo.name}</p>
          {productInfo.category && (
            <p className="text-xs text-gray-500">{productInfo.category}</p>
          )}
        </div>
      )}
    </div>
  );
}
