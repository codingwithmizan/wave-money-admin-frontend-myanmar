import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, MenuProps } from "antd";
import { SettingOutlined, DotChartOutlined } from "@ant-design/icons";
import { MdCloudUpload, MdReport, MdTransform } from "react-icons/md";
import {
  RiSettings2Fill,
  RiUserSettingsFill,
  RiNotification2Fill,
} from "react-icons/ri";
import {
  HiViewGrid,
  HiUserGroup,
  HiOutlineDocumentReport,
  HiOutlineFolderRemove,
} from "react-icons/hi";
import { FaDatabase, FaUser } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { GoPrimitiveDot } from "react-icons/go";
import { useAppSelector } from "@/app";
import { SUB_MENUS, ROLES as RBP } from "@/lib/constants";
import Cookies from "js-cookie";
import { checkRoleBasedPermission } from "@/lib/helpers";

const { MANAGEMENTS, BULK_UPLOADS, REPORTS, OTCS, SUBSCRIBERS } = SUB_MENUS;
const roles = Cookies.get("permission_codes")?.split(",");
const items: MenuProps["items"] = [
  {
    label: (
      <NavLink to="/" className="menu-item">
        Dashboard
      </NavLink>
    ),
    key: "dashboard",
    icon: <HiViewGrid />,
    disabled: checkRoleBasedPermission("SIDEBAR", roles, RBP.DASHBOARD),
  },
  {
    label: "OTC Profiles",
    key: "otcs",
    icon: <FaDatabase size={12} />,
    disabled: checkRoleBasedPermission("SIDEBAR", roles, RBP.OTC.READ),
    children: [
      {
        label: (
          <NavLink to="/otc-profiles" className="sub-menu-item">
            All Profiles
          </NavLink>
        ),
        key: "all-otc-profiles",
        icon: <GoPrimitiveDot className="inline-block" />,
        disabled: checkRoleBasedPermission("SIDEBAR", roles, RBP.OTC.READ),
      },
      {
        label: (
          <NavLink to="/otc/pending-to-approve" className="sub-menu-item">
            Pending to Approve
          </NavLink>
        ),
        key: "pending-to-approve-otc-profiles",
        icon: <GoPrimitiveDot className="inline-block" />,
        disabled: checkRoleBasedPermission("SIDEBAR", roles, RBP.OTC.READ),
      },
      {
        label: (
          <NavLink to="/otc/pending-to-review-edited" className="sub-menu-item">
            Pending to Review Edited
          </NavLink>
        ),
        key: "pending-to-review-edited-otc-profiles",
        icon: <GoPrimitiveDot className="inline-block" />,
        disabled: checkRoleBasedPermission("SIDEBAR", roles, RBP.OTC.READ),
      },
      {
        label: (
          <NavLink to="/otc/pending-to-recommends" className="sub-menu-item">
            Pending to Recommend
          </NavLink>
        ),
        key: "pending-to-recommend-otc-profiles",
        icon: <GoPrimitiveDot className="inline-block" />,
        disabled: checkRoleBasedPermission("SIDEBAR", roles, RBP.OTC.READ),
      },
      {
        label: (
          <NavLink to="/otc/recommend-to-approves" className="sub-menu-item">
            Recommend to Approve
          </NavLink>
        ),
        key: "recommend-to-approve-otc-profiles",
        icon: <GoPrimitiveDot className="inline-block" />,
        disabled: checkRoleBasedPermission("SIDEBAR", roles, RBP.OTC.READ),
      },
      {
        label: (
          <NavLink to="/otc/recommend-to-rejects" className="sub-menu-item">
            Recommend to Reject
          </NavLink>
        ),
        key: "recommend-to-reject-otc-profiles",
        icon: <GoPrimitiveDot className="inline-block" />,
        disabled: checkRoleBasedPermission("SIDEBAR", roles, RBP.OTC.READ),
      },
      {
        label: (
          <NavLink to="/otc/approved/list" className="sub-menu-item">
            Approved
          </NavLink>
        ),
        key: "approved-otc-profiles",
        icon: <GoPrimitiveDot className="inline-block" />,
        disabled: checkRoleBasedPermission("SIDEBAR", roles, RBP.OTC.READ),
      },
      {
        label: (
          <NavLink to="/otc/rejected/list" className="sub-menu-item">
            Rejected
          </NavLink>
        ),
        key: "rejected-otc-profiles",
        icon: <GoPrimitiveDot className="inline-block" />,
        disabled: checkRoleBasedPermission("SIDEBAR", roles, RBP.OTC.READ),
      },
    ],
  },
  {
    label: "Wallet Subscribers",
    key: "wallet-subscribers",
    icon: <FaDatabase size={12} />,
    disabled: checkRoleBasedPermission("SIDEBAR", roles, RBP.OTC.READ),
    children: [
      {
        label: (
          <NavLink to="/subscribers/add" className="sub-menu-item">
            Add New Subscriber
          </NavLink>
        ),
        key: "add-new-subscriber",
        icon: <GoPrimitiveDot className="inline-block" />,
        disabled: checkRoleBasedPermission("SIDEBAR", roles, RBP.OTC.READ),
      },
      {
        label: (
          <NavLink to="all-subscribers" className="sub-menu-item">
            All Subscribers
          </NavLink>
        ),
        key: "all-subscribers",
        icon: <GoPrimitiveDot className="inline-block" />,
        disabled: checkRoleBasedPermission("SIDEBAR", roles, RBP.OTC.READ),
      },

      {
        label: (
          <NavLink to="/subscribers/not-submitted" className="sub-menu-item">
            Not Submitted
          </NavLink>
        ),
        key: "not-submitted-subscribers",
        icon: <GoPrimitiveDot className="inline-block" />,
        disabled: checkRoleBasedPermission("SIDEBAR", roles, RBP.OTC.READ),
      },
      {
        label: (
          <NavLink
            to="/subscribers/pending-to-approve"
            className="sub-menu-item"
          >
            Pending to Approve
          </NavLink>
        ),
        key: "pending-to-approve-subscribers",
        icon: <GoPrimitiveDot className="inline-block" />,
        disabled: checkRoleBasedPermission("SIDEBAR", roles, RBP.OTC.READ),
      },
      {
        label: (
          <NavLink
            to="/subscribers/pending-to-recommend"
            className="sub-menu-item"
          >
            Pending to Recommend
          </NavLink>
        ),
        key: "pending-to-recommend-subscribers",
        icon: <GoPrimitiveDot className="inline-block" />,
        disabled: checkRoleBasedPermission("SIDEBAR", roles, RBP.OTC.READ),
      },
      {
        label: (
          <NavLink
            to="/subscribers/recommend-to-approve"
            className="sub-menu-item"
          >
            Recommend to Approve
          </NavLink>
        ),
        key: "recommend-to-approve-subscribers",
        icon: <GoPrimitiveDot className="inline-block" />,
        disabled: checkRoleBasedPermission("SIDEBAR", roles, RBP.OTC.READ),
      },
      {
        label: (
          <NavLink
            to="/subscribers/recommend-to-reject"
            className="sub-menu-item"
          >
            Recommend to Reject
          </NavLink>
        ),
        key: "recommend-to-reject-subscribers",
        icon: <GoPrimitiveDot className="inline-block" />,
        disabled: checkRoleBasedPermission("SIDEBAR", roles, RBP.OTC.READ),
      },
      {
        label: (
          <NavLink to="/subscribers/approved" className="sub-menu-item">
            Approved
          </NavLink>
        ),
        key: "approved-subscribers",
        icon: <GoPrimitiveDot className="inline-block" />,
        disabled: checkRoleBasedPermission("SIDEBAR", roles, RBP.OTC.READ),
      },
      {
        label: (
          <NavLink to="/subscribers/rejected" className="sub-menu-item">
            Rejected
          </NavLink>
        ),
        key: "rejected-subscribers",
        icon: <GoPrimitiveDot className="inline-block" />,
        disabled: checkRoleBasedPermission("SIDEBAR", roles, RBP.OTC.READ),
      },
    ],
  },
  {
    label: "Management",
    key: "management",
    icon: <RiUserSettingsFill />,
    disabled:
      checkRoleBasedPermission("SIDEBAR", roles, RBP.PORTAL_USER.READ) &&
      checkRoleBasedPermission("SIDEBAR", roles, RBP.ROLE.READ) &&
      checkRoleBasedPermission("SIDEBAR", roles, RBP.COMPANY.READ),
    children: [
      {
        label: (
          <NavLink to="/user/list" className="sub-menu-item">
            User
          </NavLink>
        ),
        key: "user-management",
        icon: <GoPrimitiveDot className="inline-block" />,
        disabled: checkRoleBasedPermission(
          "SIDEBAR",
          roles,
          RBP.PORTAL_USER.READ
        ),
      },
      {
        label: (
          <NavLink to="/role/list" className="sub-menu-item">
            Role
          </NavLink>
        ),
        key: "role-management",
        icon: <GoPrimitiveDot className="inline-block" />,
        disabled: checkRoleBasedPermission("SIDEBAR", roles, RBP.ROLE.READ),
      },
      {
        label: (
          <NavLink to="/company/list" className="sub-menu-item">
            Company
          </NavLink>
        ),
        key: "company-management",
        icon: <GoPrimitiveDot className="inline-block" />,
        disabled: checkRoleBasedPermission("SIDEBAR", roles, RBP.COMPANY.READ),
      },
    ],
  },

  {
    label: "Bulk Upload",
    key: "bulk-uploads",
    icon: <MdCloudUpload />,
    children: [
      {
        label: (
          <NavLink to="/bulk-list" className="sub-menu-item">
            Bulk List
          </NavLink>
        ),
        key: "bulk-list",
        icon: <GoPrimitiveDot className="inline-block" />,
      },
      {
        label: (
          <NavLink to="/bulk-upload-creation" className="sub-menu-item">
            Bulk Upload for Creation
          </NavLink>
        ),
        key: "bulk-upload-for-creation",
        icon: <GoPrimitiveDot className="inline-block" />,
      },
      {
        label: (
          <NavLink to="/bulk-upload-modification" className="sub-menu-item">
            Bulk Upload for Modification
          </NavLink>
        ),
        key: "bulk-upload-for-modification",
        icon: <GoPrimitiveDot className="inline-block" />,
      },
    ],
  },
  {
    label: (
      <NavLink to="/audit-trail/list" className="menu-item">
        Audit Trail
      </NavLink>
    ),
    key: "audit-trail",
    icon: <HiOutlineFolderRemove />,
  },
];

const FilteredMenuItems = items?.filter((item: any) => !item?.disabled);
const menus: any[] = [];
FilteredMenuItems.forEach((menuItem: any) => {
  const menu = { ...menuItem };
  if (menuItem?.children) {
    const filteredChilds = menuItem.children.filter(
      (childItem: any) => !childItem.disabled
    );
    menu["children"] = filteredChilds;
  }
  menus.push(menu);
});

export const SidebarMenu = () => {
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const { global } = useAppSelector((state) => state);

  useEffect(() => {
    if (MANAGEMENTS.includes(global?.seletedPage)) {
      setOpenKeys(["management"]);
    } else if (BULK_UPLOADS.includes(global?.seletedPage)) {
      setOpenKeys(["bulk-uploads"]);
    } else if (REPORTS.includes(global?.seletedPage)) {
      setOpenKeys(["reports"]);
    } else if (OTCS.includes(global?.seletedPage)) {
      setOpenKeys(["otcs"]);
    } else if (SUBSCRIBERS.includes(global?.seletedPage)) {
      setOpenKeys(["wallet-subscribers"]);
    } else {
      setOpenKeys([]);
    }
  }, [global?.seletedPage]);

  const onOpenChange = (keys: string[]) => {
    setOpenKeys([...keys]);
  };
  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={["dashboard"]}
      selectedKeys={[`${global?.seletedPage}`]}
      onOpenChange={onOpenChange}
      openKeys={openKeys}
      mode="inline"
      items={menus}
      key="management"
    />
  );
};
