import { FC } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { updateData } from "@/lib/services";
import { FieldLabel, Password } from "@/components/controls";
import { Button } from "antd";

interface ChangePasswordFormProps {
  setErrorMsg: (value: string) => void;
  token: string;
}

interface IFormInputs {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

export const ChangePasswordForm: FC<ChangePasswordFormProps> = ({
  setErrorMsg,
  token,
}) => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    mode: "all",
    resolver: yupResolver(passwordChangeSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (data: IFormInputs) => {
    const params = {
      current_password: data.current_password,
      new_password: data.new_password,
      confirm_password: data.confirm_password,
      token,
    };
    const res = await updateData("users/change-pass", params);
    if (res?.success) {
      navigate("/login");
    } else {
      setErrorMsg(res?.message);
    }
  };

  const btnCancel = () => navigate("/login");

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="mb-6">
        <FieldLabel
          name="current_password"
          label="Current Password"
          required
          className="text-gray-200"
        />
        <Password
          control={control}
          name="current_password"
          errors={errors}
          placeholder="e.g. pass*123#"
        />
      </div>
      <div className="mb-6">
        <FieldLabel
          name="new_password"
          label="New Password"
          required
          className="text-gray-200"
        />
        <Password
          control={control}
          name="new_password"
          errors={errors}
          placeholder="e.g. pass*123#"
        />
      </div>
      <div className="mb-6">
        <FieldLabel
          name="confirm_password"
          label="Confirm Password"
          required
          className="text-gray-200"
        />
        <Password
          control={control}
          name="confirm_password"
          errors={errors}
          placeholder="e.g. pass*123#"
        />
      </div>

      <div className="flex gap-6 justify-end mt-6 ">
        <div className="w-72">
          <Button
            block
            ghost
            size="large"
            className="btn-cancel-secondary "
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
            className="bg-sky-800 hover:bg-sky-700 "
            size="large"
          >
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};

const passwordChangeSchema = yup.object({
  current_password: yup
    .string()
    .typeError("Current password is required")
    .required("Current password is required")
    .trim(),
  new_password: yup
    .string()
    .typeError("Password is required")
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
      "Minimum 8 characters with at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character required"
    ),
  confirm_password: yup
    .string()
    .typeError("Confirm password is required")
    .required("Confirm password is required")
    .oneOf(
      [yup.ref("new_password"), null],
      "New Password and Confirm Password do not match"
    ),
});
