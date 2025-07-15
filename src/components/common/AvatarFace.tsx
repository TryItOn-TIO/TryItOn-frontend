"use client";

import { User } from 'lucide-react';

interface AvatarFaceProps {
  avatarUrl?: string;
  username?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function AvatarFace({
  avatarUrl,
  username,
  size = 'md',
  className = ''
}: AvatarFaceProps) {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`${sizeClasses[size]} bg-gray-200 rounded-full flex items-center justify-center overflow-hidden ${className}`}>
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={username ? `${username}의 아바타` : '아바타'}
          className="w-full h-full object-cover"
          style={{
            objectPosition: 'center 10%', // 얼굴 부분에 더 집중
            transform: 'scale(1.2)' // 약간 확대해서 얼굴 부분을 더 크게
          }}
          onError={(e) => {
            console.error('아바타 이미지 로드 실패:', avatarUrl);
            e.currentTarget.style.display = 'none';
            const parent = e.currentTarget.parentElement;
            if (parent) {
              parent.innerHTML = `<svg class="${iconSizes[size]} text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>`;
            }
          }}
          onLoad={() => {
            console.log('아바타 얼굴 이미지 로드 성공:', avatarUrl);
          }}
        />
      ) : (
        <User className={`${iconSizes[size]} text-gray-600`} />
      )}
    </div>
  );
}
