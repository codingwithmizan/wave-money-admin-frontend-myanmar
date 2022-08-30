import { useState, useEffect } from "react";
import { Table } from "antd";
import Pagination from "@mui/material/Pagination";
import { setHeaderTitle } from "@/lib/helpers/utils";
import { getPaginatedData } from "@/lib/services/baseServices";
import CircularProgress from "@mui/material/CircularProgress";
import ExportCSV from "@/components/common/ExportCSV";

const headers = [
	{ label: "Name", key: "name" },
	{ label: "MSISDN", key: "msisdn" },
	{ label: "Date Of Birth", key: "dob" },
	{ label: "Gender", key: "gender" },
	{ label: "Nationality", key: "nationality" },
	{ label: "Employee Status", key: "employment_status" },
	{ label: "Father name", key: "father_name" },
	{ label: "Status", key: "status" },
];

const loadData = (item: any) => {
	return {
		name: item.name,
		msisdn: item.msisdn,
		dob: item.dob,
		gender: item.gender,
		nationality: item.nationality,
		employment_status: item.employment_status,
		father_name: item.father_name,
		status: item.status,
	};
};

const List = () => {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(3);
  const [totalPages, setTotalPages] = useState(0);

  setHeaderTitle("client_management");

  useEffect(() => {
    getAllClients(page, perPage);
  }, []);

  const getAllClients = async (page: number, perPage: number) => {
    setLoading(true);
    const response = await getPaginatedData("customers", {
      page: page,
      per_page: perPage,
    });
    setLoading(false);
    if (response?.status === 200) {
      setClients(response?.data?.data);
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
    getAllClients(page, perPage);
  };

  const getStatus = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <button className="bg-green-300 text-white py-1.5 px-3 rounded-full text-xs">
            Approved
          </button>
        );
      case "pending":
        return (
          <button className="bg-yellow-300 text-white py-1.5 px-3 rounded-full text-xs">
            Pending
          </button>
        );
      case "rejected":
        return (
          <button className="bg-red-300 text-white py-1.5 px-3 rounded-full text-xs">
            Rejected
          </button>
        );
      default:
        return "";
    }
  };

  const columns: any = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      align: "center",
      sorter: (a: any, b: any) => a.id - b.id,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "id",
      align: "center",
      sorter: (a: any, b: any) => a.name?.localeCompare(b.name),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "id",
      align: "center",
    },
    {
      title: "Phone",
      dataIndex: "msisdn",
      key: "id",
      align: "center",
    },
    {
      title: "Nationality",
      dataIndex: "nationality",
      key: "id",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "id",
      align: "center",
      render: (status: string) => <div>{status && getStatus(status)}</div>,
      // filters: [
      //   { text: "Pending", value: "pending" },
      //   { text: "Rejected", value: "rejected" },
      //   { text: "Accepted", value: "accepted" }
      // ],
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
      <div className="flex justify-end">
        <ExportCSV 
          name={"Customer List.csv"}
          url={`customers`}
          headers={headers}
          loadData={loadData}
          params={{skip_pagination: true}}
          title="Client List"/>
      </div>

      <h2 className="page-title mb-4">Client List</h2>

      <div className="mb-6">
        <Table
          columns={columns}
          dataSource={clients}
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