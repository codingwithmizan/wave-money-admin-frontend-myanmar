import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getData } from "@/lib/services";
import { Card, Col, Row } from "antd";
import { ButtonGroup } from "@/components/controls";
import { FiEdit } from "react-icons/fi";
import {
  humanize,
  titleCase,
  getFilteredRoles,
  getUserPermissions,
} from "@/lib/helpers";
import { useCommon } from "@/hooks";
import { ROLES } from "@/lib/constants";
import {ListItem} from '@/components/common'

const roleEdit = getUserPermissions(ROLES?.ROLE?.UPDATE);

interface RoleDetailsProps {
  role: any;
}
export const RoleDetails: FC<RoleDetailsProps> = ({ role }) => {
  const [btnGroup, setBtnGroup] = useState<any>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<any>({});
  const [modules, setModules] = useState<any>([]);
  const { loading, setLoading } = useCommon();
  const [selectedBtn, setSelectedBtn] = useState("DASHBOARD");

  useEffect(() => {
    getAllModules();
  }, []);

  const getAllModules = async () => {
    setLoading(true);
    const res = await getData("roles/permissions");
    setLoading(false);
    if (res?.success) {
      setBtnGroup(
        res?.data?.map((item: any, i: number) => ({
          id: i + 1,
          value: item?.module,
          label:
            item?.module.length <= 3 || item?.module === "MSISDN"
              ? humanize(item?.module)
              : titleCase(humanize(item?.module)),
        }))
      );
      setModules(
        res?.data?.map((moduleItem: any) => ({
          module: moduleItem?.module,
          permissions: moduleItem?.permissions?.map((item: any, i: number) => ({
            id: i + 1,
            value: item?.code,
            label: item?.title,
          })),
        }))
      );
    } else {
      console.log(res?.message);
    }
  };

  useEffect(() => {
    setSelectedPermissions({
      DASHBOARD: getFilteredRoles(role?.permission_codes, ROLES.DASHBOARD),
      PORTAL_USER: getFilteredRoles(
        role?.permission_codes,
        ROLES.PORTAL_USER.READ
      ),
      COMPANY: getFilteredRoles(role?.permission_codes, ROLES.COMPANY.READ),
      ROLE: getFilteredRoles(role?.permission_codes, ROLES.ROLE.READ),
      OTC: getFilteredRoles(role?.permission_codes, ROLES.OTC.READ),
      // KYC_PROFILE: getFilteredRoles(role?.permission_codes, ROLES.KYC_PROFILE),
      // MSISDN: getFilteredRoles(role?.permission_codes, ROLES.MSISDN),
      // POI: getFilteredRoles(role?.permission_codes, ROLES.POI),
      // HISTORICAL_DATA: getFilteredRoles(
      //   role?.permission_codes,
      //   ROLES.HISTORICAL_DATA
      // ),
      // NOTIFICATION: getFilteredRoles(
      //   role?.permission_codes,
      //   ROLES.NOTIFICATION
      // ),
      // ALERT: getFilteredRoles(role?.permission_codes, ROLES.ALERT),
    });
  }, [role]);

  const selectedModule: any = modules.find(
    (item: any) => item.module === selectedBtn
  );

  const selectedPermissionCodes: string[] = selectedModule?.permissions?.filter(
    (item: any) => role?.permission_codes?.includes(item?.value)
  );

  return (
    <Row>
      <Col
        xs={{ span: 22 }}
        sm={{ span: 22 }}
        md={{ span: 22 }}
        lg={{ span: 22 }}
        xl={{ span: 22 }}
        xxl={{ span: 22 }}
      >
        <div className="mb-5 flex">
          <div className="font-medium text-gray-600 w-8 text-right">Role</div>
          <div className=" font-semibold mx-3">:</div>
          <div className=" text-gray-600">{role?.name}</div>
        </div>
        <div className="mb-5 flex">
          <div className="font-medium text-gray-600 w-12 text-right ">
            Company
          </div>
          <div className="font-semibold pl-2 mx-4">:</div>
          <div className=" text-gray-600">{role.tenant?.company_name}</div>
        </div>
        <div className="mb-2 flex">
          <div className="font-medium text-gray-600 w-14 text-right wave-money-text">
            Modules
          </div>
        </div>

        <div className="border p-4 rounded">
          <div>
            <ButtonGroup
              items={btnGroup}
              selectedItem={selectedPermissions}
              selectedBtn={selectedBtn}
              setSelectedBtn={setSelectedBtn}
              className="w-40 m-2 text-center"
            />
          </div>
          <div className="mt-4 mb-6 ml-2">
            <h2 className="font-semibold mb-2">Permissions </h2>
            <ol className="list-decimal ml-4 ">
              {selectedPermissionCodes?.map((item: any) => (
                <li key={item.id} className="wave-money-text my-1 text-gray-700">
                  {item.label}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Col>
      <Col
        xs={{ span: 2 }}
        sm={{ span: 2 }}
        md={{ span: 2 }}
        lg={{ span: 2 }}
        xl={{ span: 2 }}
        xxl={{ span: 2 }}
      >
        {roleEdit.isAuthorized && (
          <div className="flex justify-end">
            <Link to={`/role/edit/${role.id}`} className="flex gap-2">
              <FiEdit className="text-sky-700 text-lg" />
              <span className="text-sky-700 font-medium">Edit</span>
            </Link>
          </div>
        )}
      </Col>
    </Row>
  );
};
