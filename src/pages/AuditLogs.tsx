import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Table, Space } from "antd";
import Pagination from "@mui/material/Pagination";
import { setHeaderTitle, humanize } from "@/lib/helpers/utils";
import { getPaginatedData } from "@/lib/services/baseServices";
import { FaUserPlus } from "react-icons/fa";
import CircularProgress from "@mui/material/CircularProgress";

const List = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(3);
  const [totalPages, setTotalPages] = useState(0);

  setHeaderTitle("otc_management");

  useEffect(() => {
    getAllOTCs(page,perPage );
  }, []);

  const getAllOTCs = async (page: number, perPage: number) => {
    setLoading(true);
    const response = await getPaginatedData("customers/audit_logs", {
      page: page,
      per_page: perPage,
    });
    setLoading(false);
    if (response?.status === 200) {
        setLogs(response?.data?.data);
        setPage(+response?.headers["x-page"]);
        setTotalPages(+response?.headers["x-total-pages"]);
    } else {
      console.log("Something went wrong");
    }
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    getAllOTCs(page, perPage);
  };

  const columns: any = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
      sorter: (a: any, b: any) => a.id - b.id,
    },
    {
      title: "Sender MSISDN",
      dataIndex: "sender_msisdn",
      key: "sender_msisdn",
      align: "center",
      sorter: (a: any, b: any) => a.sender_msisdn.localeCompare(b.sender_msisdn),
    },
    {
      title: "Sender",
      dataIndex: "sender_name",
      key: "sender_name",
      align: "center",
      sorter: (a: any, b: any) => a.sender_name.localeCompare(b.sender_name),
    },
    {
      title: "Sender ID",
      dataIndex: "sender_id_number",
      key: "sender_id_number",
      align: "center",
      sorter: (a: any, b: any) => a.sender_id_number.localeCompare(b.sender_id_number),
    },
    {
        title: "Receiver MSISDN",
        dataIndex: "receiver_msisdn",
        key: "receiver_msisdn",
        align: "center",
        sorter: (a: any, b: any) => a.receiver_msisdn.localeCompare(b.receiver_msisdn),
      },
      {
        title: "Recevier",
        dataIndex: "receiver_name",
        key: "receiver_name",
        align: "center",
        sorter: (a: any, b: any) => a.receiver_name.localeCompare(b.receiver_name),
      },
      {
        title: "Receiver ID",
        dataIndex: "receiver_id_number",
        key: "receiver_id_number",
        align: "center",
        sorter: (a: any, b: any) => a.receiver_id_number.localeCompare(b.receiver_id_number),
      },
  ];
  if (loading) {
    return (
      <div className="flex justify-center mt-48 ">
        <CircularProgress size={48} />
      </div>
    );
  }
  return (
    <div className="bg-white mt-4 mx-4 rounded-lg p-8 shadow-sm">

      <h2 className="page-title mb-4">
        OTC List
      </h2>

      <div className="mb-6">
        <Table
          columns={columns}
          dataSource={logs}
          rowKey={"id"}
          pagination={false}
          bordered
          size="small"
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
    </div>
  );
};

export default List;
