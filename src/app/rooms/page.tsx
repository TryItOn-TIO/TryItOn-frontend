'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createRoom, createRoomWithAxios } from '@/api/socketApi';
import type { CreateRoomRequest } from '@/types/socket';

export default function CreateRoomPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [roomData, setRoomData] = useState(null);
  const [formData, setFormData] = useState<CreateRoomRequest>({
    roomName: '',
    creatorName: '',
    maxUsers: 2
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'maxUsers' ? parseInt(value) : value
    }));
  };

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.roomName.trim() || !formData.creatorName.trim()) {
      alert('방 이름과 생성자 이름을 입력해주세요.');
      return;
    }

    setLoading(true);
    
    try {
      const response = await createRoomWithAxios(formData);
      setRoomData(response.room);
      
      // 생성자는 바로 채팅방으로 이동 (대기 상태)
      router.push(`/rooms/${response.room.inviteCode}/chat?creator=true&userName=${encodeURIComponent(formData.creatorName)}&userId=creator_${Date.now()}`);
      
      
    } catch (error) {
      console.error('방 생성 실패:', error);
      alert('방 생성에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = async (inviteLink: string) => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      alert('초대 링크가 복사되었습니다!');
    } catch (error) {
      console.error('링크 복사 실패:', error);
      alert('링크 복사에 실패했습니다.');
    }
  };

  const handleShareLink = async (inviteLink: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '함께 옷을 입어보세요!',
          text: `${formData.roomName}에 초대합니다.`,
          url: inviteLink
        });
      } catch (error) {
        console.error('공유 실패:', error);
      }
    } else {
      // Web Share API를 지원하지 않는 경우 링크 복사
      handleCopyLink(inviteLink);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">방 만들기</h1>
        
        {!roomData ? (
          <form onSubmit={handleCreateRoom} className="space-y-4">
            <div>
              <label htmlFor="roomName" className="block text-sm font-medium text-gray-700 mb-1">
                방 이름
              </label>
              <input
                type="text"
                id="roomName"
                name="roomName"
                value={formData.roomName}
                onChange={handleInputChange}
                placeholder="방 이름을 입력하세요"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="creatorName" className="block text-sm font-medium text-gray-700 mb-1">
                내 이름
              </label>
              <input
                type="text"
                id="creatorName"
                name="creatorName"
                value={formData.creatorName}
                onChange={handleInputChange}
                placeholder="이름을 입력하세요"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="maxUsers" className="block text-sm font-medium text-gray-700 mb-1">
                최대 인원
              </label>
              <select
                id="maxUsers"
                name="maxUsers"
                value={formData.maxUsers}
                onChange={(e) => setFormData(prev => ({ ...prev, maxUsers: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={2}>2명</option>
              </select>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '방 생성 중...' : '방 만들기'}
            </button>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <h2 className="text-lg font-semibold text-green-800 mb-2">
                🎉 방이 생성되었습니다!
              </h2>
              <p className="text-green-700">
                <strong>{roomData.name}</strong>
              </p>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
              <p className="text-sm text-gray-600 mb-2">초대 링크</p>
              <p className="text-sm font-mono bg-white border rounded px-2 py-1 break-all">
                {roomData.inviteLink}
              </p>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => handleCopyLink(roomData.inviteLink)}
                className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                링크 복사
              </button>
              <button
                onClick={() => handleShareLink(roomData.inviteLink)}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                공유하기
              </button>
            </div>
            
            <button
              onClick={() => router.push(`/rooms/${roomData.inviteCode}`)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              방 입장하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
