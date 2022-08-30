import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import { FaUserPlus } from "react-icons/fa";
import { Table, Space, Row, Col, Card, Tooltip, Button } from "antd";
import { LoadingSpiner } from "@/components/common";
import { useForm } from "react-hook-form";
import { Select, InputSearch } from "@/components/controls";
import { BiDetail } from "react-icons/bi";
import { RiEditLine } from "react-icons/ri";
import { ReloadOutlined } from "@ant-design/icons";
import { useCommon, usePagination, useDebounce } from "@/hooks";
import moment from "moment";
import { CustomAvatar } from "@/components/common";
import {  setHeaderTitle, getUserPermissions, getStyledStatus } from "@/lib/helpers";
import { getData, getPaginatedData } from "@/lib/services";
import { ROLES as RBP } from "@/lib/constants";

const userCreate = getUserPermissions(RBP?.PORTAL_USER?.CREATE);
const userEdit = getUserPermissions(RBP?.PORTAL_USER?.UPDATE);

const List = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const { loading, setLoading } = useCommon();
  const { page, perPage, totalPages, setPage, setPerPage, setTotalPages } =
    usePagination();


  useEffect(() => {
    getAllUsers(page, perPage);
    getAllRoles();
  }, []);

  const { watch, control, reset } = useForm({
    defaultValues: {
      search: "",
      role: "",
    },
  });

  const role = watch("role");
  const search = watch("search", "");
  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    getAllUsers(1, perPage, { role_id: role, search_key: debouncedSearch });
  }, [role, debouncedSearch]);

  const getAllUsers = async (page: number, perPage: number, param?: any) => {
    setLoading(true);
    const params = {
      role_id: param?.role_id,
      search_key: param?.search_key,
    };
    const res = await getPaginatedData("users", {
      page: page,
      per_page: perPage,
      ...params,
    });

    setLoading(false);
    if (res?.status === 200) {
      setUsers(res?.data?.data);
      setPage(+res?.headers["x-page"]);
      setTotalPages(+res?.headers["x-total-pages"]);
    } else {
      console.log("Something went wrong");
    }
  };

  const getAllRoles = async () => {
    setLoading(true);
    const res = await getData("roles");
    setLoading(false);
    if (res?.success) {
      setRoles(
        res?.data?.map((role: any) => ({
          id: role?.id,
          value: role?.id,
          label: role?.name,
        }))
      );
    } else {
      console.log("Something went wrong");
    }
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    getAllUsers(page, perPage);
  };

  const onReset = () => {
    reset({
      search: "",
      role: "",
    });
    getAllUsers(page, perPage);
  };

  setHeaderTitle("user-management");

  return (
    <Card title="User List" className="my-6 shadow">
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
                  placeholder="Search by Name, Email, Phone or Operator ID"
                  className="w-72 xl:w-80 2xl:w-96"
                />
              </div>
              <div className="w-40">
                <Select
                  control={control}
                  name="role"
                  options={roles}
                  placeholder="Select Role"
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
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 8 }}
          xl={{ span: 8 }}
          xxl={{ span: 8 }}
        >
          <div className="relative lg:top-2.5 flex lg:justify-end">
            {userCreate.isAuthorized && (
              <Link to="/user/add" className="btn btn-add w-36 2xl:w-40 wave-money-text">
                <FaUserPlus className="btn-icon wave-money-text" /> Add User
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
          dataSource={users}
          rowKey={"id"}
          pagination={false}
          size="small"
          expandable={{
            expandedRowRender: (record) => (
              <table className="nested-table">
                <tr>
                  <td className="table-expand-data">Creation Date :</td>
                  <td className="table-expand-data">{moment(record?.created_at).format("YYYY-MM-DD")}</td>
                </tr>
                <tr>
                  <td className="table-expand-data">Last Modified Date :</td>
                  <td className="table-expand-data">{moment(record?.updated_at).format("YYYY-MM-DD")}</td>
                </tr>
                <tr>
                  <td className="table-expand-data">Account Status :</td>
                  <td className="table-expand-data">
                    {getStyledStatus(record?.account_status)}
                  </td>
                </tr>
                <tr>
                  <td className="table-expand-data">Manager Email ID :</td>
                  <td className="table-expand-data">{record?.manager_email}</td>
                </tr>
                <tr>
                  <td className="table-expand-data">Action :</td>
                  <td>
                    <Space size="middle">
                        <Tooltip placement="bottom" title="User Details">
                          <Link to={`/user/details/${record.id}`}>
                            <BiDetail className="text-2xl text-gray-500" />
                          </Link>
                        </Tooltip>

                      {userEdit.isAuthorized && (
                        <Tooltip placement="bottom" title="User Edit">
                          <Link to={`/user/edit/${record.id}`}>
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
    </Card>
  );
};

export default List;


const columns: any = [
  {
    title: "ID",
    dataIndex: "id",
    align: "center",
    width: "5%",
    sorter: (a: any, b: any) => a.id - b.id,
  },
  {
    title: () => <span className="relative -left-12">Operator Name & Email</span>,
    dataIndex: "name",
    key: "name",
    align: "left",
    width: "240px",
    sorter: (a: any, b: any) => a?.name.localeCompare(b?.name),
    render: (text: any, record: any) => (
      <div className="flex items-center gap-3">
        <CustomAvatar
          data={{
            img: record?.image?.url,
            name: record?.name,
          }}
          size={35}
          border={0}
          textSize={12}
        />
        <div>
          <div className="text-blue-700  cursor-pointer underline">
            <Link to={`/user/details/${record.id}`}>{record?.name}</Link>
          </div>
          <p className="text-[0.7rem]">{record?.email}</p>
        </div>
      </div>
    ),
  },
  {
    title: "Operator ID",
    dataIndex: "operator_id",
    key: "id",
    align: "center",
    sorter: (a: any, b: any) => a?.operator_id.localeCompare(b?.operator_id),
  },

  {
    title: "Phone Number",
    dataIndex: "phone_number",
    key: "id",
    align: "center",
    sorter: (a: any, b: any) => a?.phone_number.localeCompare(b?.phone_number),
  },
  {
    title: "Role",
    dataIndex: "role.name",
    key: "id",
    align: "center",
    sorter: (a: any, b: any) => a?.role?.name.localeCompare(b?.role?.name),
    render: (text: any, record: any) => getStyledStatus(record?.role?.name),
  },
  {
    title: "Company ID",
    dataIndex: "tenant.company_id",
    key: "id",
    align: "center",
    sorter: (a: any, b: any) =>
      a?.tenant?.company_id.localeCompare(b?.tenant?.company_id),
    render: (text: any, record: any) => (
      <span>{record?.tenant?.company_id}</span>
    ),
  },
  {
    title: "Company Name",
    dataIndex: "tenant.company_name",
    key: "id",
    align: "center",
    sorter: (a: any, b: any) =>
      a?.tenant?.company_name.localeCompare(b?.tenant?.company_name),
    render: (text: any, record: any) => (
      <span>{record?.tenant?.company_name}</span>
    ),
  },
  Table.EXPAND_COLUMN,
];
