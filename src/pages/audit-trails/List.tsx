import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import { setHeaderTitle } from "@/lib/helpers";
import { getPaginatedData } from "@/lib/services";
import { Table, Space, Row, Col, Card, Tooltip, Button } from "antd";
import { LoadingSpiner } from "@/components/common";
import { useForm } from "react-hook-form";
import { DatePicker, InputSearch } from "@/components/controls";
import { BiDetail } from "react-icons/bi";
import { ReloadOutlined } from "@ant-design/icons";
import { useCommon, usePagination, useDebounce } from "@/hooks";
import moment from "moment";

const List = () => {
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const { loading, setLoading } = useCommon();
  const { page, perPage, totalPages, setPage, setPerPage, setTotalPages } =
    usePagination();

  const { reset, watch, control } = useForm({
    defaultValues: {
      search: "",
      date: "",
    },
  });

  useEffect(() => {
    getAuditLogs(page, perPage);
  }, []);

  const watchSearchKey = watch("search", "");
  const watchDate: any = watch("date", "");
  const debouncedSearch = useDebounce(watchSearchKey, 500);

  useEffect(() => {
    getAuditLogs(1, perPage);
  }, [debouncedSearch, watchDate]);

  const getAuditLogs = async (page: number, perPage: number) => {
    setLoading(true);
    const res = await getPaginatedData("audit_logs", {
      page: page,
      per_page: perPage,
      search_key: debouncedSearch,
      date: moment(watchDate?._d).format("YYYY-MM-DD"),
    });
    setLoading(false);
    if (res?.status === 200) {
      setAuditLogs(res?.data?.data);
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
    getAuditLogs(page, perPage);
  };

  const onReset = () => {
    reset({
      search: "",
      date: "",
    });
    getAuditLogs(page, perPage);
  };
  setHeaderTitle("audit-trail");
  return (
    <Card title="Audit Trail List" className="page-body my-6 shadow">
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
                  placeholder="Search by ID or Name"
                  className="w-80 rounded"
                />
              </div>
              <div className="w-72">
                <DatePicker
                  control={control}
                  name="date"
                  className="rounded"
                  placeholder="Select date"
                  allowClear
                />
              </div>
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
          </form>
        </Col>
      </Row>
      {loading && <LoadingSpiner />}

      <div className="my-6">
        <Table
          columns={columns}
          dataSource={auditLogs}
          rowKey={"id"}
          pagination={false}
          size="small"
          expandable={{
            expandedRowRender: (record) => (
              <table className="nested-table">
                <tr>
                  <td className="table-expand-data">Changes Reason :</td>
                  <td className="table-expand-data">{record?.change_reason}</td>
                </tr>
                <tr>
                  <td className="table-expand-data">Change Account Type :</td>
                  <td className="table-expand-data">
                    {record?.account_type.toUpperCase()}
                  </td>
                </tr>
                <tr>
                  <td className="table-expand-data">
                    Change Unique Customer ID :
                  </td>
                  <td className="table-expand-data">
                    {record?.unique_customer_id}
                  </td>
                </tr>
                <tr>
                  <td className="table-expand-data">Change MSISDN :</td>
                  <td className="table-expand-data">{record?.msisdn}</td>
                </tr>
                <tr>
                  <td className="table-expand-data">Change ID Type :</td>
                  <td className="table-expand-data">
                    {record?.id_type === "nrc" ? "NRC" : "Passport"}
                  </td>
                </tr>
                <tr>
                  <td className="table-expand-data">Change ID Number :</td>
                  <td className="table-expand-data">{record?.id_number}</td>
                </tr>
                <tr>
                  <td className="table-expand-data">Action :</td>
                  <td>
                    <Space size="middle">
                      <Link to={`/audit-trail/details/${record.id}`}>
                        <BiDetail className="text-2xl text-gray-500" />
                      </Link>
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
    title: "Agents ID",
    dataIndex: "created_by?.id",
    key: "id",
    align: "center",
    sorter: (a: any, b: any) =>
      a?.created_by?.id.localeCompare(b?.created_by?.id),
    render: (text: any, record: any) => (
      <span>{record?.created_by?.id || ""}</span>
    ),
  },

  {
    title: "Agents Name",
    dataIndex: "created_by?.name",
    key: "id",
    align: "center",
    sorter: (a: any, b: any) =>
      a?.created_by?.name.localeCompare(b?.created_by?.name),
    render: (text: any, record: any) => <span>{record?.created_by?.name}</span>,
  },
  {
    title: "Modification Date",
    dataIndex: "modified_date",
    key: "id",
    align: "center",
    sorter: (a: any, b: any) => a.modified_date.localeCompare(b.modified_date),
    render: (text: any, record: any) => (
      <>{moment(text).format("DD-MM-YYYY HH:mm:ss")}</>
    ),
  },
  {
    title: "Change Category",
    dataIndex: "change_category",
    key: "id",
    align: "center",
    sorter: (a: any, b: any) =>
      a.change_category.localeCompare(b.change_category),
  },
  {
    title: "Change Summary",
    dataIndex: "change_summary",
    key: "id",
    align: "center",
    sorter: (a: any, b: any) =>
      a.change_summary.localeCompare(b.change_summary),
  },
  Table.EXPAND_COLUMN,
];
