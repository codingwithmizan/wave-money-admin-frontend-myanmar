import { FC } from "react";
import { Controller } from "react-hook-form";
import { Checkbox } from "antd";

interface CheckboxControlProps {
  name: string;
  control: any;
  label: string;
  errors?: any;
  isDisabled?: boolean;
  className?: string;

}

 const CheckboxControl: FC<CheckboxControlProps> = ({
  name,
  control,
  label = "",
  errors,
  isDisabled = false,
  className = "",
}) => {
  let errMsg = errors?.[name]?.message;

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Checkbox
            {...field}
            disabled={isDisabled}
            className={`rounded my-1 ${className}`}
          >
            {label}
          </Checkbox>
        )}
      />
      <p className="text-red-600 text-xs">{errMsg}</p>
    </>
  );
};

export default CheckboxControl