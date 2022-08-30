import { FC } from "react";
import { Controller } from "react-hook-form";
import type { RangePickerProps } from "antd/es/date-picker";
import { DatePicker } from "antd";
import moment from "moment";

const disabledDate: RangePickerProps["disabledDate"] = (current) => {
  // Can not select days before today and today
  // return current && current < moment().endOf('day');

  //   disable dates before current date and after 1 month of current date.
  //   return moment().add(-1, 'days')  >= current ||
  //   moment().add(1, 'month')  <= current;

  return moment().endOf("day") <= current;
};
interface DatePickerProps {
  name: string;
  control: any;
  errors?: any;
  defaultValue?: any;
  isDisabled?: boolean;
  placeholder?: string;
  format?: string;
  className?: string;
  allowClear?: boolean;
}
const DatePickerControl: FC<DatePickerProps> = ({
  name,
  control,
  errors,
  defaultValue,
  isDisabled = false,
  placeholder = "12/08/2022",
  format = "DD/MM/YYYY",
  className = "",
  allowClear = false,
}) => {
  let errMsg = errors?.[name]?.message;
  return (
    <div>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <DatePicker
            allowClear={allowClear}
            {...field}
            id={name}
            defaultValue={defaultValue}
            className={`rounded my-1 w-full ${className}`}
            status={errMsg && "error"}
            size="large"
            disabled={isDisabled}
            placeholder={placeholder}
            placement={"bottomLeft"}
            format={format}
            disabledDate={disabledDate}
          />
        )}
      />
      <p className="text-red-600 text-xs">{errMsg}</p>
    </div>
  );
};

export default DatePickerControl;
