import { FC } from "react";
import { Modal, Button } from "antd";
import { useForm } from "react-hook-form";
import { FieldLabel, Select, DatePicker, Input } from "@/components/controls";
import { FilterOutlined } from "@ant-design/icons";

interface OtcFilterProps {
  isModalVisible: boolean;
  toggleModal: () => void;
  setOtcFilteredValue: (value: any) => void;
  otcFilteredValue: any;
  setPage:(page:number) =>void
}
export const OtcFilter: FC<OtcFilterProps> = ({
  isModalVisible,
  toggleModal,
  setOtcFilteredValue,
  otcFilteredValue,
  setPage
}) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      id_type: "",
      created_at: "",
      updated_at: "",
      dob: "",
      status: "",
      agent_msisdn: ""
    },
  });

  const onReset = () => {
    reset({
      id_type: "",
      created_at: "",
      updated_at: "",
      dob: "",
      status: "",
      agent_msisdn: ""
    });
    const filteredVal = { ...otcFilteredValue };
    filteredVal["id_type"] = "";
    filteredVal["created_at"] = null;
    filteredVal["updated_at"] = null;
    filteredVal["dob"] = null;
    filteredVal["status"] = "";
    filteredVal["agent_msisdn"] = "";
    setOtcFilteredValue(filteredVal);
  };

  const onSubmit = (data: any) => {
    toggleModal();
    const filteredVal = { ...otcFilteredValue };
    filteredVal["id_type"] = data?.id_type;
    filteredVal["created_at"] = data?.created_at?._d;
    filteredVal["updated_at"] = data?.updated_at?._d;
    filteredVal["dob"] = data?.dob?._d;
    filteredVal["status"] = data?.status;
    filteredVal["agent_msisdn"] = data?.agent_msisdn;
    setPage(1)
    setOtcFilteredValue(filteredVal);
  };
  return (
    <Modal
      visible={isModalVisible}
      onOk={toggleModal}
      onCancel={toggleModal}
      className="otc-filter"
      width={500}
    >
      <div className="px-8 my-6">
        <div className="mb-4">
          <FilterOutlined className="text-xl mr-2 text-gray-600 relative -top-1 font-medium" />
          <span className="text-xl text-gray-600 font-medium">Filter By </span>
        </div>
        <div className="mb-2">
          <FieldLabel
            name="selectOption"
            label="Please select the option!"
            className="text-sky-600 font-medium text-lg"
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="pr-4">

            <div className="my-2">
              <FieldLabel
                name="id_type"
                label="ID Type"
                className="text-gray-600 font-medium block"
              />
              <Select
                control={control}
                name="id_type"
                options={idTypeOptions}
                placeholder="e.g. Please select id type"
              />
            </div>
            <div className="my-2">
              <FieldLabel
                name="status"
                label="Profile Status"
                className="text-gray-600 font-medium block"
              />
              <Select
                control={control}
                name="status"
                options={profile_status}
                placeholder="e.g. Please select profile status"
              />
            </div>
            <div className="my-2">
              <FieldLabel
                name="agent_msisdn"
                label="Submitted Agent's MSISDN"
                className="text-gray-600 font-medium block"
              />
                <Input
                  control={control}
                  name="agent_msisdn"
                  placeholder="e.g. 5986523"
                />
            </div>
            <div className="my-2">
              <FieldLabel
                name="created_at"
                label="Created date"
                className="text-gray-600 font-medium"
              />
              <DatePicker
                control={control}
                name="created_at"
                format="YYYY-MM-DD"
                placeholder="e.g. 2022-04-03"
                allowClear
              />
            </div>
            <div className="my-2">
              <FieldLabel
                name="updated_at"
                label=" Modified Date"
                className="text-gray-600 font-medium"
              />
              <DatePicker
                control={control}
                name="updated_at"
                format="YYYY-MM-DD"
                placeholder="e.g. 2022-05-15"
                allowClear
              />
            </div>
            <div className="my-2">
              <FieldLabel
                name="dob"
                label="Date of birth"
                className="text-gray-600 font-medium"
              />
              <DatePicker
                control={control}
                name="dob"
                format="YYYY-MM-DD"
                placeholder="e.g. 1990-05-20"
                allowClear
              />
            </div>
          </div>

          <div className="flex gap-6 mt-6 mr-4">
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
                className="btn-submit"
                block
                size="large"
                htmlType="submit"
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

const idTypeOptions = [
  { id: 1, value: "nrc", label: "NRC" },
  { id: 2, value: "passport", label: "Passport" },
  // { id: 3, value: "driving_license", label: "Driving License" },
  // { id: 4, value: "cambodian", label: "Cambodian" },
];

const profile_status = [
  { id: 1, value: "active", label: "Active" },
  { id: 2, value: "frozen", label: "Frozen" },
  { id: 3, value: "suspended", label: "Suspended" },
  { id: 4, value: "blacklist", label: "Blacklist" },
  { id: 5, value: "locked", label: "Locked" },
];