import { FC } from "react";
import { Modal, Button } from "antd";
import { MdRecommend } from "react-icons/md";
import otc_on_accept from "@/assets/images/confirm-msg-success.png";
import otc_on_reject from "@/assets/images/confirm-msg-reject.png";
import {updateData } from "@/lib/services";
import { toast } from "react-toastify";
import {  useNavigate } from "react-router-dom";

interface ConfirmationMsgProps {
  uniqueId: any;
  status:
    | "APPROVE"
    | "REJECT"
    | "RECOMMEND_TO_PENDING"
    | "RECOMMEND_TO_APPROVE"
    | "RECOMMEND_TO_REJECT";
  isModalVisible: boolean;
  toggleModal: () => void;
}
export const ConfirmationMsg: FC<ConfirmationMsgProps> = ({
  uniqueId,
  isModalVisible,
  toggleModal,
  status,
}) => {
  const navigate = useNavigate();
  const onSubmit = async () => {
    if (status === "RECOMMEND_TO_PENDING") {
      try {
        const res = await updateData(
          `otc_profiles/${uniqueId}/recommend-profile`
        );
        if (res.success) {
          toast.success(res.message);
          toggleModal();
          navigate("/otc/pending-to-recommends");
        } else {
          toast.error(res.message);
        }
      } catch (err) {
        toast.error("Something went wrong.");
      }
    }
    if (status === "RECOMMEND_TO_APPROVE") {
      try {
        const res = await updateData(
          `otc_profiles/${uniqueId}/recommend-to-approve`
        );
        if (res.success) {
          toast.success(res.message);
          toggleModal();
          navigate("/otc/recommend-to-approves");
        } else {
          toast.error(res.message);
        }
      } catch (err) {
        toast.error("Something went wrong.");
      }
    }
    if (status === "RECOMMEND_TO_REJECT") {
      try {
        const res = await updateData(
          `otc_profiles/${uniqueId}/recommend-to-reject`
        );
        if (res.success) {
          toast.success(res.message);
          toggleModal();
          navigate("/otc/recommend-to-rejects");
        } else {
          toast.error(res.message);
        }
      } catch (err) {
        toast.error("Something went wrong.");
      }
    }
  };

  const getMsg = (mode: string) => {
    switch (status) {
      case "APPROVE":
        return (
          <>
            <div className="flex justify-center mb-4">
              <img
                src={otc_on_accept}
                alt="otc accept profile"
                className="w-32"
              />
            </div>
            <div className="text-xl font-medium text-center text-gray-700">
              Are you sure you want to approve this profile ?
            </div>
          </>
        );
      case "REJECT":
        return (
          <>
            <div className="flex justify-center mb-4">
              <img
                src={otc_on_reject}
                alt="otc reject profile"
                className="w-32"
              />
            </div>
            <div className="text-xl font-medium text-center text-gray-700">
              Are you sure you want to reject this profile ?
            </div>
          </>
        );

      case "RECOMMEND_TO_PENDING":
        return (
          <>
            <div className="flex justify-center mb-4">
              <MdRecommend className="text-sky-800" size={70} />
            </div>
            <div className="text-xl font-medium text-center text-gray-700">
              Are you sure you want to pending to recommend this profile ?
            </div>
          </>
        );
      case "RECOMMEND_TO_APPROVE":
        return (
          <>
            <div className="flex justify-center mb-4">
              <img
                src={otc_on_accept}
                alt="recommend to approve profile"
                className="w-32"
              />
            </div>
            <div className="text-xl font-medium text-center text-gray-700">
              Are you sure you want to recommend to approve this profile ?
            </div>
          </>
        );
      case "RECOMMEND_TO_REJECT":
        return (
          <>
            <div className="flex justify-center mb-4">
              <img
                src={otc_on_reject}
                alt="recommend to reject profile"
                className="w-32"
              />
            </div>
            <div className="text-xl font-medium text-center text-gray-700">
              Are you sure you want to recommend to reject this profile ?
            </div>
          </>
        );
      default:
        return "";
    }
  };
  return (
    <Modal
      visible={isModalVisible}
      onOk={toggleModal}
      onCancel={toggleModal}
      className="confirm-msg"
      width={450}
    >
      <div className="px-10 my-6">
        <div>{getMsg(status)}</div>

        <div className="flex gap-6 mt-12">
          <div className="w-1/2">
            <Button
              type="primary"
              block
              ghost
              size="large"
              className="btn-cancel"
              onClick={() => toggleModal()}
            >
              No
            </Button>
          </div>
          <div className="w-1/2">
            <Button
              type="primary"
              className="btn-submit"
              block
              size="large"
              onClick={onSubmit}
            >
              Yes
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
