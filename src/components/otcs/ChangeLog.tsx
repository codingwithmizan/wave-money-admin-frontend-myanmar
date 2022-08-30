import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Table, Card, Space } from "antd";
import Pagination from "@mui/material/Pagination";
import { getPaginatedData } from "@/lib/services";
import { InputSearch } from "@/components/controls";
import { Link } from "react-router-dom";
import { BiDetail } from "react-icons/bi";
import moment from "moment";
import {usePagination, useDebounce} from '@/hooks'

export const ChangeLog = ({ id }: any) => {
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const {page, setPage, perPage, setPerPage, totalPages, setTotalPages} = usePagination()

  const { control, watch } = useForm({
    defaultValues: {
      search_by: "",
    },
  });

  const searchResult = watch('search_by','')
  const debounceResult = useDebounce(searchResult, 500)

  useEffect(() => {
    getAuditLogs(page, perPage);
  }, [id, debounceResult]);

  const getAuditLogs = async (page: number, perPage: number) => {
    setLoading(true);
    const res = await getPaginatedData(`audit_logs/profile/${id}`, {
      page: page,
      per_page: perPage,
      search_by:debounceResult
    });
    setLoading(false);

    if (res?.data?.success) {
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

  return (
    <Card className="page-body ">
      <Row className="mt-2">
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 12 }}
          xl={{ span: 12 }}
          xxl={{ span: 12 }}
        >
          <h2 className="page-title relative top-2.5 wave-money-title">Change Log</h2>
        </Col>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 12 }}
          xl={{ span: 12 }}
          xxl={{ span: 12 }}
        >
          <div className="w-96 ml-auto">
            <InputSearch
              name="search_by"
              control={control}
              placeholder="Search by Operator Id or Name"
              className="w-96"
            />
          </div>
        </Col>
      </Row>

      <div className="my-4">
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
                  <td>Action :</td>
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

const columns: any = [
  {
    title: "Operator ID",
    dataIndex: "created_by.id",
    key:"created_by.id",
    align: "center",
    sorter: (a: any, b: any) => a?.created_by?.id?.localeCompare(b?.created_by?.id),
    render: (text: any, record: any) => (
      <span>{record?.created_by?.id || ""}</span>
    ),
  },
  {
    title: "Operator Name",
    dataIndex: "created_by.name",
    key: "created_by.name",
    align: "center",
    sorter: (a: any, b: any) => a?.created_by?.name?.localeCompare(b?.created_by?.name),
    render: (text: any, record: any) => <span>{record?.created_by?.name}</span>,
  },
  {
    title: "Modified Date",
    dataIndex: "modified_date",
    key: "modified_date",
    align: "center",
    sorter: (a: any, b: any) => a.modified_date.localeCompare(b.modified_date),
    render: (text: any, record: any) => (
      <>{moment(text).format("DD-MM-YYYY HH:mm:ss")}</>
    ),
  },
  {
    title: "Reasons",
    dataIndex: "change_reason",
    key: "change_reason",
    align: "center",
    sorter: (a: any, b: any) => a?.change_reason?.localeCompare(b?.change_reason),
  },
  {
    title: "SR Number",
    dataIndex: "sr_number",
    key: "sr_number",
    align: "center",
    sorter: (a: any, b: any) => a?.sr_number?.localeCompare(b?.sr_number),
  },
  Table.EXPAND_COLUMN,
];

const changelogOptions = [
  { id: 1, label: "MSISDN", value: "msisdn" },
  { id: 2, label: "Agent", value: "agent" },
];
