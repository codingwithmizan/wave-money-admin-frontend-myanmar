import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Table, Space, Row, Col, Button, Card, Tooltip } from "antd";
import Pagination from "@mui/material/Pagination";
import { BiDetail } from "react-icons/bi";
import { RiEditLine } from "react-icons/ri";
import {
  humanize,
  setHeaderTitle,
  getStyledStatus,
  getUserPermissions,
} from "@/lib/helpers";
import { getPaginatedData } from "@/lib/services";
import { LoadingSpiner } from "@/components/common";
import ExportCSV from "@/components/common/ExportCSV";
import { Input } from "@/components/controls";
import { FilterOutlined, ReloadOutlined } from "@ant-design/icons";
import { OtcFilter } from "@/components/otcs";
import { useCommon, usePagination, useDebounce } from "@/hooks";
import moment from "moment";
import { ROLES as RBP } from "@/lib/constants";
import { toUpper, capitalize } from "lodash";


const otcEdit = getUserPermissions(RBP?.OTC?.UPDATE);

const List = () => {
  const [pendingOtcProfiles, setPendingOtcProfiles] = useState<any[]>([]);
  const [otcFilteredValue, setOtcFilteredValue] = useState<any>({});

  const { loading, setLoading, isModalVisible, toggleModalVisible } =
    useCommon();
  const { page, perPage, totalPages, setPage, setPerPage, setTotalPages } =
    usePagination();

  const { reset, watch, control } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const search = watch("search", "");
  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    const serarchVal = { ...otcFilteredValue };
    serarchVal["search_by"] = debouncedSearch;
    setOtcFilteredValue(serarchVal);
    setPage(1);
  }, [debouncedSearch]);

  useEffect(() => {
    getPendingOtcProfiles(page, perPage);
  }, [otcFilteredValue]);

  const getPendingOtcProfiles = async (page: number, perPage: number) => {
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
      "otc_profiles/pending/create_requests",
      Object.assign(
        {
          page: page,
          perPage: perPage,
          search_by: otcFilteredValue?.search_by,
        },
        keys
      )
    );
    setLoading(false);
    if (res?.status === 200) {
      setPendingOtcProfiles(res?.data?.data);
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
    getPendingOtcProfiles(page, perPage);
  };

  const onReset = () => {
    reset({
      search: "",
    });
    setOtcFilteredValue({});
  };

  setHeaderTitle("pending-to-approve-otc-profiles");

  return (
    <Card title="Pending to Approve List" className="my-6 shadow">
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
            <form>
              <Input
                control={control}
                name="search"
                placeholder="Search by Name, Agent MSISDN, Unique Id or Id Number"
                className="w-72 xl:w-80 2xl:w-96"
              />
            </form>
            <Button
              size="large"
              icon={<FilterOutlined className="relative -top-1 -left-0.5" />}
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
                onClick={onReset}
                icon={<ReloadOutlined className=" text-gray-200 " />}
              />
            </Tooltip>
          </div>
        </Col>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 8 }}
          xl={{ span: 8 }}
          xxl={{ span: 8 }}
        >
          {/* <div className="relative lg:top-2.5 flex lg:justify-end">
            <ExportCSV
              name={"Otc List.csv"}
              url={`otc_customers`}
              headers={headers}
              loadData={loadData}
              params={{ skip_pagination: true }}
              title="OTC List"
            />
          </div> */}
        </Col>
      </Row>

      {loading && (
        <div className="flex justify-center mt-48 ">
          <LoadingSpiner />
        </div>
      )}

      <div className="mb-6 mt-2">
        <Table
          columns={columns}
          dataSource={pendingOtcProfiles}
          rowKey="unique_id"
          pagination={false}
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
                          to={`/otc/pending-to-approve/details/${encodeURI(
                            record.unique_id
                          )}`}
                        >
                          <BiDetail className="text-2xl text-gray-500" />
                        </Link>
                      </Tooltip>

                      {otcEdit.isAuthorized && (
                        <Tooltip placement="bottom" title="OTC Edit">
                          <Link
                            to={`/otc/pending-to-approve/edit/${encodeURI(
                              record.unique_id
                            )}`}
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

      <OtcFilter
        isModalVisible={isModalVisible}
        toggleModal={toggleModalVisible}
        otcFilteredValue={otcFilteredValue}
        setOtcFilteredValue={setOtcFilteredValue}
        setPage={setPage}
      />
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
        to={`/otc/pending-to-approve/details/${encodeURI(record.unique_id)}`}
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
