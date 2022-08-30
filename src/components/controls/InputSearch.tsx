import { FC } from "react";
import { Controller } from "react-hook-form";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";


interface InputSearchProps {
  name: string;
  type?: string;
  control: any;
  defaultValue?: string;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  size?: "small" | "middle" | "large";
}
export const InputSearch: FC<InputSearchProps> = ({
  name,
  type = "text",
  control,
  disabled = false,
  placeholder = "",
  className = "",
  size = "small",
  defaultValue = "",
}) => {
  return (
    <div className="relative">
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Input
            allowClear
            {...field}
            type={type}
            id={name}
            className={`rounded my-1 py-2 ${className}`}
            size={size}
            disabled={disabled}
            placeholder={placeholder}
            defaultValue={defaultValue}
            prefix={<SearchOutlined className="text-gray-400" style={{ fontSize: '18px' }} />}
          />
        )}
      />
    </div>
  );
};
