import { FC } from "react";
import { Controller } from "react-hook-form";
import { InputNumber } from "antd";

interface InputNumberControlProps {
  name: string;
  control: any;
  errors?: any;
  isDisabled?: boolean;
  placeholder?: string;
  max?: number;
  min?: number;
  className?: string;
}
 const InputNumberControl: FC<InputNumberControlProps> = ({
  name,
  control,
  errors,
  isDisabled = false,
  placeholder = "",
  max = 999999999,
  min = 0,
  className = "",
}) => {
  let errMsg = errors?.[name]?.message;
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <InputNumber
            {...field}
            id={name}
            className={`rounded my-1 overflow-hidden ${className}`}
            status={errMsg && "error"}
            size="large"
            max={max}
            min={min}
            step={1}
            disabled={isDisabled}
            placeholder={placeholder}
            style={{ width: "100%" }}
          />
        )}
      />
      <p className="error-msg">{errMsg}</p>
    </>
  );
};

export default InputNumberControl