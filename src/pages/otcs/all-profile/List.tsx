import {
  Link,
  useSearchParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Table, Row, Col, Button, Card, Tooltip, Space } from "antd";
import Pagination from "@mui/material/Pagination";
import { setHeaderTitle, getStyledStatus, getOtcUrl } from "@/lib/helpers";
import { getPaginatedData } from "@/lib/services";
import { LoadingSpiner } from "@/components/common";
import ExportCSV from "@/components/common/ExportCSV";
import { InputSearch } from "@/components/controls";
import { FilterOutlined, ReloadOutlined } from "@ant-design/icons";
import { useCommon, usePagination, useDebounce } from "@/hooks";
import { AllOtcFilter } from "@/components/otcs";
import moment from "moment";
import _ from "lodash";
import { BiDetail } from "react-icons/bi";
import { toUpper, capitalize } from "lodash";
import { RiEditLine } from "react-icons/ri";

const List = () => {
  let [searchParams] = useSearchParams();
  const [allOtcProfiles, setAllOtcProfiles] = useState<any[]>([]);
  const [otcFilteredValue, setOtcFilteredValue] = useState<any>({
    start_date: searchParams?.get("start_date"),
    end_date: searchParams?.get("end_date"),
    filter_by: searchParams?.get("filter_by"),
  });
  const [searchValue, setSearchValue] = useState<any>({
    start_date: searchParams?.get("start_date"),
    end_date: searchParams?.get("end_date"),
    filter_by: searchParams?.get("filter_by"),
  });
  const location = useLocation();

  const { loading, setLoading, isModalVisible, toggleModalVisible } =
    useCommon();
  const { page, perPage, totalPages, setPage, setPerPage, setTotalPages } =
    usePagination();
  console.log("location", location);

  const { reset, watch, control, handleSubmit, setValue } = useForm({
    defaultValues: {
      search: "",
      id_type: "",
      created_at: "",
      updated_at: "",
      dob: "",
      filter_by: "",
      start_date: "",
      end_date: "",
      status: "",
      agent_msisdn: "",
    },
  });

  useEffect(() => {
    const otcfilterVal = { ...otcFilteredValue };
    const searchVal = { ...searchValue };
    otcfilterVal["start_date"] = searchParams?.get("start_date");
    otcfilterVal["end_date"] = searchParams?.get("end_date");
    otcfilterVal["filter_by"] = searchParams?.get("filter_by");

    searchVal["start_date"] = searchParams?.get("start_date");
    searchVal["end_date"] = searchParams?.get("end_date");
    searchVal["filter_by"] = searchParams?.get("filter_by");

    setOtcFilteredValue(otcfilterVal);
    setSearchValue(searchVal);
  }, [searchParams]);

  useEffect(() => {
    setValue(
      "filter_by",
      otcFilteredValue?.filter_by ? otcFilteredValue?.filter_by : ""
    );
    setValue(
      "start_date",
      !_.isEmpty(otcFilteredValue.start_date)
        ? (moment(otcFilteredValue?.start_date) as any)
        : ""
    );
    setValue(
      "end_date",
      !_.isEmpty(otcFilteredValue.end_date)
        ? (moment(otcFilteredValue?.end_date) as any)
        : ""
    );
  }, [otcFilteredValue]);

  useEffect(() => {
    if (location.pathname === "/otc-profiles") onListReset();
  }, [location.search]);

  const search = watch("search", "");
  const debouncedSearch = useDebounce(search, 400);
  const navigate = useNavigate();

  useEffect(() => {
    const serarchVal = { ...otcFilteredValue };
    serarchVal["search_by"] = debouncedSearch;
    setOtcFilteredValue(serarchVal);
    setPage(1);
  }, [debouncedSearch]);

  useEffect(() => {
    getAcceptOtcProfiles(page, perPage);
  }, [otcFilteredValue]);

  const getAcceptOtcProfiles = async (page: number, perPage: number) => {
    setLoading(true);
    const keys = {
      "keys[id_type]": otcFilteredValue?.id_type,
      "keys[created_at]": otcFilteredValue?.created_at,
      "keys[updated_at]": otcFilteredValue?.updated_at,
      "keys[dob]": otcFilteredValue?.dob,
      "keys[status]": otcFilteredValue?.status,
      "keys[agent_msisdn]": otcFilteredValue?.agent_msisdn,
    };

    const res = await getPaginatedData(
      "otc_profiles/list",
      Object.assign(
        {
          page: page,
          perPage: perPage,
          search_by: otcFilteredValue?.search_by,
          start_date: otcFilteredValue?.start_date,
          end_date: otcFilteredValue?.end_date,
          filter_by: otcFilteredValue?.filter_by,
        },
        keys
      )
    );
    setLoading(false);
    if (res?.status === 200) {
      setAllOtcProfiles(res?.data?.data);
      setPage(+res?.headers["x-page"]);
      setTotalPages(+res?.headers["x-total-pages"]);
    } else {
      console.log("Something went wrong");
    }
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    getAcceptOtcProfiles(page, perPage);
  };

  const onReset = (allClear?: boolean) => {
    reset({
      id_type: "",
      created_at: "",
      updated_at: "",
      dob: "",
      status: "",
      agent_msisdn: "",
      filter_by:
        searchValue?.filter_by && !allClear ? searchValue?.filter_by : "",
      start_date:
        !_.isEmpty(searchValue.start_date) && !allClear
          ? (moment(searchValue?.start_date) as any)
          : "",
      end_date:
        !_.isEmpty(searchValue.end_date) && !allClear
          ? (moment(searchValue?.end_date) as any)
          : "",
    });
    const filteredVal = { ...otcFilteredValue };
    filteredVal["id_type"] =
      searchValue?.filter_by && !allClear ? searchValue?.filter_by : "";
    filteredVal["created_at"] = "";
    filteredVal["updated_at"] = "";
    filteredVal["dob"] = "";
    filteredVal["status"] = "";
    filteredVal["agent_msisdn"] = "";
    filteredVal["filter_by"] = "";
    filteredVal["start_date"] =
      searchValue?.start_date && !allClear ? searchValue?.start_date : "";
    filteredVal["end_date"] =
      searchValue?.end_date && !allClear ? searchValue?.end_date : "";
    setOtcFilteredValue(filteredVal);
    if (allClear) {
      navigate("/otc-profiles", { replace: true });
    }
  };

  const onListReset = () => {
    reset({
      search: "",
    });
    onReset(true);
  };

  const onSubmit = (data: any) => {
    toggleModalVisible();
    const filteredVal = { ...otcFilteredValue };
    filteredVal["id_type"] = data?.id_type;
    filteredVal["created_at"] = data?.created_at?._d
      ? moment(data?.created_at?._d).format("YYYY-MM-DD")
      : "";
    filteredVal["updated_at"] = data?.updated_at?._d
      ? moment(data?.updated_at?._d).format("YYYY-MM-DD")
      : "";
    filteredVal["dob"] = data?.dob?._d
      ? moment(data?.dob?._d).format("YYYY-MM-DD")
      : "";
    filteredVal["status"] = data?.status;
    filteredVal["agent_msisdn"] = data?.agent_msisdn;
    filteredVal["filter_by"] = data?.filter_by;
    filteredVal["start_date"] = data?.start_date?._d
      ? moment(data?.start_date?._d).format("YYYY-MM-DD")
      : "";
    filteredVal["end_date"] = data?.end_date?._d
      ? moment(data?.end_date?._d).format("YYYY-MM-DD")
      : "";
    setPage(1);
    setOtcFilteredValue(filteredVal);
  };

  setHeaderTitle("all-otc-profiles");

  return (
    <Card title="All OTC Profile List" className="my-6 shadow">
      <Row className="-mt-2">
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 16 }}
          xl={{ span: 16 }}
          xxl={{ span: 16 }}
        >
          <div className="flex items-center gap-6 mb-2 ">
            <InputSearch
              control={control}
              name="search"
              placeholder="Search by Name, Agent MSISDN, Unique Id or Id Number"
              className="w-72 xl:w-80 2xl:w-96"
            />
            <Button
              size="large"
              icon={
                <FilterOutlined className="relative -top-1 -left-0.5 wave-money-text" />
              }
              className="px-4 xl:px-6 text-gray-500 wave-money-text"
              onClick={toggleModalVisible}
            >
              Filter by
            </Button>

            <Tooltip placement="bottom" title="Reset">
              <Button
                className="bg-sky-800 hover:bg-sky-700 focus:bg-sky-700 border-sky-700 rounded !h-9"
                type="primary"
                size="large"
                htmlType="button"
                onClick={onListReset}
                icon={<ReloadOutlined className=" text-gray-200 " />}
              />
            </Tooltip>

            <AllOtcFilter
              isModalVisible={isModalVisible}
              toggleModal={toggleModalVisible}
              control={control}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              onReset={onListReset}
            />
          </div>
        </Col>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 8 }}
          xl={{ span: 8 }}
          xxl={{ span: 8 }}
        ></Col>
      </Row>

      {loading && (
        <div className="flex justify-center mt-48 ">
          <LoadingSpiner />
        </div>
      )}

      <div className="mb-6 mt-2">
        <Table
          columns={columns}
          dataSource={allOtcProfiles}
          pagination={false}
          rowKey="id"
          size="small"
          expandable={{
            expandedRowRender: (record) => (
              <table className="nested-table">
                <tr>
                  <td className="table-expand-data">
                    Submitted Agent’s MSISDN :
                  </td>
                  <td className="table-expand-data">
                    {record?.agent_msisdn ? record?.agent_msisdn : "N/A"}
                  </td>
                </tr>
                <tr>
                  <td className="table-expand-data">Profile Status :</td>
                  <td className="table-expand-data">
                    {getStyledStatus(record?.account_status)}
                  </td>
                </tr>
                <tr>
                  <td className="table-expand-data">Action :</td>
                  <td>
                    <Space size="middle">
                      <Tooltip placement="bottom" title="OTC Details">
                        <Link
                          to={getOtcUrl(
                            record?.kyc_status,
                            encodeURI(record.unique_id),
                            "details"
                          )}
                        >
                          <BiDetail className="text-2xl text-gray-500" />
                        </Link>
                      </Tooltip>
                      {["accepted", "pending_approval"].includes(
                        record?.kyc_status
                      ) && (
                        <Tooltip placement="bottom" title="OTC Edit">
                          <Link
                            to={getOtcUrl(
                              record?.kyc_status,
                              encodeURI(record.unique_id),
                              "edit"
                            )}
                          >
                            <RiEditLine className="text-2xl text-gray-500" />
                          </Link>
                        </Tooltip>
                      )}
                    </Space>
                  </td>
                </tr>
              </table>
            ),
          }}
        />
      </div>
      <div className="flex justify-end">
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          showFirstButton
          showLastButton
        />
      </div>
    </Card>
  );
};

export default List;

const columns: any = [
  {
    title: "Unique Customer ID",
    dataIndex: "unique_id",
    key: "unique_id",
    align: "center",
    sorter: (a: any, b: any) => a?.unique_id.localeCompare(b?.unique_id),

    render: (text: any, record: any) => (
      <Link
        to={getOtcUrl(
          record?.kyc_status,
          encodeURI(record.unique_id),
          "details"
        )}
        className="underline"
      >
        {text}
      </Link>
    ),
  },
  {
    title: "ID Type",
    dataIndex: "id_type",
    key: "id_type",
    align: "center",
    sorter: (a: any, b: any) => a?.id_type.localeCompare(b?.id_type),
    render: (text: string) => (
      <span>{text === "nrc" ? toUpper(text) : capitalize(text)}</span>
    ),
  },
  {
    title: "ID Number  ",
    dataIndex: "id_number",
    key: "id_number",
    align: "center",
    sorter: (a: any, b: any) => a?.id_number.localeCompare(b?.id_number),
  },
  {
    title: "Full Name",
    dataIndex: "name",
    key: "name",
    align: "center",
    sorter: (a: any, b: any) => a?.name.localeCompare(b?.name),
  },
  {
    title: "KYC Status  ",
    dataIndex: "kyc_status",
    key: "kyc_status",
    align: "center",
    sorter: (a: any, b: any) => a?.kyc_status.localeCompare(b?.kyc_status),
    render: (text: any, record: any) => getStyledStatus(record?.kyc_status),
  },

  {
    title: "KYC Submission Date",
    dataIndex: "created_at",
    key: "created_at",
    align: "center",
    sorter: (a: any, b: any) => a?.created_at.localeCompare(b?.created_at),
    render: (text: any, record: any) => (
      <>{moment(text).format("DD-MM-YYYY HH:mm:ss")}</>
    ),
  },
  {
    title: "Last Modified Date",
    dataIndex: "updated_at",
    key: "updated_at",
    align: "center",
    sorter: (a: any, b: any) => a?.updated_at.localeCompare(b?.updated_at),
    render: (text: any, record: any) => (
      <>{moment(text).format("DD-MM-YYYY HH:mm:ss")}</>
    ),
  },
  Table.EXPAND_COLUMN,
];

const headers = [
  { label: "Sender msisdn", key: "sender_msisdn" },
  { label: "Sender Name", key: "sender_name" },
  { label: "Sender ID", key: "sender_id_number" },
  { label: "Receiver msisdn", key: "receiver_msisdn" },
  { label: "Receiver Name", key: "receiver_name" },
  { label: "Receiver ID", key: "receiver_id_number" },
];

const loadData = (item: any) => {
  return {
    sender_msisdn: item.sender_msisdn,
    sender_name: item.sender_name,
    sender_id_number: item.sender_id_number,
    receiver_msisdn: item.receiver_msisdn,
    receiver_name: item.receiver_name,
    receiver_id_number: item.receiver_id_number,
  };
};
