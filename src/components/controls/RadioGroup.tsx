import { FC } from "react";
import { Controller } from "react-hook-form";
import { Radio, Space } from "antd";

interface RadioGroupControlProps {
  name: string;
  control: any;
  items: any[];
  errors?: any;
  isDisabled?: boolean;
  direction?: "horizontal" | "vertical";
}

 const RadioGroupControl: FC<RadioGroupControlProps> = ({
  name,
  control,
  items,
  errors,
  isDisabled = false,
  direction = "horizontal",
}) => {
  let errMsg = errors?.[name]?.message;

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Radio.Group
            {...field}
            disabled={isDisabled}
            className="rounded my-1 w-full"
            size="large"
          >
            <Space direction={direction}>
              <Radio value={1}>A</Radio>
              <Radio value={2}>B</Radio>
              <Radio value={3}>C</Radio>
              <Radio value={4}>D</Radio>
            </Space>
          </Radio.Group>
        )}
      />
      <p className="text-red-600 text-xs">{errMsg}</p>
    </>
  );
};

export default RadioGroupControl
