"use client";

import { useState } from "react";
import { GoogleSignupRequest } from "@/types/auth";

const SignupForm = ({
  onSubmit,
  isLoading,
}: {
  onSubmit: (data: GoogleSignupRequest) => void;
  isLoading: boolean;
}) => {
  const [formData, setFormData] = useState<GoogleSignupRequest>({
    username: "",
    birthDate: "",
    gender: "M",
    phoneNum: "",
    preferredStyle: "CASUAL",
    height: 0,
    weight: 0,
    shoeSize: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 필수 필드 검증
    if (!formData.username || !formData.birthDate || !formData.phoneNum) {
      alert("필수 정보를 모두 입력해주세요.");
      return;
    }

    onSubmit({
      ...formData,
      height: formData.height ? formData.height : 0,
      weight: formData.weight ? formData.weight : 0,
      shoeSize: formData.shoeSize ? formData.shoeSize : 0,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">이름 *</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">생년월일 *</label>
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">성별</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="M">남성</option>
          <option value="F">여성</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">전화번호 *</label>
        <input
          type="tel"
          name="phoneNum"
          value={formData.phoneNum}
          onChange={handleChange}
          placeholder="01012345678"
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">선호 스타일</label>
        <select
          name="preferredStyle"
          value={formData.preferredStyle}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="CASUAL">캐주얼</option>
          <option value="FORMAL">포멀</option>
          <option value="STREET">스트릿</option>
          <option value="VINTAGE">빈티지</option>
        </select>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">키 (cm)</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            min="100"
            max="250"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">몸무게 (kg)</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            min="30"
            max="200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">신발 사이즈</label>
          <input
            type="number"
            name="shoeSize"
            value={formData.shoeSize}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            min="200"
            max="350"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {isLoading ? "처리 중..." : "회원가입 완료"}
      </button>
    </form>
  );
};

export default SignupForm;
