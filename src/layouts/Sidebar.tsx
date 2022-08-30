import { FC } from "react";
import { SidebarMenu } from "./SidebarMenu";
import ekyc_logo from "@/assets/logo/app_logo.svg";
import ekyc_title from "@/assets/logo/app_logo_title.svg";
import * as dayjs from "dayjs";
interface SidebarProps {
  collapsed: boolean;
}

const MAX_WIDTH = 220;
const MIN_WIDTH = 65;
const TOP_HEIGHT = 180;

const Sidebar: FC<SidebarProps> = ({ collapsed }) => {
  return (
    <div>
      <div className="h-44 fixed top-0 z-10 bg-sidebar">
        {collapsed ? (
          <div className="relative top-5 left-1.5" style={{ width: MIN_WIDTH }}>
            <img src={ekyc_logo} alt="ekyc logo" />
          </div>
        ) : (
          <div
            className=" flex flex-col items-center mt-8"
            style={{ width: MAX_WIDTH }}
          >
            <img
              src={ekyc_logo}
              alt="ekyc logo"
              width={75}
              className="border"
            />
            <img src={ekyc_title} alt="ekyc title" width={120} className='mt-1' />
          </div>
        )}
      </div>
      <div style={{ marginTop: TOP_HEIGHT }}>
        <SidebarMenu />
      </div>
      {/* <div className="fixed text-white bottom-1 left-10  text-center text-[0.6rem] bg-app-100 border ">
        <p> Developed by Misfit @ 2022</p>
      </div>*/}
    </div>
  );
};

export default Sidebar;
