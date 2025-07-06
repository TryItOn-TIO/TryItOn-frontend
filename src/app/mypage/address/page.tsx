"use client";

import { useState } from "react";
import { ChevronLeft, Plus, Edit, Trash2, MapPin, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAddresses } from "@/hooks/useMypage";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { Address, AddressRequest } from "@/types/mypage";

export default function AddressPage() {
  useAuthGuard();
  const router = useRouter();
  const { addresses, isLoading, error, addAddress, updateAddress, deleteAddress } = useAddresses();
  
  // 디버깅: 받아온 데이터 구조 확인
  console.log('Addresses data:', addresses);
  
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState<AddressRequest>({
    zipCode: '',
    address: '',
    addressDetail: '',
    receiver: '',
    primaryNum: '',
    alternateNum: '',
    isDefaultAddr: false,
    deliverRequest: '',
  });

  const resetForm = () => {
    setFormData({
      zipCode: '',
      address: '',
      addressDetail: '',
      receiver: '',
      primaryNum: '',
      alternateNum: '',
      isDefaultAddr: false,
      deliverRequest: '',
    });
    setEditingAddress(null);
    setShowForm(false);
  };

  const handleEdit = (address: Address) => {
    setFormData({
      zipCode: address.zipCode,
      address: address.address,
      addressDetail: address.addressDetail,
      receiver: address.receiver,
      primaryNum: address.primaryNum,
      alternateNum: address.alternateNum || '', // null인 경우 빈 문자열로 처리
      isDefaultAddr: address.isDefaultAddr,
      deliverRequest: address.deliverRequest,
    });
    setEditingAddress(address);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingAddress) {
        await updateAddress(editingAddress.addressId, formData);
      } else {
        await addAddress(formData);
      }
      resetForm();
    } catch (error) {
      console.error('배송지 저장 실패:', error);
    }
  };

  const handleDelete = async (addressId: number) => {
    if (confirm('정말로 이 배송지를 삭제하시겠습니까?')) {
      try {
        await deleteAddress(addressId);
      } catch (error) {
        console.error('배송지 삭제 실패:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">배송지를 불러오는 중...</div>
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
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button
              onClick={() => router.back()}
              className="mr-4 p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">배송지 관리</h1>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
          >
            <Plus className="w-4 h-4 mr-2" />
            배송지 추가
          </button>
        </div>

        {/* 배송지 목록 */}
        {addresses.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">등록된 배송지가 없습니다</h3>
            <p className="text-gray-500 mb-4">첫 배송지를 등록해보세요!</p>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800"
            >
              배송지 추가
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {addresses.map((address, index) => (
              <div key={address.addressId || index} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="font-semibold text-gray-900 mr-2">
                        {address.receiver}
                      </h3>
                      {address.isDefaultAddr && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          <Star className="w-3 h-3 mr-1" />
                          기본 배송지
                        </span>
                      )}
                    </div>
                    <div className="text-gray-600 space-y-1">
                      <p>({address.zipCode}) {address.address}</p>
                      <p>{address.addressDetail}</p>
                      <p>연락처: {address.primaryNum}</p>
                      {address.alternateNum && (
                        <p>보조 연락처: {address.alternateNum}</p>
                      )}
                      {address.deliverRequest && (
                        <p className="text-sm text-gray-500">
                          배송 요청사항: {address.deliverRequest}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleEdit(address)}
                      className="p-2 text-gray-400 hover:text-gray-600"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(address.addressId)}
                      className="p-2 text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 배송지 추가/수정 폼 모달 */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  {editingAddress ? '배송지 수정' : '배송지 추가'}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      우편번호 *
                    </label>
                    <input
                      type="text"
                      value={formData.zipCode}
                      onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="12345"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      주소 *
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="서울시 강남구 테헤란로 123"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      상세주소
                    </label>
                    <input
                      type="text"
                      value={formData.addressDetail}
                      onChange={(e) => setFormData({...formData, addressDetail: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="456호"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      받는 사람 *
                    </label>
                    <input
                      type="text"
                      value={formData.receiver}
                      onChange={(e) => setFormData({...formData, receiver: e.target.value})}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="홍길동"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      연락처 *
                    </label>
                    <input
                      type="tel"
                      value={formData.primaryNum}
                      onChange={(e) => setFormData({...formData, primaryNum: e.target.value})}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="010-1234-5678"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      보조 연락처
                    </label>
                    <input
                      type="tel"
                      value={formData.alternateNum}
                      onChange={(e) => setFormData({...formData, alternateNum: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="02-123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      배송 요청사항
                    </label>
                    <textarea
                      value={formData.deliverRequest}
                      onChange={(e) => setFormData({...formData, deliverRequest: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="문 앞에 놓아주세요"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isDefaultAddr"
                      checked={formData.isDefaultAddr}
                      onChange={(e) => setFormData({...formData, isDefaultAddr: e.target.checked})}
                      className="mr-2"
                    />
                    <label htmlFor="isDefaultAddr" className="text-sm text-gray-700">
                      기본 배송지로 설정
                    </label>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                    >
                      {editingAddress ? '수정' : '추가'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
