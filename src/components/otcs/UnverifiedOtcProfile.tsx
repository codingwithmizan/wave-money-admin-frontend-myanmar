import { useState, FC } from "react";
import { Link } from "react-router-dom";
import { Card, Space, Table, Tooltip } from "antd";
import { BiDetail } from "react-icons/bi";
import Pagination from "@mui/material/Pagination";
import { getStyledStatus, humanize } from "@/lib/helpers";
import moment from "moment";
interface UnverifiedOtcProfileProps {
  profiles: any[];
  onSelectProfile: (profileId: string) => void;
}

export const UnverifiedOtcProfile: FC<UnverifiedOtcProfileProps> = ({
  profiles,
  onSelectProfile,
}) => {

// const columns: any = [
//   {
//     title: "Unique Customer ID",
//     dataIndex: "unique_id",
//     key: "unique_id",
//     align: "center",
//     sorter: (a: any, b: any) => a?.unique_id.localeCompare(b?.unique_id),
//     render: (text: any, record: any) => (
//       <Link
//         to={`/otc/pending-to-approve/details/${encodeURI(record.unique_id)}`}
//         className="underline"
//       >
//         {text}
//       </Link>
//       // <div className=" underline hover:underline-offset-4 cursor-pointer" onClick={()=>onSelectProfile(encodeURI(text))}>{text}</div>
//     ),
//   },
//   {
//     title: "ID Type",
//     dataIndex: "id_type",
//     key: "id_type",
//     align: "center",
//     sorter: (a: any, b: any) => a?.id_type.localeCompare(b?.id_type),
//   },
//   {
//     title: "ID Number  ",
//     dataIndex: "id_number",
//     key: "id_number",
//     align: "center",
//     sorter: (a: any, b: any) => a?.id_number.localeCompare(b?.id_number),
//   },
//   {
//     title: "Full Name",
//     dataIndex: "name",
//     key: "name",
//     align: "center",
//     sorter: (a: any, b: any) => a?.name.localeCompare(b?.name),
//   },
//   {
//     title: "KYC Submission Date",
//     dataIndex: "created_at",
//     key: "created_at",
//     align: "center",
//     sorter: (a: any, b: any) => a?.created_at.localeCompare(b?.created_at),
//     render: (text: any, record: any) => (
//       <>{moment(text).format("DD-MM-YYYY HH:mm:ss")}</>
//     ),
//   },
//   {
//     title: "Last Modified Date",
//     dataIndex: "updated_at",
//     key: "updated_at",
//     align: "center",
//     sorter: (a: any, b: any) => a?.updated_at.localeCompare(b?.updated_at),
//     render: (text: any, record: any) => (
//       <>{moment(text).format("DD-MM-YYYY HH:mm:ss")}</>
//     ),
//   },
//   Table.EXPAND_COLUMN,
// ];
  const columns: any = [
    {
      title: "Unique Customer ID",
      dataIndex: "unique_id",
      key: "unique_id",
      align: "center",
      sorter: (a: any, b: any) => a?.unique_id.localeCompare(b?.unique_id),
      render: (text: any, record: any) => (
        <span
          className="underline cursor-pointer"
          onClick={() => onSelectProfile(text)}
        >
          {text}
        </span>
      ),
    },
    {
      title: "ID Type",
      dataIndex: "id_type",
      key: "id_type",
      align: "center",
      sorter: (a: any, b: any) => a?.id_type.localeCompare(b?.id_type),
    },
    {
      title: "ID Number  ",
      dataIndex: "id_number",
      key: "id_number",
      align: "center",
      sorter: (a: any, b: any) => a?.id_number.localeCompare(b?.id_number),
    },
    {
      title: "Full Name",
      dataIndex: "name",
      key: "name",
      align: "center",
      sorter: (a: any, b: any) => a?.name.localeCompare(b?.name),
    },
    {
      title: "KYC Submission Date",
      dataIndex: "created_at",
      key: "created_at",
      align: "center",
      sorter: (a: any, b: any) => a?.created_at.localeCompare(b?.created_at),
      render: (text: any, record: any) => (
        <>{moment(text).format("DD-MM-YYYY HH:mm:ss")}</>
      ),
    },
    {
      title: "Last Modified Date",
      dataIndex: "updated_at",
      key: "updated_at",
      align: "center",
      sorter: (a: any, b: any) => a?.updated_at.localeCompare(b?.updated_at),
      render: (text: any, record: any) => (
        <>{moment(text).format("DD-MM-YYYY HH:mm:ss")}</>
      ),
    },
    Table.EXPAND_COLUMN,
  ];



  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(3);
  const [totalPages, setTotalPages] = useState(0);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    // getAllOTCs(page, perPage);
  };
  return (
    <Card
      title="Previously Created Unverified OTC Profile"
      className="page-body"
    >
      <div className="mb-6">
        <Table
          columns={columns}
          dataSource={profiles}
          pagination={false}
          size="small"
          rowKey="unique_id"
          expandable={{
            expandedRowRender: (record) => (
              <table className="nested-table">
                <tr>
                  <td>Submitted Agent’s MSISDN :</td>
                  <td>{record?.agent_msisdn}</td>
                </tr>
                <tr>
                  <td>OTC KYC Status :</td>
                  <td>{getStyledStatus(record?.kyc_status)}</td>
                </tr>
                <tr>
                  <td>OTC Profile Status :</td>
                  <td>
                    <span className="status w-24 bg-green-100 text-green-700  text-center">
                      {humanize(record?.account_status)}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>Action :</td>
                  <td>
                    <Space size="middle">
                      <Tooltip placement="bottom" title="OTC Details">
                        <Link
                          to={`/otc/pending-to-approve/details/${encodeURI(
                            record.unique_id
                          )}`}
                        >
                          <BiDetail className="text-2xl text-gray-500" />
                        </Link>
                      </Tooltip>
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
