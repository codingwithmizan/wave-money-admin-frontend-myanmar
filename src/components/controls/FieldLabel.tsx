import { FC } from "react";

interface FieldLabelProps {
  name: string;
  label: string;
  required?: boolean;
  className?: string;
}
export const FieldLabel: FC<FieldLabelProps> = ({
  name,
  label,
  required = false,
  className = "",
}) => {
  return (
    <label
      htmlFor={name}
      className={` whitespace-nowrap  font-medium relative wave-money-text ${className}`}
    >
      {label} {required && <span className="text-red-600">*</span>}
    </label>
  );
};
