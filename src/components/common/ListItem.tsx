import { FC } from "react";
import { FaRegHandPointRight } from "react-icons/fa";
import { Divider, Image } from "antd";
import { getStyledStatus } from "@/lib/helpers";

interface ListItemProps {
  label: string;
  data?: string;
  img?: string;
  secondaryData?: string;
  status?: string;
  last?: boolean;
}
export const ListItem: FC<ListItemProps> = ({
  label,
  data,
  img,
  secondaryData,
  status,
  last = false,
}) => {
  return (
    <>
      <div className="flex items-center space-x-6 relative ">
        {/* <div>
          <FaRegHandPointRight />
        </div> */}
        <div>
          <h4 className="text-gray-500 mb-1.5 wave-money-text">{label}</h4>
          {status ? (
            <p className=" text-gray-600 font-medium wave-money-text">
              {status ? (
                getStyledStatus(status)
              ) : (
                <span className="text-xs">N/A</span>
              )}
            </p>
          ) : img ? (
            <Image width={100} src={img} alt="Image" />
          ) : (
            <p className=" text-gray-600 font-medium wave-money-text">
              {data ? data : <span className="text-xs">N/A</span>}
              {secondaryData && <span className="px-2">/</span>}
              {secondaryData}
            </p>
          )}
        </div>
      </div>
      {!last && <Divider className="relative my-4" />}
    </>
  );
};
