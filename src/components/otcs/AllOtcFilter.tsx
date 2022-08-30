import { FC } from "react";
import { Modal, Button } from "antd";
import { FieldLabel, Select, DatePicker, Input } from "@/components/controls";
import { FilterOutlined } from "@ant-design/icons";

interface AllOtcFilterProps {
  isModalVisible: boolean;
  toggleModal: () => void;
  control: any;
  handleSubmit: (value: any) => any;
  onSubmit: (value: any) => void;
  onReset: (value: any) => void;
}
export const AllOtcFilter: FC<AllOtcFilterProps> = ({
  isModalVisible,
  toggleModal,
  control,
  handleSubmit,
  onSubmit,
  onReset,
}) => {
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
            <div className="pr-4"  style={{
            height: "500px",
            overflow: "auto",
          }}>
              <div className="my-2">
                <FieldLabel
                  name="filter_by"
                  label="KYC Status"
                  className="text-gray-600 font-medium block"
                />
                <Select
                  control={control}
                  name="filter_by"
                  options={filterKeys}
                  placeholder="e.g. Please select kyc status"
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
                  label=" Submitted Agent's MSISDN"
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
                  name="id_type"
                  label="ID Type"
                  className="text-gray-600 font-medium block"
                />
                <Select
                  control={control}
                  name="id_type"
                  options={idTypeOptions}
                  placeholder="e.g. Please select ID type"
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
              <div className="my-2">
                <FieldLabel
                  name="start_date"
                  label="Start Date"
                  className="text-gray-600 font-medium"
                />
                <DatePicker
                  control={control}
                  name="start_date"
                  format="YYYY-MM-DD"
                  placeholder="e.g. 1990-05-20"
                  allowClear
                />
              </div>
              <div className="my-2">
                <FieldLabel
                  name="end_date"
                  label="End Date"
                  className="text-gray-600 font-medium"
                />
                <DatePicker
                  control={control}
                  name="end_date"
                  format="YYYY-MM-DD"
                  placeholder="e.g. 1990-05-20"
                  allowClear
                />
              </div>
            </div>

            <div className="flex gap-6 mt-6 mr-6">
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

const profile_status = [
  { id: 1, value: "active", label: "Active" },
  { id: 2, value: "frozen", label: "Frozen" },
  { id: 3, value: "suspended", label: "Suspended" },
  { id: 4, value: "blacklist", label: "Blacklist" },
  { id: 5, value: "locked", label: "Locked" },
];
const idTypeOptions = [
  { id: 1, value: "nrc", label: "NRC" },
  { id: 2, value: "passport", label: "Passport" },
  // { id: 3, value: "driving_license", label: "Driving License" },
  // { id: 4, value: "cambodian", label: "Cambodian" },
];

const filterKeys = [
  { id: 1, value: "", label: "All" },
  { id: 2, value: "approved", label: "Approved" },
  { id: 3, value: "rejected", label: "Rejected" },
  { id: 4, value: "otc_verified", label: "Verified" },
  { id: 5, value: "otc_unverified", label: "Unverified" },
];
