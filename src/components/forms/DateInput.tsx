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
    const newValue = e.target.value;
    onChange(newValue);
  };

  return (
    <div>
      <input
        type="date"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full bg-transparent text-slate-700 text-sm border rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow ${
          error ? "border-red-500" : "border-slate-200"
        }`}
        max={new Date().toISOString().split("T")[0]}
        min="1900-01-01"
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default DateInput;
