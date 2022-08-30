import { FC} from "react";
import { Modal } from "antd";
import { updateData } from "@/lib/services/baseServices";
import { toast } from "react-toastify";
import accept_modal from "@/assets/images/accept_modal.svg";

interface AcceptClientModalProps {
  id: number;
  name: string;
  isModalVisible: boolean;
  showHideModal: () => void;
  afterOK: (value: boolean) => void;
}

const AcceptClientModal: FC<AcceptClientModalProps> = ({
  id,
  isModalVisible,
  showHideModal,
  afterOK
}) => {
  const handleOk = async () => {
    const response = await updateData(`customers/${id}/accept`);
    if (response?.success) {
      toast.success(response.message);
      afterOK(true)
      showHideModal();
    } else {
      toast.error(response.message);
    }
  };

  return (
    <Modal
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={showHideModal}
      className="accept-modal"
    >
      <div className="py-4">
        <div className="mt-10 flex justify-center">
          <img src={accept_modal} alt="reject modal" className="w-24" />
        </div>
        <div className="my-4">
          <h2 className="text-center text-4xl font-semibold text-green-600">
            Success!
          </h2>
          <p className="text-gray-500 text-center text-xl my-4">
            Action completed successfully
          </p>
        </div>

        <div className="flex justify-center   border-red-600 mt-6">
          <div className="w-1/2">
            <button className="btn btn-info btn-block" onClick={handleOk}>Ok</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AcceptClientModal;
