type DateInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
};

const DateInput = ({
  value,
  onChange,
  placeholder = "1990-01-01",
  error,
}: DateInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    const digitsOnly = newValue.replace(/\D/g, "");

    if (digitsOnly.length > 8) {
      newValue = digitsOnly.substring(0, 8);
    } else if (digitsOnly.length > 4) {
      newValue = digitsOnly.substring(0, 4) + "-" + digitsOnly.substring(4);
    }
    if (digitsOnly.length > 6) {
      newValue = newValue.substring(0, 7) + "-" + newValue.substring(7);
    }

    onChange(newValue);
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full bg-transparent text-slate-700 text-sm border rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow ${
          error ? "border-red-500" : "border-slate-200"
        }`}
        maxLength={10}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default DateInput;
