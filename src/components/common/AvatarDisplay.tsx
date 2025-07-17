"use client";

import { useState } from 'react';
import { User } from 'lucide-react';

interface AvatarDisplayProps {
  avatarImageUrl?: string;
  avatarBaseImageUrl?: string;
  userBaseImageUrl?: string;
  username?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function AvatarDisplay({
  avatarImageUrl,
  avatarBaseImageUrl,
  userBaseImageUrl,
  username,
  size = 'md',
  className = ''
}: AvatarDisplayProps) {
  const [imageError, setImageError] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 우선순위에 따른 이미지 URL 배열
  const imageUrls = [
    avatarImageUrl,
    avatarBaseImageUrl,
    userBaseImageUrl
  ].filter(Boolean) as string[];

  console.log('=== AvatarDisplay 디버깅 ===');
  console.log('전달받은 props:');
  console.log('- avatarImageUrl:', avatarImageUrl);
  console.log('- avatarBaseImageUrl:', avatarBaseImageUrl);
  console.log('- userBaseImageUrl:', userBaseImageUrl);
  console.log('- username:', username);
  console.log('필터링된 이미지 URLs:', imageUrls);
  console.log('현재 인덱스:', currentImageIndex);
  console.log('현재 사용할 이미지:', imageUrls[currentImageIndex]);
  console.log('========================');

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const handleImageError = () => {
    console.error('이미지 로드 실패:', {
      url: imageUrls[currentImageIndex],
      index: currentImageIndex,
      totalUrls: imageUrls.length,
      timestamp: new Date().toISOString()
    });
    
    // 다음 이미지 URL로 시도
    if (currentImageIndex < imageUrls.length - 1) {
      console.log('다음 이미지 URL로 시도:', imageUrls[currentImageIndex + 1]);
      setCurrentImageIndex(currentImageIndex + 1);
      setImageError(false);
    } else {
      // 모든 이미지 URL 실패 시
      console.error('모든 이미지 URL 로드 실패');
      setImageError(true);
    }
  };

  const handleImageLoad = () => {
    console.log('이미지 로드 성공:', imageUrls[currentImageIndex]);
    setImageError(false);
  };

  const currentImageUrl = imageUrls[currentImageIndex];

  return (
    <div className={`${sizeClasses[size]} bg-gray-200 rounded-full flex items-center justify-center overflow-hidden ${className}`}>
      {!imageError && currentImageUrl ? (
        <img
          src={currentImageUrl}
          alt={username ? `${username}의 아바타` : '아바타'}
          className="w-full h-full object-cover"
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
      ) : (
        <User className={`${iconSizes[size]} text-gray-600`} />
      )}
    </div>
  );
}
