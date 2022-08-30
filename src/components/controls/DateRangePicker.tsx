
import { FC } from "react";
import { Controller } from "react-hook-form";
import { DatePicker } from "antd";

const { RangePicker } = DatePicker;
interface DateRangePickerProps {
  name: string;
  control: any;
  errors?: any;
  isDisabled?: boolean;
  placeholder?: string;
  format?: string;
  className?: string;
}
 const DateRangePickerControl: FC<DateRangePickerProps> = ({
  name,
  control,
  errors,
  isDisabled = false,
  placeholder = "12/08/2022",
  format = "DD/MM/YYYY",
  className = "",
}) => {
  let errMsg = errors?.[name]?.message;
  return (
    <div>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <RangePicker
            allowClear
            {...field}
            id={name}
            className={`!my-1 !w-full  ${className}`}
            status={errMsg && "error"}
            size="large"
            disabled={isDisabled}
            placement={"bottomLeft"}
            format={format}
          />
        )}
      />
      <p className="text-red-600 text-xs">{errMsg}</p>
    </div>
  );
};

export default DateRangePickerControl
