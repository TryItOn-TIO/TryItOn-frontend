'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getRoomByInviteCode } from '@/api/socketApi';
import type { Room } from '@/types/socket';

export default function InviteRoomPage() {
  const params = useParams();
  const router = useRouter();
  const inviteCode = params.inviteCode as string;
  
  const [roomInfo, setRoomInfo] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userName, setUserName] = useState('');
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    if (inviteCode) {
      fetchRoomInfo();
    }
  }, [inviteCode]);

  const fetchRoomInfo = async () => {
    try {
      setLoading(true);
      const response = await getRoomByInviteCode(inviteCode);
      setRoomInfo(response.room);
    } catch (error: any) {
      console.error('방 정보 조회 실패:', error);
      setError(error.message || '방 정보를 불러올 수 없습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinRoom = async () => {
    if (!userName.trim()) {
      alert('이름을 입력해주세요.');
      return;
    }

    if (!roomInfo) return;

    setJoining(true);
    
    try {
      // 채팅방으로 바로 이동
      const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      router.push(`/rooms/${inviteCode}/chat?creator=false&userName=${encodeURIComponent(userName.trim())}&userId=${userId}`);
      
    } catch (error) {
      console.error('방 입장 실패:', error);
      alert('방 입장에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setJoining(false);
    }
  };

  const handleCopyLink = async () => {
    if (!roomInfo) return;
    
    try {
      await navigator.clipboard.writeText(roomInfo.inviteLink);
      alert('초대 링크가 복사되었습니다!');
    } catch (error) {
      console.error('링크 복사 실패:', error);
      alert('링크 복사에 실패했습니다.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">방 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-xl font-bold text-gray-800 mb-2">오류가 발생했습니다</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => router.push('/rooms')}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            방 만들기로 이동
          </button>
        </div>
      </div>
    );
  }

  if (!roomInfo) {
    return null;
  }

  const isRoomFull = roomInfo.currentUsers >= roomInfo.maxUsers;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {roomInfo.name}
          </h1>
          <p className="text-gray-600">
            {roomInfo.creator}님이 초대했습니다
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">현재 인원</span>
            <span className="text-sm font-medium">
              {roomInfo.currentUsers}/{roomInfo.maxUsers}명
            </span>
          </div>
          
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">생성 시간</span>
            <span className="text-sm">
              {new Date(roomInfo.createdAt).toLocaleString('ko-KR')}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">초대 코드</span>
            <span className="text-sm font-mono bg-white px-2 py-1 rounded border">
              {roomInfo.inviteCode}
            </span>
          </div>
        </div>

        {isRoomFull ? (
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
              <p className="text-red-700 font-medium">방이 가득 찼습니다</p>
              <p className="text-red-600 text-sm mt-1">
                현재 {roomInfo.maxUsers}명이 모두 입장해 있습니다.
              </p>
            </div>
            <button
              onClick={() => router.push('/rooms')}
              className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              새 방 만들기
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
                내 이름
              </label>
              <input
                type="text"
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="이름을 입력하세요"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleJoinRoom();
                  }
                }}
              />
            </div>
            
            <button
              onClick={handleJoinRoom}
              disabled={joining || !userName.trim()}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {joining ? '입장 중...' : '방 입장하기'}
            </button>
            
            <div className="flex space-x-2">
              <button
                onClick={handleCopyLink}
                className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm"
              >
                링크 복사
              </button>
              <button
                onClick={() => router.push('/rooms')}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              >
                새 방 만들기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
