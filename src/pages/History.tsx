import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Table, Space } from "antd";
import Pagination from "@mui/material/Pagination";
import { setHeaderTitle, humanize } from "@/lib/helpers/utils";
import { getPaginatedData } from "@/lib/services/baseServices";
import { FaUserPlus } from "react-icons/fa";
import CircularProgress from "@mui/material/CircularProgress";
import ExportCSV from "@/components/common/ExportCSV";
const headers:any = [
	
];

const loadData = (item:any) => {
	return {
		
	};
};

const List = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [totalPages, setTotalPages] = useState(0);

  setHeaderTitle("audit_logs");

  useEffect(() => {
    getAllLogs(page,perPage );
  }, []);

  const getAllLogs = async (page: number, perPage: number) => {
    setLoading(true);
    const response = await getPaginatedData("audit_logs", {
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
    getAllLogs(page, perPage);
  };

  const columns: any = [
    {
      title: "User Name",
      dataIndex: "whodunnit",
      key: "whodunnit",
      align: "center",
      render: (whodunnit: any) => <div>{whodunnit?.name}</div>,
    },
    {
      title: "Timestamp",
      dataIndex: "created_at",
      key: "created_at",
      align: "center",
      sorter: (a: any, b: any) => a.created_at.localeCompare(b.created_at),
    },
    {
      title: "Event",
      dataIndex: "event",
      key: "event",
      align: "center",
      render: (event: string) => (
        <p>{event}</p>
      )
    },
    {
      title: "Item",
      dataIndex: "item_type",
      key: "item_type",
      align: "center",
      render: (item_type: string) => (
        <p>{item_type}</p>
      )
    },
    {
      title: "Object",
      dataIndex: "object",
      key: "object",
      align: "center",

      render: (object: any) => (
        <p>{object?.msisdn}</p>
      )
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
      {/* <div className="flex justify-end">
        <ExportCSV 
          name={"History.csv"}
          url={`audit_logs`}
          headers={headers}
          loadData={loadData}
          params={{skip_pagination: true}}
          title="History List"/>
      </div> */}
      <h2 className="page-title mb-4">
        Histories
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
