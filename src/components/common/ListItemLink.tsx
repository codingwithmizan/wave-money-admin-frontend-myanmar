import { FC } from "react";
import { Link } from "react-router-dom";
import { FaRegHandPointRight } from "react-icons/fa";
import { Divider } from "antd";

interface ListItemLinkProps {
  label: string;
  link: string;
  last?: boolean;
}
export const ListItemLink: FC<ListItemLinkProps> = ({ label, link, last }) => {
  return (
    <>
      <div className="flex items-center space-x-6 relative ">
        {/* <div>
          <FaRegHandPointRight />
        </div> */}
        <div>
          <h4 className="text-gray-500 mb-1.5 wave-money-text">{label}</h4>
          {link ? (
            <a
              href={link}
              target="_blank"
              className=" text-gray-600 font-medium underline wave-money-text"
            >
              Ref. File
            </a>
          ) : (
            <span className="text-xs">N/A</span>
          )}
        </div>
      </div>
      {!last && <Divider className="relative my-4" />}
    </>
  );
};
