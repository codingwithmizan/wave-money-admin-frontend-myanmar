import { FC } from "react";
import { Radio } from "antd";
import { Key, SsidChartOutlined } from "@mui/icons-material";

interface ButtonGroupProps {
  selectedItem: any;
  selectedBtn: string;
  setSelectedBtn: (btn: string) => void;
  items: any[];
  className?: string;
}

export const ButtonGroup: FC<ButtonGroupProps> = ({
  items,
  selectedItem,
  selectedBtn,
  setSelectedBtn,
  className = "",
}) => {
  return (
    <Radio.Group
      size="large"
      value={selectedBtn}
      onChange={(e) => setSelectedBtn(e.target.value)}
    >
      {items.length > 0 &&
        items?.map((item: any) => (
          <Radio.Button
            key={item?.id}
            value={item?.value}
            className={`${className} rounded overflow-hidden border ${
              selectedModule(item?.value, selectedItem) &&
              "text-sky-500 font-medium"
            }`}
          >
            <span className="wave-money-text">{item?.label}</span>
          </Radio.Button>
        ))}
    </Radio.Group>
  );
};

const selectedModule: any = (module: string, selectedModule: any) => {
  const select: any = Object.entries(selectedModule).filter(
    ([key, value]) => key === module
  )[0][1];
  return select.length > 0;
};
