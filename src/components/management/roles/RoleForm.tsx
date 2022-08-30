import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { postData, updateData, getData } from "@/lib/services";
import { toast } from "react-toastify";
import { Button, Col, Row } from "antd";
import { DevTool } from "@hookform/devtools";
import { useCommon } from "@/hooks";
import {
  FieldLabel,
  Input,
  ButtonGroup,
  CheckboxGroup,
  Select,
} from "@/components/controls";
import { LoadingSpiner } from "@/components/common";
import { humanize, titleCase, getFilteredRoles } from "@/lib/helpers";
import { ROLES } from "@/lib/constants";
import Cookies from "js-cookie";
import _ from "lodash";
interface RoleFormProps {
  formMode: "CREATE" | "UPDATE";
  role?: any;
}

export const RoleForm: FC<RoleFormProps> = ({ formMode, role }) => {
  const [btnGroup, setBtnGroup] = useState<any>([]);
  const [modules, setModules] = useState<any>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<any>({});
  const [companies, setCompanies] = useState<any[]>([]);
  const [selectedBtn, setSelectedBtn] = useState("DASHBOARD");
  const navigate = useNavigate();
  const { loading, setLoading } = useCommon();
  const userRole = Cookies.get("role") || "";

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(
      userRole === "SuperAdmin" ? superAdminSchema : userSchema
    ),
    mode: "all",
    defaultValues: {
      role: "",
      company: "",
      DASHBOARD: [],
      PORTAL_USER: [],
      COMPANY: [],
      ROLE: [],
      OTC: [],
      // KYC_PROFILE: [],
      // MSISDN: [],
      // POI: [],
      // HISTORICAL_DATA: [],
      // NOTIFICATION: [],
      // ALERT: [],
    },
  });

  useEffect(() => {
    getAllModules();
    getAllCompanies();
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

  const getAllCompanies = async () => {
    setLoading(true);
    const res = await getData("tenants", {});
    setLoading(false);
    if (res?.success) {
      setCompanies(
        res?.data?.map((company: any) => ({
          id: company?.id,
          label: company?.company_name,
          value: company?.id + "",
        }))
      );
    } else {
      console.log("Something went wrong");
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

  useEffect(() => {
    if (formMode === "UPDATE") {
      reset({
        role: role?.name,
        company: role?.tenant?.id+"",
        DASHBOARD: selectedPermissions.DASHBOARD,
        PORTAL_USER: selectedPermissions.PORTAL_USER,
        COMPANY: selectedPermissions.COMPANY,
        ROLE: selectedPermissions.ROLE,
        OTC: selectedPermissions.OTC,
        // KYC_PROFILE: selectedPermissions.KYC_PROFILE,
        // MSISDN: selectedPermissions.MSISDN,
        // POI: selectedPermissions.POI,
        // HISTORICAL_DATA: selectedPermissions.HISTORICAL_DATA,
        // NOTIFICATION: selectedPermissions.NOTIFICATION,
        // ALERT: selectedPermissions.ALERT,
      });
    }
  }, [selectedPermissions, reset]);

  const onSubmit = async (data: any) => {
    const permission_codes = [
      ...data.DASHBOARD,
      ...data.PORTAL_USER,
      ...data.COMPANY,
      ...data.ROLE,
      ...data.OTC,
      // ...data.KYC_PROFILE,
      // ...data.MSISDN,
      // ...data.POI,
      // ...data.HISTORICAL_DATA,
      // ...data.NOTIFICATION,
      // ...data.ALERT,
    ];
    const formData = {
      name: data?.role,
      tenant_id: +data?.company,
      permission_codes,
    };

    if (permission_codes.length > 0) {
      if (formMode === "CREATE") {
        const res = await postData("roles", formData);
        if (res?.success) {
          toast.success(res?.message);
          navigate("/role/list");
        } else {
          toast.error(res?.message);
        }
      } else {
        const res = await updateData("roles", formData, role?.id);
        if (res?.success) {
          toast.success(res?.message);
          navigate("/role/list");
        } else {
          toast.error(res?.message);
        }
      }
    } else {
      toast.error("At least 1 permission must be selected.");
    }
  };

  const btnCancel = () => navigate("/role/list");

  if (loading) {
    return (
      <div className="flex justify-center mt-48 ">
        <LoadingSpiner />
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <div className="mb-1">
            <FieldLabel
              name="role"
              label="Role"
              className="font-medium text-base text-gray-600"
              required
            />
          </div>
          <div className="w-96">
            <Input
              control={control}
              name="role"
              errors={errors}
              placeholder="e.g. Super Admin"
            />
          </div>
        </div>

        {userRole === "SuperAdmin" && (
          <div className="form-group">
            <div className="w-20 ">
              <FieldLabel
                name="company"
                label="Company"
                className="font-medium text-base text-gray-600"
                required
              />
            </div>
            <div className="w-96">
              <Select
                control={control}
                name="company"
                options={companies}
                errors={errors}
                placeholder="Please select company"
              />
            </div>
          </div>
        )}

        <div className="mb-2 flex">
          <div className="font-medium  text-gray-600 wave-money-text">
            Modules
          </div>
        </div>

        <div className="border p-4 rounded">
          <Row>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 24 }}
              lg={{ span: 24 }}
              xl={{ span: 24 }}
              xxl={{ span: 24 }}
            >
              <div>
                {!_.isEmpty(selectedPermissions) && (
                  <ButtonGroup
                    items={btnGroup}
                    selectedItem={selectedPermissions}
                    selectedBtn={selectedBtn}
                    setSelectedBtn={setSelectedBtn}
                    className="w-40 m-2 text-center"
                  />
                )}
              </div>
            </Col>
          </Row>

          <h4 className="my-2 font-semibold wave-money-text">Permissions </h4>
          {modules.map((item: any) => (
            <div
              key={item.id}
              className={`my-2 ml-2 role ${
                item?.module !== selectedBtn && "hidden"
              }`}
            >
              <CheckboxGroup
                control={control}
                name={item.module}
                options={item?.permissions}
              />
            </div>
          ))}
        </div>
        <div className="flex gap-6 ml-8 mt-12 justify-center">
          <div className="w-72">
            <Button
              type="primary"
              block
              ghost
              size="large"
              className="btn-cancel wave-money-text"
              onClick={btnCancel}
            >
              Cancel
            </Button>
          </div>
          <div className="w-72">
            <Button
              type="primary"
              block
              htmlType="submit"
              className="btn-submit"
              size="large"
              disabled={!isDirty || !isValid}
              loading={isSubmitting}
            >
              Submit
            </Button>
          </div>
        </div>
      </form>

      {/* <DevTool control={control} /> */}
    </>
  );
};

const superAdminSchema = yup
  .object({
    role: yup
      .string()
      .required("Role is required")
      .typeError("Role is required")
      .matches(
        /^[a-zA-Z]+(\.?)(\s[a-zA-Z]+(\.?))*$/,
        "Special characters and numbers are not allowed"
      )
      .max(100, "Role should contain at most 100 characters.")
      .trim(),
    company: yup
      .string()
      .required("Company is Required")
      .typeError("Company is required"),
  })
  .required();

const userSchema = yup
  .object({
    role: yup
      .string()
      .required("Role is required")
      .typeError("Role is required")
      .matches(
        /^[a-zA-Z]+(\.?)(\s[a-zA-Z]+(\.?))*$/,
        "Special characters and numbers are not allowed"
      )
      .max(100, "Role should contain at most 100 characters.")
      .trim(),
  })
  .required();
