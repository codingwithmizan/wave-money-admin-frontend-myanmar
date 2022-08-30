import { FC } from "react";
import { Controller } from "react-hook-form";
import { Checkbox } from "antd";

interface CheckboxGroupProps {
  control: any;
  name: string;
  options: any[];
}

export const CheckboxGroup: FC<CheckboxGroupProps> = ({
  control,
  name,
  options,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => <Checkbox.Group {...field} options={options}  />}
    />
  );
};
