import { FC } from "react";
import { Modal, Button } from "antd";
import { useForm } from "react-hook-form";
import { FieldLabel, Password } from "@/components/controls";
import changePasswordImg from "@/assets/images/change_password.png";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { updateData } from "@/lib/services";

interface ChangePasswordProps {
  isModalVisible: boolean;
  toggleModal: () => void;
}

interface IFormInputs {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

export const ChangePassword: FC<ChangePasswordProps> = ({
  isModalVisible,
  toggleModal,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
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
    };
    const res = await updateData("users/change-pass", params);
    if (res?.success) {
      toast.success(res?.message);
      toggleModal();
    } else {
      toast.error(res?.message);
    }
  };
  const onReset = () => {
    reset({
      current_password: "",
      new_password: "",
      confirm_password: "",
    });
  };
  const onCancel = () => {
    clearErrors();
    toggleModal();
  };
  return (
    <Modal
      visible={isModalVisible}
      onOk={toggleModal}
      onCancel={onCancel}
      className="reset-password"
      width={500}
    >
      <div className="px-8 my-4">
        <div className="mb-4">
          <div className=" flex justify-center mb-2">
            <img src={changePasswordImg} alt="change password" />
          </div>
          <h2 className="text-center text-2xl font-medium text-gray-700">
            Change Password
          </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="my-2">
              <FieldLabel
                name="current_password"
                label="Current Password"
                className="text-gray-600 font-medium"
                required
              />
              <Password
                control={control}
                name="current_password"
                errors={errors}
                placeholder="e.g. pass*123#"
              />
            </div>

            <div className="my-4">
              <FieldLabel
                name="new_password"
                label="New Password"
                className="text-gray-600 font-medium"
                required
              />
              <Password
                control={control}
                name="new_password"
                errors={errors}
                placeholder="e.g. pass*123#"
              />
            </div>

            <div className="my-4">
              <FieldLabel
                name="confirm_password"
                label="Confirm Password"
                className="text-gray-600 font-medium"
                required
              />
              <Password
                control={control}
                name="confirm_password"
                placeholder="e.g. pass*123#"
                errors={errors}
              />
            </div>
          </div>

          <div className="flex gap-6 mt-8">
            <div className="w-1/2">
              <Button
                type="primary"
                block
                ghost
                size="large"
                className="btn-cancel"
                onClick={onReset}
              >
                Reset
              </Button>
            </div>
            <div className="w-1/2">
              <Button
                type="primary"
                htmlType="submit"
                className="btn-submit"
                block
                size="large"
              >
                Ok
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
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
    .typeError("New password is required")
    .required("New password is required")
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
