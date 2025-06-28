import React, { Dispatch, SetStateAction } from "react";

type InputTextProps = {
  placeholder?: string;
  value: string;
  handleChange: Dispatch<SetStateAction<any>>;
  type: string;
  isValid?: boolean;
  errorMessage?: string;
};

const InputText = (props: InputTextProps) => {
  return (
    <>
      <div>
        <input
          type={props.type}
          className={`w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-${
            props.isValid ? "slate-200" : "red"
          } rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow`}
          placeholder={props.placeholder}
          value={props.value}
          onChange={(e) => props.handleChange(e.target.value)}
        />
        {props.errorMessage && (
          <p className="text-xs text-red-500 mt-1">{props.errorMessage}</p>
        )}
      </div>
    </>
  );
};

export default InputText;
