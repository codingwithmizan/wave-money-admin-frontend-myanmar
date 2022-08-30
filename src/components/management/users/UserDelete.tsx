import { FC } from "react";
import { Modal, Button } from "antd";
import { humanize } from "@/lib/helpers/utils";
import { deleteData } from "@/lib/services";
import { toast } from "react-toastify";


interface UserDeleteProps {
  id: number;
  name: string;
  isModalVisible: boolean;
  showHideModal: () => void;
}

export const UserDelete: FC<UserDeleteProps> = ({
  id,
  name,
  isModalVisible,
  showHideModal,
}) => {
  const handleOk = async () => {
    const response = await deleteData("users", id);
    if (response?.success) {
      toast.success(response.message);
      showHideModal();
    } else {
      toast.error(response.message);
    }
  };

  return (
    <Modal
      title="Delete User"
      visible={isModalVisible}
      onOk={showHideModal}
      onCancel={showHideModal}
      footer={[
        <button
          className="bg-yellow-400 hover:bg-yellow-300 text-white py-1 px-3 rounded mr-2"
          onClick={showHideModal}
        >
          Cancel
        </button>,
        <button
          className="bg-red-600 hover:bg-red-500 text-white py-1 px-3 rounded"
          onClick={showHideModal}
        >
          Submit
        </button>,
      ]}
    >
      <div className="py-4">
        <p className="text-red-500">
          Are you sure you want to delete
          <span className="text-sky-600 font-semibold px-1">
            {humanize(name)}
          </span>
          ?
        </p>
      </div>
    </Modal>
  );
};


