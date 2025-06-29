import { SignupRequest } from "@/types/auth";
import { Gender } from "@/constants/Gender";
import { Style } from "@/constants/Style";
import InputText from "@/components/forms/InputText";
import BlackButton from "@/components/common/BlackButton";

type SignupFormProps<T extends SignupRequest> = {
  data: T;
  setData: React.Dispatch<React.SetStateAction<T>>;
  setStep?: React.Dispatch<React.SetStateAction<number>>;
  onSubmit?: (data: T) => void;
};

const SignupForm = <T extends SignupRequest>({
  data,
  setData,
  setStep,
  onSubmit,
}: SignupFormProps<T>) => {
  const handleSubmit = () => {
    setStep && setStep((prev) => prev + 1);
    onSubmit && onSubmit(data);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">닉네임 *</label>
        <InputText
          placeholder="닉네임"
          type="text"
          value={data.username}
          handleChange={(value) =>
            setData((prev) => ({ ...prev, username: value }))
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">생년월일 *</label>
        <InputText
          type="date"
          value={data.birthDate}
          handleChange={(value) =>
            setData((prev) => ({ ...prev, birthDate: value }))
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">성별 *</label>
        <select
          name="gender"
          value={data.gender}
          onChange={handleChange}
          className="w-full bg-transparent text-slate-700 text-sm border border-slate-700 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
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
          handleChange={(value) =>
            setData((prev) => ({ ...prev, phoneNum: value }))
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">선호 스타일 *</label>
        <select
          name="preferredStyle"
          value={data.preferredStyle}
          onChange={handleChange}
          className="w-full bg-transparent text-slate-700 text-sm border border-slate-700 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
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
            className="w-full p-2 border rounded"
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
            className="w-full p-2 border rounded"
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
            className="w-full p-2 border rounded"
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
