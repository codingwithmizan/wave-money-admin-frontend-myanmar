import { FC, useState, useEffect } from "react";
import { Modal, Button } from "antd";
import { useForm } from "react-hook-form";
import { FieldLabel, Input, Select, DatePicker } from "@/components/controls";
import { FilterOutlined } from "@ant-design/icons";
import moment from "moment";
import { DATE_FORMMAT } from "@/lib/constants";
interface DashboardFilterProps {
  isModalVisible: boolean;
  onSelectFilter: (selectedFilter: any) => void;
  toggleModalVisible: () => void;
  filterOption: any;
}

const filterTypeOptions = [
  { id: 1, value: "selectedDate", label: "Seleted Date" },
  { id: 2, value: "selectedDateMinusOne", label: "Selected Date Minus 1" },
  { id: 3, value: "monthToDate", label: "Month to Date" },
  { id: 4, value: "initialToSelectedDate", label: "Initial to Selected Date" },
];

const INITAIL_DATE = moment().startOf("year").format(DATE_FORMMAT);

export const DashboardFilter: FC<DashboardFilterProps> = ({
  filterOption,
  onSelectFilter,
  isModalVisible,
  toggleModalVisible,
}) => {
  const [firstDate, setFirstDate] = useState(
    moment(filterOption.startDate).format(DATE_FORMMAT)
  );
  const [lastDate, setLastDate] = useState(
    moment(filterOption.startDate).format(DATE_FORMMAT)
  );
  const [dateValue, setDateValue] = useState(
    moment(filterOption.startDate).format(DATE_FORMMAT)
  );


  const { control, watch, reset, setValue, handleSubmit } = useForm<any>({
    mode: "all",
    defaultValues: {
      selectedDate: moment(filterOption.selectedDateValue, DATE_FORMMAT),
      filterType: "",
      selectedDateMinusOne: "",
      monthToDate: "",
      initialToSelectedDate: "",
    },
  });

  const field: any = watch();

  // const selectedDate = moment(filterOption.selectedDateValue);
  const selectedDate = moment(field?.selectedDate?._d, DATE_FORMMAT);
  const selectedDateMinusOne = moment(selectedDate)
    .subtract(1, "day")
    .format(DATE_FORMMAT);

  const startingDateOfSelectedMonth = moment(selectedDate)
    .startOf("month")
    .format(DATE_FORMMAT);

  const monthToDate = `${moment(startingDateOfSelectedMonth).format(
    "Do MMM YYYY"
  )} to ${moment(selectedDate).format("Do MMM YYYY")}`;

  const initialToSelectedDate = `${moment(INITAIL_DATE).format(
    "Do MMM YYYY"
  )} to ${moment(selectedDate).format("Do MMM YYYY")}`;

  const setDates = () => {
    switch (field.filterType) {
      case "selectedDate":
        setFirstDate(selectedDate.format(DATE_FORMMAT));
        setLastDate(selectedDate.format(DATE_FORMMAT));
        setDateValue(selectedDate.format(DATE_FORMMAT));
        return;
      case "selectedDateMinusOne":
        setFirstDate(selectedDateMinusOne);
        setLastDate(selectedDateMinusOne);
        setDateValue(selectedDateMinusOne);
        return;
      case "monthToDate":
        setFirstDate(startingDateOfSelectedMonth);
        setLastDate(selectedDate.format(DATE_FORMMAT));
        setDateValue(monthToDate);
        return;
      case "initialToSelectedDate":
        setFirstDate(INITAIL_DATE);
        setLastDate(selectedDate.format(DATE_FORMMAT));
        setDateValue(initialToSelectedDate);
        return;
      default:
        setFirstDate(selectedDate.format(DATE_FORMMAT));
        setLastDate(selectedDate.format(DATE_FORMMAT));
        setDateValue(selectedDate.format(DATE_FORMMAT));
        return;
    }
  };

  useEffect(() => {
    setDates();
  }, [field]);

  useEffect(() => {
    setValue("selectedDate", selectedDate);
    setValue("selectedDateMinusOne", selectedDateMinusOne);
    setValue("monthToDate", monthToDate);
    setValue("initialToSelectedDate", initialToSelectedDate);
    setValue("filterType", filterOption.filter_type);
  }, [selectedDateMinusOne, reset, watch, setValue]);

  const onReset = () => {
    const filterVal: any = { ...filterOption };
    filterVal["selectedDate"] = moment(new Date()).format(DATE_FORMMAT);
    filterVal["startDate"] = moment(new Date()).format(DATE_FORMMAT);
    filterVal["endDate"] = moment(new Date()).format(DATE_FORMMAT);
    filterVal["label"] = "Seleted Date";
    filterVal["value"] = moment(new Date()).format(DATE_FORMMAT);
    filterVal["is_submit"] = false;
    // onSelectFilter(filterVal);

    reset({
      selectedDate: moment(new Date(), DATE_FORMMAT),
      selectedDateMinusOne,
      monthToDate,
      initialToSelectedDate,
      filterType: "selectedDate",
    });

    setValue("filterType", "selectedDate");
  };
  const onSubmit = (data: any) => {
    const filterVal = filterTypeOptions?.find(
      (i) => i.value === data.filterType
    );
    setDates()
    onSelectFilter({
      startDate: firstDate,
      endDate: lastDate,
      selectedDateValue: moment(data.selectedDate?._d, DATE_FORMMAT),
      label: filterVal ? filterVal?.label :filterOption.label,
      value: dateValue,
      filter_type: data.filterType,
      is_submit: true,
    });
  };

  return (
    <Modal
      visible={isModalVisible}
      onOk={toggleModalVisible}
      onCancel={toggleModalVisible}
      className="user-filter"
      width={500}
    >
      <div className="px-6 my-6">
        <div className="mb-4">
          <FilterOutlined className="text-xl mr-2 text-gray-600 relative -top-1 font-medium" />
          <span className="text-xl text-gray-600 font-medium">Filter By</span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <div className="my-2">
              <FieldLabel
                name="selectedDate"
                label="Seleted Date"
                className="text-gray-600 font-medium"
                required
              />
              <DatePicker
                control={control}
                name="selectedDate"
                format={DATE_FORMMAT}
                placeholder="e.g. 2022-01-01"
              />
            </div>
            <div className="my-2">
              <FieldLabel
                name="selectedDateMinusOne"
                label="Selected Date Minus 1"
                className="text-gray-600 font-medium"
              />
              <Input
                control={control}
                name="selectedDateMinusOne"
                placeholder="e.g. 2022-01-01"
                disabled
              />
            </div>
            <div className="my-2">
              <FieldLabel
                name="monthToDate"
                label="Month to Date"
                className="text-gray-600 font-medium"
              />
              <Input
                control={control}
                name="monthToDate"
                placeholder="e.g. 1st June to 13th June"
                disabled
              />
            </div>
            <div className="my-2">
              <FieldLabel
                name="initialToSelectedDate"
                label="Initial to Selected Date"
                className="text-gray-600 font-medium"
              />
              <Input
                control={control}
                name="initialToSelectedDate"
                placeholder="e.g. 2022-01-01"
                disabled
              />
            </div>
            <div className="my-2">
              <FieldLabel
                name="filterType"
                label="Filter Type"
                className="text-gray-600 font-medium"
                required
              />

              <Select
                control={control}
                name="filterType"
                placeholder="Please select filter type"
                options={filterTypeOptions}
                className="block"
              />
            </div>
          </div>

          <div className="flex gap-6 mt-10">
            <div className="w-1/2">
              <Button
                type="primary"
                block
                ghost
                size="large"
                className="btn-cancel"
                htmlType="button"
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
