import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import { Table, Space, Row, Col, Card, Tooltip, Button } from "antd";
import { LoadingSpiner } from "@/components/common";
import { BiArrowBack, BiDetail } from "react-icons/bi";
import { RiEditLine } from "react-icons/ri";
import { useCommon, usePagination } from "@/hooks";
import moment from "moment";
import {
  setHeaderTitle,
  getUserPermissions,
  getStyledStatus,
} from "@/lib/helpers";
import { getDetails, getPaginatedData, updateData } from "@/lib/services";
import { ROLES as RBP } from "@/lib/constants";
import { toast } from "react-toastify";
import { capitalize } from "lodash";

const userCreate = getUserPermissions(RBP?.PORTAL_USER?.CREATE);
const userEdit = getUserPermissions(RBP?.PORTAL_USER?.UPDATE);

const Details = () => {
  const [bulkDetails, setBulkDetails] = useState<any>({});
  const [subscribeList, setSubscribeList] = useState<any[]>([]);
  const { id } = useParams();
  const { loading, setLoading } = useCommon();
  const { page, perPage, totalPages, setPage, setPerPage, setTotalPages } =
    usePagination();

  useEffect(() => {
    getBulkDetails();
    getSubscribeList(page, perPage);
  }, []);

  const getBulkDetails = async () => {
    setLoading(true);
    const res = await getDetails(`bulk_uploads/${id}`);
    setLoading(false);
    if (res.success) {
      setBulkDetails(res.data);
    } else {
      console.log("Something went wrong");
    }
  };
  const getSubscribeList = async (page: number, perPage: number) => {
    setLoading(true);
    const res = await getPaginatedData(`bulk_uploads/${id}/profiles`, {
      page: page,
      per_page: perPage,
    });

    setLoading(false);
    if (res?.status === 200) {
      setSubscribeList(res?.data?.data);
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
    getSubscribeList(page, perPage);
  };

  const onAccept = async () => {
    const res = await updateData("subscribers/bulk-accept", {
      bulk_id: id,
    });
    if (res.success) {
      getBulkDetails();
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };
  const onReject = async () => {
    const res = await updateData("subscribers/bulk-reject", {
      bulk_id: id,
    });
    if (res.success) {
      getBulkDetails();
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  setHeaderTitle("bulk-list");

  return (
    <>
      <div className="flex justify-end">
        <Link to="/bulk-list" className="btn-back">
          <BiArrowBack className="btn-back-icon" /> Back to Bulk List
        </Link>
      </div>
      <Card title="Bulk List Details" className=" mt-2 mb-6 shadow">
        <Row>
          <Col xs={{ span: 21 }}>
            <div className="">
              <table>
                <tbody>
                  <tr className="even:bg-gray-100">
                    <td className="table-label wave-money-text">Bulk ID</td>
                    <td className="separator">:</td>
                    <td className="table-data wave-money-text">
                      {bulkDetails?.id}
                    </td>
                  </tr>
                  <tr className="even:bg-gray-100">
                    <td className="table-label wave-money-text">Maker Name</td>
                    <td className="separator wave-money-text">:</td>
                    <td className="table-data wave-money-text">
                      {bulkDetails?.created_by}
                    </td>
                  </tr>
                  <tr className="even:bg-gray-100">
                    <td className="table-label wave-money-text">
                      Creation Date
                    </td>
                    <td className="separator wave-money-text">:</td>
                    <td className="table-data wave-money-text">
                      {moment(bulkDetails?.created_at).format("YYYY-MM-DD")}
                    </td>
                  </tr>
                  <tr className="even:bg-gray-100">
                    <td className="table-label wave-money-text">Operator ID</td>
                    <td className="separator">:</td>
                    <td className="table-data wave-money-text">
                      {bulkDetails?.operator_id}
                    </td>
                  </tr>
                  <tr className="even:bg-gray-100">
                    <td className="table-label wave-money-text">Status</td>
                    <td className="separator">:</td>
                    <td className="table-data wave-money-text">
                      {getStyledStatus(bulkDetails?.status)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Col>
          <Col xs={{ span: 3 }}>
            <div className=" flex justify-end space-x-6">
              <Button
                type="primary"
                className="btn-submit"
                size="large"
                onClick={onAccept}
              >
                Accept
              </Button>
              <Button
                className="btn-danger-outline"
                size="large"
                danger
                onClick={onReject}
              >
                Reject
              </Button>
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
            dataSource={subscribeList}
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
    </>
  );
};

export default Details;

const columns: any = [
  {
    title: "Full Name",
    dataIndex: "id",
    key: "id",
    align: "center",
    sorter: (a: any, b: any) => a?.id - b?.id,
    render: (text: any, record: any) => <span> Jacob Jones</span>,
  },
  {
    title: "Phone Number",
    dataIndex: "phone_number",
    key: "id",
    align: "center",
    sorter: (a: any, b: any) => a?.phone_number.localeCompare(b?.phone_number),
    render: (text: any, record: any) => <span> 009 235 37282</span>,
  },
  {
    title: "ID Type",
    dataIndex: "company_name",
    key: "id",
    align: "center",
    sorter: (a: any, b: any) => a?.company_name.localeCompare(b?.company_name),
    render: (text: any, record: any) => <span> NRC</span>,
  },

  {
    title: "NRC Number",
    dataIndex: "email",
    key: "id",
    align: "center",
    sorter: (a: any, b: any) => a?.email.localeCompare(b?.email),
    render: (text: any, record: any) => <span> 123-4567-890</span>,
  },
  {
    title: "Date of Birth",
    dataIndex: "company_status",
    key: "id",
    align: "center",
    sorter: (a: any, b: any) =>
      a?.company_status.localeCompare(b?.company_status),
    render: (text: any, record: any) => <span>12-03-1990</span>,
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

        {/* {companyEdit.isAuthorized && ( */}
        <Tooltip placement="bottom" title="Company Edit">
          <Link to={`/company/edit/${record.id}`}>
            <RiEditLine className="text-2xl text-gray-500" />
          </Link>
        </Tooltip>
        {/* )} */}
      </Space>
    ),
  },
];
