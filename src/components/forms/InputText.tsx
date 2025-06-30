type InputTextProps = {
  placeholder?: string;
  value: string;
  handleChange: (value: string) => void;
  type: string;
  isInvalid?: boolean;
  errorMessage?: string;
};

const InputText = (props: InputTextProps) => {
  return (
    <div className="w-full">
      <input
        type={props.type}
        className={`w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-base border ${
          props.isInvalid
            ? "border-red-500 focus:border-red-500"
            : "border-slate-200 focus:border-slate-400"
        } rounded-md px-3 py-2 transition duration-300 ease focus:outline-none hover:border-slate-300 shadow-sm focus:shadow`}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.handleChange(e.target.value)}
      />
      {props.isInvalid && (
        <p className="text-xs text-red-500 mt-1 pl-1">{props.errorMessage}</p>
      )}
    </div>
  );
};

export default InputText;
