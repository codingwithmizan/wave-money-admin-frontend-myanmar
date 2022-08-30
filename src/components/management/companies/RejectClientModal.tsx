import { FC, useEffect, useState } from "react";
import { Modal } from "antd";
import { getData, getDetails, updateData } from "@/lib/services/baseServices";
import { toast } from "react-toastify";
import reject_modal from "@/assets/images/reject_modal.svg";

interface RejectClientModalProps {
  id: number;
  name: string;
  isModalVisible: boolean;
  showHideModal: () => void;
  afterOK: (value: boolean) => void;
}

const RejectClientModal: FC<RejectClientModalProps> = ({
  id,
  afterOK,
  isModalVisible,
  showHideModal,
}) => {
  const [rejectReasons, setRejectReasons] = useState([])
  const [reasonId, setReasonId] = useState()

  const getRejectReasons = async () => {
    const response = await getData("rejection_reasons");

    if (response?.success) {
      setRejectReasons(response?.data);
    } else {
      console.log("something went wrong");
    }
  };

  useEffect(()=>{
    getRejectReasons()
  }, [])

  const onReasonChange = (e:any)=>{
    setReasonId(e.target.value)
    console.log(e.target.value)
  }

  const handleOk = async () => {
    if(!reasonId) {
      toast.error("Please select a reason");
      return
    }
    const response = await updateData(`customers/${id}/reject`, {
      rejection_reason_id: reasonId
    });
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
      className="reject-modal"
    >
      <div className="py-4">
        <div className="mt-10 flex justify-center">
          <img src={reject_modal} alt="reject modal" className='w-64' />
        </div>
        <div className='my-4'>
          <h2 className='text-center text-4xl font-semibold'>Reject the user?</h2>
        </div>
        <div className='mb-8'>
          <label htmlFor="rejectReason" className="text-xl font-semibold text-sky-700">Reject Reason!</label>
          <select name="reason" id="rejectReason" className="input-control mt-2"
          onChange={onReasonChange}>
            <option value="">Please select a reason</option>
            {
              rejectReasons?.map((item:any,i:number)=> {
                return (
                  <option key={i} value={item?.id}>{item?.portal_message}</option>
                )
              })
            }
          </select>
        </div>
        <div className='flex gap-6  border-red-600 '>
          <div className="w-1/2">
            <button className="btn btn-outline-info btn-block" onClick={showHideModal}>Cancel</button>
          </div>
          <div className='w-1/2'>
            <button className="btn btn-info btn-block" onClick={handleOk}>Ok</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RejectClientModal;
