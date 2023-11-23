import React from "react";

type TextInputProps = {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  lblClassName?: string;
  error?: string;
};

const TextInput: React.FC<TextInputProps> = (props) => {
  return (
    <div className={props.className}>
      <label className={props.lblClassName}>
        {props.label}
        {props.required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        disabled={props.disabled}
        className="w-full p-2 border rounded-md"
        required={props.required}
      />
      {props.error && <p className="text-red-500">{props.error}</p>}
    </div>
  );
};

export default TextInput;
