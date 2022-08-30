import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import {
  setHeaderTitle,
  getUserPermissions,
  getStyledStatus,
} from "@/lib/helpers/utils";
import { getPaginatedData } from "@/lib/services/baseServices";
import { FaUserPlus } from "react-icons/fa";
import { Table, Space, Card, Row, Col, Tooltip } from "antd";
import { BiDetail } from "react-icons/bi";
import { RiEditLine } from "react-icons/ri";
import { useCommon, usePagination } from "@/hooks";
import { LoadingSpiner } from "@/components/common";
import { ROLES as RBP } from "@/lib/constants";

const companyCreate = getUserPermissions(RBP?.COMPANY?.CREATE);
const companyEdit = getUserPermissions(RBP?.COMPANY?.UPDATE);

const List = () => {
  const [companies, setCompanies] = useState<any[]>([]);
  const { loading, setLoading } = useCommon();
  const { page, perPage, totalPages, setPage, setPerPage, setTotalPages } =
    usePagination();

  useEffect(() => {
    getAllCompanies(page, perPage);
  }, []);

  const getAllCompanies = async (page: number, perPage: number) => {
    setLoading(true);
    const res = await getPaginatedData("tenants", {
      page: page,
      per_page: perPage,
    });

    setLoading(false);
    if (res?.status === 200) {
      setCompanies(res?.data?.data);
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
    getAllCompanies(page, perPage);
  };

  setHeaderTitle("company-management");

  return (
    <Card className="my-6 shadow">
      <Row className="mt-4">
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 12 }}
          xl={{ span: 12 }}
          xxl={{ span: 12 }}
        >
          <h2 className="page-title wave-money-title">
            Company Management List
          </h2>
        </Col>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 12 }}
          xl={{ span: 12 }}
          xxl={{ span: 12 }}
        >
          <div className="flex justify-end">
            {companyCreate.isAuthorized && (
              <Link
                to="/company/add"
                className="btn btn-add w-36 2xl:w-40 wave-money-text"
              >
                <FaUserPlus className="btn-icon wave-money-text" /> Add Company
              </Link>
            )}
          </div>
        </Col>
      </Row>

      {loading && (
        <div className="flex justify-center mt-48 ">
          <LoadingSpiner />
        </div>
      )}

      <div className="my-6">
        <Table
          columns={columns}
          dataSource={companies}
          rowKey={"id"}
          pagination={false}
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
    </Card>
  );
};

export default List;

const columns: any = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    align: "center",
    sorter: (a: any, b: any) => a?.id - b?.id,

  },
  {
    title: "Company Name",
    dataIndex: "company_name",
    key: "id",
    align: "center",
    sorter: (a: any, b: any) => a?.company_name.localeCompare(b?.company_name),
  },

  {
    title: "Phone Number",
    dataIndex: "phone_number",
    key: "id",
    align: "center",
    sorter: (a: any, b: any) => a?.phone_number.localeCompare(b?.phone_number),
  },
  {
    title: "Email ID",
    dataIndex: "email",
    key: "id",
    align: "center",
    sorter: (a: any, b: any) => a?.email.localeCompare(b?.email),
  },
  {
    title: "Company Status",
    dataIndex: "company_status",
    key: "id",
    align: "center",
    sorter: (a: any, b: any) =>
      a?.company_status.localeCompare(b?.company_status),
    render: (text: any, record: any) => getStyledStatus(text),
  },
  {
    title: "Action",
    key: "id",
    align: "center",
    render: (text: any, record: any) => (
      <Space size="middle">
        <Tooltip placement="bottom" title="Company Details">
          <Link to={`/company/details/${record.id}`}>
            <BiDetail className="text-2xl text-gray-500" />
          </Link>
        </Tooltip>

        {companyEdit.isAuthorized && (
          <Tooltip placement="bottom" title="Company Edit">
            <Link to={`/company/edit/${record.id}`}>
              <RiEditLine className="text-2xl text-gray-500" />
            </Link>
          </Tooltip>
        )}
      </Space>
    ),
  },
];
