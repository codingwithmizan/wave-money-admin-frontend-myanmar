import { FC } from "react";
import { Modal, Button } from "antd";
import { useForm } from "react-hook-form";
import {
  FieldLabel,
  Input,
  Select,
  DatePicker,
} from "@/components/controls";
import { FilterOutlined } from "@ant-design/icons";

interface UserFilterProps {
  isModalVisible: boolean;
  toggleModal: () => void;
}
export const UserFilter: FC<UserFilterProps> = ({
  isModalVisible,
  toggleModal,
}) => {
  const { control } = useForm();
  return (
    <Modal
      visible={isModalVisible}
      onOk={toggleModal}
      onCancel={toggleModal}
      className="user-filter"
      width={600}
    >
      <div className="px-12 my-6">
        <div className="mb-4">
          <FilterOutlined className="text-xl mr-2 text-gray-600 relative -top-1 font-medium" />
          <span className="text-xl text-gray-600 font-medium">Filter By</span>
        </div>
        <form>
          <div className="mb-2">
            <FieldLabel
              name="selectOption"
              label="Please select the option!"
              className="text-sky-600 font-medium text-lg"
            />
          </div>
          <div style={{ height: "480px" }} className="overflow-auto  pr-4">
            <div className="my-2">
              <FieldLabel
                name="uniqeId"
                label="Unique Customer ID"
                className="text-gray-600 font-medium"
              />
              <Input
                control={control}
                name="uniqeId"
                placeholder="e.g. abc123456"
              />
            </div>

            <div className="my-2">
              <FieldLabel
                name="status"
                label="Status"
                className="text-gray-600 font-medium"
              />
              <Input
                control={control}
                name="status"
                placeholder="e.g. varified"
              />
            </div>

            <div className="my-2">
              <FieldLabel
                name="msisdn"
                label="Latest MSISDN"
                className="text-gray-600 font-medium"
              />
              <Input
                control={control}
                name="msisdn"
                placeholder="e.g. varified"
              />
            </div>

            <div className="my-2">
              <FieldLabel
                name="fullName"
                label="Full Name"
                className="text-gray-600 font-medium"
              />
              <Input
                control={control}
                name="fullName"
                placeholder="e.g. john doe"
              />
            </div>
            <div className="my-2">
              <FieldLabel
                name="idType"
                label="ID Type"
                className="text-gray-600 font-medium"
              />
              <Select
                control={control}
                name="idType"
                options={[]}
                placeholder="e.g. Agent"
              />
            </div>
            <div className="my-2">
              <FieldLabel
                name="idNumber"
                label="ID Number"
                className="text-gray-600 font-medium"
              />
              <Input
                control={control}
                name="idNumber"
                placeholder="4512-8956-78"
              />
            </div>
            <div className="my-2">
              <FieldLabel
                name="createdDate"
                label="Created date"
                className="text-gray-600 font-medium"
              />
              <DatePicker
                control={control}
                name="createdDate"
                placeholder="e.g. 01/02/2020"
                allowClear
              />
            </div>
            <div className="my-2">
              <FieldLabel
                name="modifiedDate"
                label=" Modified Date"
                className="text-gray-600 font-medium"
              />
              <DatePicker
                control={control}
                name="modifiedDate"
                placeholder="e.g. 01/02/2020"
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
                placeholder="e.g. 01/02/2020"
                allowClear
              />
            </div>
            <div className="my-2">
              <FieldLabel
                name="submittedAgentId"
                label="Submitted agent's ID"
                className="text-gray-600 font-medium"
              />
              <Input
                control={control}
                name="submittedAgentId"
                placeholder="e.g. 5236-8956-78"
              />
            </div>
          </div>

          <div className="flex gap-6 mt-10">
            <div className="w-1/2">
              <Button type="primary" block ghost size="large">
                Cancel
              </Button>
            </div>
            <div className="w-1/2">
              <Button type="primary" className="bg-sky-700" block size="large">
                Ok
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};
