import { SignupRequest } from "@/types/auth";
import { Gender } from "@/constants/Gender";
import { Style } from "@/constants/Style";
import InputText from "@/components/forms/InputText";
import BlackButton from "@/components/common/BlackButton";
import DateInput from "@/components/forms/DateInput";
import { useState } from "react";
import { validateDate } from "@/utils/validator";

type SignupFormProps<T extends SignupRequest> = {
  data: T;
  setData: React.Dispatch<React.SetStateAction<T>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const SignupForm = <T extends SignupRequest>({
  data,
  setData,
  setStep,
}: SignupFormProps<T>) => {
  const [dateError, setDateError] = useState<string>("");

  const handleSubmit = () => {
    // 날짜 유효성 검사
    if (data.birthDate && !validateDate(data.birthDate)) {
      setDateError("올바른 날짜를 입력해주세요.");
      return;
    }

    setDateError("");
    setStep((prev) => prev + 1);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleNameChange = (value: string) => {
    setData((prev) => ({ ...prev, username: value }));
  };

  const handleDateChange = (value: string) => {
    setDateError("");
    setData((prev) => ({ ...prev, birthDate: value }));

    // 완전한 날짜가 입력되면 유효성 검사
    if (value.length === 10 && !validateDate(value)) {
      setDateError("올바른 날짜를 입력해주세요.");
    }
  };

  const handlePhoneNumChange = (value: string) => {
    // 숫자만 추출
    const numericValue = value.replace(/\D/g, "");

    // 전화번호 포맷팅 (010-0000-0000)
    let formattedValue = "";
    if (numericValue.length <= 3) {
      formattedValue = numericValue;
    } else if (numericValue.length <= 7) {
      formattedValue = `${numericValue.slice(0, 3)}-${numericValue.slice(3)}`;
    } else if (numericValue.length <= 11) {
      formattedValue = `${numericValue.slice(0, 3)}-${numericValue.slice(
        3,
        7
      )}-${numericValue.slice(7)}`;
    }

    // 11자리 숫자까지만 허용
    if (numericValue.length <= 11) {
      setData((prev) => ({ ...prev, phoneNum: formattedValue }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">닉네임 *</label>
        <InputText
          placeholder="닉네임"
          type="text"
          value={data.username}
          onChange={handleNameChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">생년월일 *</label>
        <DateInput
          value={data.birthDate}
          onChange={handleDateChange}
          error={dateError}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">성별 *</label>
        <select
          name="gender"
          value={data.gender}
          onChange={handleChange}
          className="w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
        >
          <option value={Gender.M}>남성</option>
          <option value={Gender.F}>여성</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">전화번호 *</label>
        <InputText
          placeholder="010-0000-0000"
          type="tel"
          value={data.phoneNum}
          onChange={handlePhoneNumChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">선호 스타일 *</label>
        <select
          name="preferredStyle"
          value={data.preferredStyle}
          onChange={handleChange}
          className="w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
        >
          <option value={Style.CASUAL}>캐주얼</option>
          <option value={Style.STREET}>스트릿</option>
          <option value={Style.HIPHOP}>힙합</option>
          <option value={Style.CHIC}>시크</option>
          <option value={Style.FORMAL}>포멀</option>
          <option value={Style.VINTAGE}>빈티지</option>
        </select>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">키 (cm) *</label>
          <input
            type="number"
            name="height"
            value={data.height}
            onChange={handleChange}
            className="w-full p-2 border rounded border-slate-200"
            min="100"
            max="250"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            몸무게 (kg) *
          </label>
          <input
            type="number"
            name="weight"
            value={data.weight}
            onChange={handleChange}
            className="w-full p-2 border rounded border-slate-200"
            min="30"
            max="200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            신발 사이즈 *
          </label>
          <input
            type="number"
            name="shoeSize"
            value={data.shoeSize}
            onChange={handleChange}
            className="w-full p-2 border rounded border-slate-200"
            min="150"
            max="350"
          />
        </div>
      </div>
      <div className="w-full mt-10">
        <BlackButton text="다음" />
      </div>
    </form>
  );
};

export default SignupForm;
