import { FC } from "react";
import { Modal, Button } from "antd";
import modalCaution from "@/assets/images/caution.png";

interface WarningMsgProps {
  isModalVisible: boolean;
  toggleModal: () => void;
  onChangePassword: () => void;
  message: string;
}
export const WarningMsg: FC<WarningMsgProps> = ({
  isModalVisible,
  toggleModal,
  message,
  onChangePassword,
}) => {
  return (
    <Modal
      visible={isModalVisible}
      onOk={toggleModal}
      onCancel={toggleModal}
      className="reset-password"
      width={500}
    >
      <div className="px-12 my-4">
        <div className="my-8 ">
          <div className="flex justify-center">
            <img src={modalCaution} alt="caution" />
          </div>
          <div className="mt-6 mb-10">
            <h2 className="text-lg text-center">
              {message}
              <span className="text-red-600">*</span>
            </h2>
          </div>
          <Button
            type="primary"
            htmlType="button"
            className="btn-submit"
            block
            size="large"
            onClick={onChangePassword}
          >
            Change
          </Button>
        </div>
      </div>
    </Modal>
  );
};
