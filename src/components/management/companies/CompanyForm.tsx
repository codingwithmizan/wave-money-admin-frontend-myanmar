import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { postData, updateData } from "@/lib/services";
import { FieldLabel, Input, Select, TextArea } from "@/components/controls";
import { Company } from "@/lib/models";
import { Button } from "antd";
import * as yup from "yup";

interface CompanyFormProps {
  formMode: "CREATE" | "UPDATE";
  companyDetails?: any;
}

interface IFormInputs {
  companyName: string;
  phone: string;
  address: string;
  email: string;
  companyStatus?: string;
}

export const ComapnyForm: FC<CompanyFormProps> = ({
  formMode,
  companyDetails,
}) => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm<IFormInputs>({
    mode: "all",
    resolver: yupResolver(companySchema),
    defaultValues: {
      companyName: "",
      phone: "",
      address: "",
      email: "",
      companyStatus: "",
    },
  });

  useEffect(() => {
    if (formMode === "UPDATE") {
      reset({
        companyName: companyDetails?.company_name,
        phone: companyDetails?.phone_number,
        address: companyDetails?.address,
        email: companyDetails?.email,
        companyStatus: companyDetails?.company_status,
      });
    }
  }, [companyDetails]);

  const btnCancel = () => navigate("/company/list");

  const onSubmit = async (data: any) => {
    const formData = {
      company_name: data?.companyName,
      phone_number: data?.phone,
      address: data?.address,
      email: data?.email,
      company_status: data?.companyStatus,
    };

    if (formMode === "CREATE") {
      const res = await postData("tenants", formData);

      if (res?.success) {
        toast.success(res?.message);
        navigate("/company/list");
      } else {
        toast.error(res?.message);
      }
    } else {
      const res = await updateData("tenants", formData, companyDetails?.id);
      console.log(" update company response", res);

      if (res?.success) {
        toast.success(res?.message);
        navigate("/company/list");
      } else {
        toast.error(res?.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <div className="mb-1">
          <FieldLabel name="companyName" label="Company Name" required />
        </div>
        <div className="w-full">
          <Input
            control={control}
            name="companyName"
            errors={errors}
            placeholder="e.g. Misfit Technologies Ltd"
          />
        </div>
      </div>

      <div className="form-group">
        <div className="mb-1 ">
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
      <div className="form-group items-start">
        <div className="mb-1 ">
          <FieldLabel name="address" label="Address" required />
        </div>
        <div className="w-full">
          <TextArea
            control={control}
            name="address"
            errors={errors}
            placeholder="e.g. Yangon, Myanamar"
          />
        </div>
      </div>
      <div className="form-group">
        <div className="mb-1 ">
          <FieldLabel name="email" label="Email ID" required />
        </div>
        <div className="w-full">
          <Input
            control={control}
            name="email"
            type="email"
            errors={errors}
            placeholder="e.g. misfit@gmail.com"
          />
        </div>
      </div>
      <div className="form-group">
        <div className="mb-1 ">
          <FieldLabel name="companyStatus" label="Company Status" required />
        </div>
        <div className="w-full">
          <Select
            control={control}
            name="companyStatus"
            options={statusOptions}
            errors={errors}
            placeholder="Select company status"
          />
        </div>
      </div>
      <div className="flex gap-6 justify-end mt-8  w-4/5 ml-auto">
        <div className="w-2/3">
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
        <div className="w-2/3">
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
  {
    id: 3,
    value: "closed",
    label: "Closed",
  },
];

const companySchema = yup
  .object({
    companyName: yup
      .string()
      .required("Company name is required")
      .max(100, "Company name should contain at most 100 characters.")
      .trim(),
    phone: yup
      .string()
      .required("Phone Number is required")
      .matches(
        /^(09|\+?950?9|\+?95950?9)\d{7,9}$/,
        "Provide valid MM phone number in English"
      )
      .trim(),
    address: yup
      .string()
      .required("Address is required")
      .max(100, "Address should contain at most 100 characters.")
      .trim(),
    email: yup
      .string()
      .email("Email must be a valid email")
      .required("Email Address is required")
      .max(100, "Email should contain at most 100 characters."),
    companyStatus: yup.string().required("Company Status is required"),
  })
  .required();
