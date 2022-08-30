import { FC } from "react";
import { Controller } from "react-hook-form";
import { Input } from "antd";

interface PasswordControlProps {
  name: string;
  control: any;
  errors?: any;
  isDisabled?: boolean;
  placeholder?: string;
  className?: string;
}
 const PasswordControl: FC<PasswordControlProps> = ({
  name,
  control,
  errors,
  isDisabled = false,
  placeholder = "",
  className = "",
}) => {
  let errMsg = errors?.[name]?.message;
  return (
    <div className="relative">
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Input.Password
            allowClear
            {...field}
            id={name}
            className={`rounded my-1 ${className}`}
            status={errMsg && "error"}
            size="large"
            disabled={isDisabled}
            placeholder={placeholder}
          />
        )}
      />
      <p className="text-red-700 text-xs">{errMsg}</p>
    </div>
  );
};

export default PasswordControl;
