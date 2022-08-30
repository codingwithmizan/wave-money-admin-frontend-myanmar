import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import { Table, Space, Row, Col, Card, Tooltip, Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { LoadingSpiner } from "@/components/common";
import { useForm } from "react-hook-form";
import { InputSearch } from "@/components/controls";
import { useCommon, usePagination, useDebounce } from "@/hooks";
import moment from "moment";
import {
  setHeaderTitle,
  getUserPermissions,
  getStyledStatus,
} from "@/lib/helpers";
import { getPaginatedData } from "@/lib/services";
import ExportCSV from "@/components/common/ExportCSV";
import { BiDetail } from "react-icons/bi";
import { saveAs } from "file-saver";
import { capitalize } from "lodash";

// import { ROLES as RBP } from "@/lib/constants";

// const userCreate = getUserPermissions(RBP?.PORTAL_USER?.CREATE);
// const userEdit = getUserPermissions(RBP?.PORTAL_USER?.UPDATE);

const List = () => {
  const [bulkList, setBulkList] = useState<any[]>([]);
  const { loading, setLoading } = useCommon();
  const { page, perPage, totalPages, setPage, setPerPage, setTotalPages } =
    usePagination();

  useEffect(() => {
    getBulkList(page, perPage);
  }, []);

  const { watch, control, reset } = useForm({
    defaultValues: {
      search: "",
      role: "",
    },
  });

  const search = watch("search", "");
  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    getBulkList(page, perPage, { search_key: debouncedSearch });
  }, [debouncedSearch]);

  const getBulkList = async (page: number, perPage: number, param?: any) => {
    setLoading(true);
    const params = {
      search_key: param?.search_key,
    };
    const res = await getPaginatedData("bulk_uploads", {
      page: page,
      per_page: perPage,
      ...params,
    });

    setLoading(false);
    if (res?.status === 200) {
      setBulkList(res?.data?.data);
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
    getBulkList(page, perPage);
  };

  const onDownloadImg = (url: string) => {
    saveAs(url, "bulk uploaded file");
  };

  setHeaderTitle("bulk-list");

  return (
    <Card title="Bulk List" className="my-6 shadow">
      <Row className="-mt-2">
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 16 }}
          xl={{ span: 16 }}
          xxl={{ span: 16 }}
        >
          <form>
            <div className=" flex items-center gap-4">
              <div>
                <InputSearch
                  control={control}
                  name="search"
                  placeholder="Search by Status, Maker, Upload Type and File Name."
                  className="w-72 xl:w-80 2xl:w-96 text-xs"
                />
              </div>
            </div>
          </form>
        </Col>
        {/* <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 8 }}
          xl={{ span: 8 }}
          xxl={{ span: 8 }}
        >
          <div className="relative lg:top-2.5 flex lg:justify-end">
            <ExportCSV
              name={"Otc List.csv"}
              url={`otc_customers`}
              headers={headers}
              loadData={loadData}
              params={{ skip_pagination: true }}
              title="OTC List"
            />
          </div>
        </Col> */}
      </Row>

      {loading && (
        <div className="flex justify-center mt-48 ">
          <LoadingSpiner />
        </div>
      )}

      <div className="my-6">
        <Table
          columns={columns}
          dataSource={bulkList}
          rowKey={"id"}
          pagination={false}
          size="small"
          expandable={{
            expandedRowRender: (record) => (
              <table className="nested-table">
                <tr>
                  <td className="table-expand-data">Creation Date :</td>
                  <td className="table-expand-data">
                    {moment(record?.created_at).format("YYYY-MM-DD")}
                  </td>
                </tr>
                <tr>
                  <td className="table-expand-data">Approved Date :</td>
                  <td className="table-expand-data">
                    {moment(record?.updated_at).format("YYYY-MM-DD")}
                  </td>
                </tr>
                <tr>
                  <td className="table-expand-data">OCR Checked :</td>
                  <td className="table-expand-data">
                    {record?.ocr_checked.toString()}
                  </td>
                </tr>
                <tr>
                  <td className="table-expand-data">Note :</td>
                  <td className="table-expand-data">
                    {record?.note ? record?.note : "N/A"}
                  </td>
                </tr>

                <tr>
                  <td className="table-expand-data">Export :</td>
                  <td>
                    <Button
                      type="link"
                      htmlType="button"
                      icon={<DownloadOutlined className="relative -top-1" />}
                      danger
                      className="font-medium"
                      onClick={() => onDownloadImg(record?.file?.url)}
                    >
                      Download
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td className="table-expand-data">Action :</td>
                  <td className="pl-10">
                    <Space size="middle">
                      <Tooltip placement="bottom" title="User Details">
                        <Link to={`/bulk-details/${record.id}`}>
                          <BiDetail className="text-2xl text-gray-500" />
                        </Link>
                      </Tooltip>
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
    title: "Bulk ID",
    dataIndex: "id",
    key: "id",
    align: "center",
    width: "220px",
    sorter: (a: any, b: any) => a?.id - b?.id,
    render: (text: any, record: any) => (
      <Link to={`/bulk-details/${record.id}`}>{record?.id}</Link>
    ),
  },
  {
    title: "Bulk Upload Type",
    dataIndex: "upload_type",
    key: "upload_type",
    align: "center",
    sorter: (a: any, b: any) => a?.upload_type.localeCompare(b?.upload_type),
    render: (text: any, record: any) => capitalize(text),
  },

  {
    title: "File Name",
    dataIndex: "file_name",
    key: "file_name",
    align: "center",
    sorter: (a: any, b: any) => a?.file_name.localeCompare(b?.file_name),
  },
  {
    title: "Maker",
    dataIndex: "created_by",
    key: "created_by",
    align: "center",
    sorter: (a: any, b: any) => a?.created_by.localeCompare(b?.created_by),
  },
  {
    title: "Operator ID",
    dataIndex: "operator_id",
    key: "operator_id",
    align: "center",
    sorter: (a: any, b: any) => a?.operator_id.localeCompare(b?.operator_id),
  },
  {
    title: "No. of Record(s)",
    dataIndex: "no_of_records",
    key: "item_size",
    align: "center",
    sorter: (a: any, b: any) => a?.no_of_records - b?.no_of_records,
    render: (text: any, record: any) => (
      <span>{text > 1 ? `${text} items` : `${text} item`}</span>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    align: "center",
    sorter: (a: any, b: any) => a?.status.localeCompare(b?.status),
    render: (text: any, record: any) => getStyledStatus(text),
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
