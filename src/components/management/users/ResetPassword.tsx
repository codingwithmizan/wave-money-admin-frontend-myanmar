import { FC } from "react";
import { Modal, Button } from "antd";
import resetPasswordImg from "@/assets/images/reset_password.png";
import { updateData } from "@/lib/services";
import { toast } from "react-toastify";

interface ResetPasswordProps {
  isModalVisible: boolean;
  toggleModal: () => void;
  id: number;
}
export const ResetPassword: FC<ResetPasswordProps> = ({
  isModalVisible,
  toggleModal,
  id,
}) => {
  const onResetPassword = async () => {
    console.log("pass reset", id);
    const res = await updateData("users/reset-pass", { user_id: id });

    if (res?.success) {
      toast.success(res?.message);
      toggleModal();
    } else {
      toast.error(res?.message);
    }
    console.log("reset pass", res);
  };
  return (
    <Modal
      visible={isModalVisible}
      onOk={toggleModal}
      onCancel={toggleModal}
      className="reset-password"
      width={500}
    >
      <div className="px-14 my-4">
        <div className="my-8">
          <div className="flex justify-center">
            <img src={resetPasswordImg} alt="reset password" />
          </div>
          <div className="mt-8">
            <h2 className="text-2xl text-center">
              Are you sure you want to change the user password ?
            </h2>
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
              onClick={toggleModal}
            >
              Cancel
            </Button>
          </div>
          <div className="w-1/2">
            <Button
              type="primary"
              htmlType="button"
              className="btn-submit"
              block
              size="large"
              onClick={onResetPassword}
            >
              Ok
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
