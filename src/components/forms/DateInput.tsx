import { useState } from "react";

type DateInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
};

const DateInput = ({ value, onChange, placeholder = "1990-01-01", error }: DateInputProps) => {
  const [inputType, setInputType] = useState<"text" | "date">("text");

  const handleFocus = () => {
    setInputType("date");
  };

  const handleBlur = () => {
    if (!value) {
      setInputType("text");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    if (inputType === "date") {
      // date input에서 오는 값은 이미 YYYY-MM-DD 형식
      onChange(newValue);
    } else {
      // text input에서 오는 값은 포맷팅 필요
      const numericValue = newValue.replace(/\D/g, "");
      
      let formattedValue = "";
      if (numericValue.length <= 4) {
        formattedValue = numericValue;
      } else if (numericValue.length <= 6) {
        formattedValue = `${numericValue.slice(0, 4)}-${numericValue.slice(4)}`;
      } else if (numericValue.length <= 8) {
        formattedValue = `${numericValue.slice(0, 4)}-${numericValue.slice(4, 6)}-${numericValue.slice(6)}`;
      }
      
      if (numericValue.length <= 8) {
        onChange(formattedValue);
      }
    }
  };

  return (
    <div>
      <input
        type={inputType}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={inputType === "text" ? placeholder : ""}
        className={`w-full bg-transparent text-slate-700 text-sm border rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow ${
          error ? "border-red-500" : "border-slate-200"
        }`}
        max={new Date().toISOString().split('T')[0]} // 오늘 날짜까지만 선택 가능
        min="1900-01-01" // 1900년부터 선택 가능
      />
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
};

export default DateInput;
