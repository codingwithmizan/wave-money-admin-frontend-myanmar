import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Table, Space } from "antd";
import Pagination from "@mui/material/Pagination";
import { setHeaderTitle } from "@/lib/helpers/utils";
import { getPaginatedData } from "@/lib/services/baseServices";
import { AiOutlineEye } from "react-icons/ai";
import { MdModeEditOutline } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import DeleteClientModal from "@/components/management/companies/DeleteClientModal";
import CircularProgress from "@mui/material/CircularProgress";
import ExportCSV from "@/components/common/ExportCSV";


const List = () => {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(3);
  const [totalPages, setTotalPages] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [clientId, setClientId] = useState(0);
  const [clientName, setClientName] = useState("");

  setHeaderTitle("threshold_management");

  useEffect(() => {
    getAllThresholds(page, perPage);
  }, []);

  const getAllThresholds = async (page: number, perPage: number) => {
    setLoading(true);
    const response = await getPaginatedData("customers/threshold_settings", {
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
    getAllThresholds(page, perPage);
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
      title: "Action",
      align: "center",
      key: "id",
      render: (text: any, record: any) => (
        <Space size="middle">
          <Link to={`/client/details/${record.id}`}>
            <AiOutlineEye className="text-sky-700 text-lg" />
          </Link>

          <Link to={`/client/edit/${record.id}`}>
            <MdModeEditOutline className="text-yellow-400 text-lg" />
          </Link>
          {/* <button onClick={() => showHideModal(record?.id, record?.name)}>
            <RiDeleteBinLine className="text-red-700 text-lg" />
          </button> */}
        </Space>
      ),
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

      <h2 className="page-title mb-4">Threshold List</h2>

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
