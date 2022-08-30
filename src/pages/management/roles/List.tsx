import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import { FaUserPlus } from "react-icons/fa";
import { Table, Space, Card, Row, Col, Tooltip } from "antd";
import { LoadingSpiner } from "@/components/common";
import { BiDetail } from "react-icons/bi";
import { RiEditLine } from "react-icons/ri";
import moment from "moment";
import { useCommon, usePagination } from "@/hooks";
import { setHeaderTitle, getUserPermissions } from "@/lib/helpers";
import { getPaginatedData } from "@/lib/services";
import { ROLES as RBP } from "@/lib/constants";

const roleCreate = getUserPermissions(RBP?.ROLE?.CREATE);
const roleEdit = getUserPermissions(RBP?.ROLE?.UPDATE);


const List = () => {
  const [roles, setRoles] = useState<any[]>([]);
  const { loading, setLoading } = useCommon();
  const { page, perPage, totalPages, setPage, setPerPage, setTotalPages } =
    usePagination();

  useEffect(() => {
    getAllRoles(page, perPage);
  }, []);

  const getAllRoles = async (page: number, perPage: number) => {
    setLoading(true);
    const res = await getPaginatedData("roles", {
      page: page,
      per_page: perPage,
    });
    setLoading(false);
    if (res?.status === 200) {
      setRoles(res?.data?.data);
      setPage(+res.headers["x-page"]);
      setTotalPages(+res?.headers["x-total-pages"]);
    } else {
      console.log("Something went wrong");
    }
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    getAllRoles(value, perPage);
  };

  setHeaderTitle("role-management");

  const columns: any = [
    {
      title: "ID",
      dataIndex: "id",
      align: "center",
      width: "10%",
      sorter: (a: any, b: any) => a.id - b.id,
    },
    {
      title: "Role Name",
      dataIndex: "name",
      key: "id",
      align: "center",
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: "Created Date",
      dataIndex: "created_at",
      key: "id",
      align: "center",
      sorter: (a: any, b: any) => a.created_at.localeCompare(b.created_at),
      render: (text: any, record: any) => (
        <span>{moment(text).format("YYYY-MM-DD")}</span>
      ),
    },

    {
      title: "Action",
      align: "center",
      key: "id",
      width: "200px",
      render: (text: any, record: any) => (
        <Space size="middle">
          <Tooltip placement="bottom" title="Role Details">
            <Link to={`/role/details/${record?.id}`}>
              <BiDetail className="text-2xl text-gray-500" />
            </Link>
          </Tooltip>

          {roleEdit.isAuthorized && (
            <Tooltip placement="bottom" title="Role Edit">
              <Link to={`/role/edit/${record?.id}`}>
                <RiEditLine className="text-2xl text-gray-500" />
              </Link>
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

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
          <h2 className="page-title wave-money-title ">Role List</h2>
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
            {roleCreate.isAuthorized && (
              <Link to="/role/add" className="btn btn-add w-36 2xl:w-40 wave-money-text">
                <FaUserPlus className="btn-icon wave-money-text" /> Add Role
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
          dataSource={roles}
          rowKey={"id"}
          size="small"
          pagination={false}
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
