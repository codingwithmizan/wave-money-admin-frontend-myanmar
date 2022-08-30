import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { postData, updateData, getData, getDetails } from "@/lib/services";
import {
  FieldLabel,
  Input,
  Select,
  ImageUploader,
} from "@/components/controls";
import { Button, Image } from "antd";
import { serialize } from "object-to-formdata";
import { useCommon } from "@/hooks";
import * as yup from "yup";
import {
  IMAGE_UPLOAD_FORMATS,
  IMAGE_UPLOAD_MIME_TYPES,
  MAX_FILE_SIZE,
} from "@/lib/constants";

interface UserFormProps {
  formMode: "CREATE" | "UPDATE";
  userData?: any;
}

export const UserForm: FC<UserFormProps> = ({ formMode, userData }) => {
  const [companies, setCompanies] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [operatorId, setOpratorId] = useState("");
  const navigate = useNavigate();
  const { loading, setLoading } = useCommon();

  useEffect(() => {
    setLoading(true);
    getAllCompanies();
    getAllRoles();
    setLoading(false);
  }, []);

  const getAllCompanies = async () => {
    const res = await getData("tenants", {});
    if (res?.success) {
      setCompanies(
        res?.data?.map((company: any) => ({
          id: company?.id,
          label: company?.company_name,
          value: company?.id,
          companyId: company.company_id,
        }))
      );
    } else {
      console.log("Something went wrong");
    }
  };

  const getAllRoles = async () => {
    const res = await getData("roles");
    if (res?.success) {
      setRoles(
        res?.data?.map((role: any) => ({
          id: role?.id,
          value: role?.id,
          label: role?.name,
        }))
      );
    } else {
      console.log("Something went wrong");
    }
  };

  const generateOperatorId = async () => {
    const res = await getDetails("users/generate_operator_id");
    if (res?.success) {
      setOpratorId(res?.data);
    } else {
      console.log(res?.message);
    }
  };

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm<any>({
    mode: "all",
    defaultValues: {
      companyName: "",
      companyId: "",
      operatorId: "",
      fullName: "",
      phone: "",
      email: "",
      status: "active",
      managerEmail: "",
      siteRole: "",
      profileImg: "",
    },
    resolver: yupResolver(userSchema),
  });

  useEffect(() => {
    if (formMode === "UPDATE") {
      reset({
        companyName: userData?.tenant?.id,
        companyId: userData?.tenant?.company_id,
        operatorId: userData?.operator_id,
        fullName: userData?.name,
        phone: userData?.phone_number,
        email: userData?.email,
        status: userData?.account_status,
        managerEmail: userData?.manager_email,
        siteRole: userData?.role?.id,
        ptofileImg: userData?.image?.url,
      });
    }
  }, [userData, reset]);

  const company = watch("companyName");
  const selectedCompany = companies.find((item) => item.value === company);

  useEffect(() => {
    if (formMode === "CREATE") {
      if (company) {
        generateOperatorId();
      }
    }
  }, [company]);

  useEffect(() => {
    if (formMode === "CREATE" && company) {
      setValue("companyId", selectedCompany?.companyId);
      setValue("operatorId", operatorId);
    }
  }, [company, operatorId]);

  const btnCancel = () => navigate("/user/list");

  const onSubmit = async (data: any) => {
    const formData = serialize({
      name: data?.fullName,
      email: data?.email,
      phone_number: data?.phone,
      operator_id: data?.operatorId,
      account_status: data?.status,
      manager_email: data?.managerEmail,
      image: data?.profileImg?.file,
      role_type: "portal_user",
      role_id: +data?.siteRole,
      tenant_id: +data?.companyName,
    });

    if (formMode === "CREATE") {
      const res = await postData("users", formData);
      if (res?.success) {
        toast.success(res?.message);
        navigate("/user/list");
      } else {
        toast.error(res?.message);
      }
    } else {
      const res = await updateData("users", formData, userData?.id);
      console.log(" update user res", res);

      if (res?.success) {
        toast.success(res?.message);
        navigate("/user/list");
      } else {
        toast.error(res?.message);
      }
    }
  };

  return (
    <div className="ml-6">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <>
          <div className="form-group">
            <div className="w-52 ">
              <FieldLabel name="companyName" label="Company Name" required />
            </div>
            <div className="w-full">
              <Select
                control={control}
                name="companyName"
                options={companies}
                errors={errors}
                placeholder="Select company"
                isDisabled={formMode === "UPDATE"}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="w-52 ">
              <FieldLabel name="companyId" label="Company ID" required />
            </div>
            <div className="w-full">
              <Input
                control={control}
                name="companyId"
                errors={errors}
                placeholder="e.g. M-1872739828"
                disabled
              />
            </div>
          </div>
          <div className="form-group">
            <div className="w-52 ">
              <FieldLabel name="operatorId" label="Operator ID" required />
            </div>
            <div className="w-full">
              <Input
                control={control}
                name="operatorId"
                errors={errors}
                placeholder="e.g. WM123456789"
                disabled
              />
            </div>
          </div>
        </>
        <div className="form-group">
          <div className="w-52  ">
            <FieldLabel name="fullName" label="Full Name" required />
          </div>
          <div className="w-full">
            <Input
              control={control}
              name="fullName"
              errors={errors}
              placeholder="e.g. Wade Warren"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="w-52  ">
            <FieldLabel name="phone" label="Phone Number" required />
          </div>
          <div className="w-full">
            <Input
              control={control}
              name="phone"
              errors={errors}
              placeholder="e.g. 95978315768"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="w-52  ">
            <FieldLabel name="email" label="Email ID" required />
          </div>
          <div className="w-full">
            <Input
              control={control}
              name="email"
              type="email"
              errors={errors}
              placeholder="e.g. deanna.curtis@example.com"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="w-52  ">
            <FieldLabel name="status" label="Account Status" required />
          </div>
          <div className="w-full">
            <Select
              control={control}
              name="status"
              options={statusOptions}
              errors={errors}
              placeholder="Select account status"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="w-52 ">
            <FieldLabel name="managerEmail" label="Manager Email ID" required />
          </div>
          <div className="w-full">
            <Input
              control={control}
              name="managerEmail"
              type="email"
              errors={errors}
              placeholder="e.g. deanna.curtis@example.com"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="w-52  ">
            <FieldLabel name="siteRole" label="Site Role" required />
          </div>
          <div className="w-full">
            <Select
              control={control}
              name="siteRole"
              options={roles}
              errors={errors}
              placeholder="Please select a role"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="w-52  ">
            <FieldLabel name="profileImg" label="Profile Image" />
          </div>
          <div className="w-full flex items-center">
            <div className="mt-2">
              {formMode === "UPDATE" && (
                <Image
                  width={100}
                  src={userData?.image?.url}
                  className="mb-2"
                  style={{ maxHeight: "100px" }}
                />
              )}
              <ImageUploader
                control={control}
                name="profileImg"
                acceptFileFormat={IMAGE_UPLOAD_FORMATS}
                setValue={setValue}
                errors={errors}
              />
            </div>
            <div className={`relative ${formMode === "CREATE" && "pl-20"}`}>
              <ul className="list-disc text-gray-500 text-xs">
                <li className="mb-2">
                  Image format must be "jpg, jpeg, png or webp".
                </li>
                <li>Image size not more than 1MB. </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex gap-6 justify-end mt-6 ">
          <div className="w-72">
            <Button
              type="primary"
              block
              ghost
              size="large"
              className="btn-cancel"
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
    </div>
  );
};

const statusOptions = [
  {
    id: 1,
    value: "active",
    label: "Active",
  },
  {
    id: 2,
    value: "inactive",
    label: "Inactive",
  },
];

const userSchema = yup
  .object()
  .shape(
    {
      companyName: yup
        .string()
        .typeError("Company Name is required")
        .required("Company Name is required"),
      companyId: yup
        .string()
        .typeError("Company ID is required")
        .required("CompanyId ID is required"),
      operatorId: yup
        .string()
        .typeError("Operator ID is required")
        .required("Operator ID is required"),
      fullName: yup
        .string()
        .required("Full Name is required")
        .typeError('"Full Name is required"')
        .max(100, "Full Name should contain at most 100 characters.")
        .trim(),
      phone: yup
        .string()
        .required("Phone Number is required")
        .typeError("Phone Number is required")
        .matches(
          /^(09|9|\+?950?9|\+?95950?9)\d{7,9}$/,
          "Provide valid MM phone number in English"
        )
        .trim(),
      email: yup
        .string()
        .email("Email must be a valid email")
        .typeError('"Email is required"')
        .required("Email is required")
        .max(100, "Email should contain at most 100 characters."),
      status: yup
        .string()
        .typeError('"Account status is required"')
        .required("Account status is required"),
      managerEmail: yup
        .string()
        .email("Email must be a valid email")
        .typeError('"Manager Email is required"')
        .max(100, "Manager email should contain at most 100 characters.")
        .required("Manager email is required")
        .test(
          "match",
          "Manager email and the user email should not be the same.",
          function (managerEmail) {
            return managerEmail !== this.parent.email;
          }
        ),
      siteRole: yup
        .string()
        .typeError('Site Role is required"')
        .required("Site Role is required"),
      profileImg: yup.mixed().when("profileImg", {
        is: (value: any) => value,
        then: (schema) =>
          schema
            .test(
              "fileSize",
              "Uploaded file is to big, image size not more than 1MB.",
              (value: any, context: any) => {
                return value?.file && value?.file?.size <= MAX_FILE_SIZE;
              }
            )
            .test(
              "type",
              "Invalid image format. Only (jpg, jpeg, png and webp) format are supported.",
              function (value: any) {
                return (
                  value?.file && IMAGE_UPLOAD_MIME_TYPES.includes(value?.file?.type)
                );
              }
            ),
        otherwise: (schema) => schema.nullable(),
      }),
    },
    [["profileImg", "profileImg"]]
  )
  .required();
