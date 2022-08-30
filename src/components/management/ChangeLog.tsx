import { Card, Table, Row, Col } from "antd";
import { Select } from "@/components/controls";
import { useForm } from "react-hook-form";

export const ChangeLog = () => {
  const { control } = useForm({
    defaultValues: {
      changeLog: "",
    },
  });

  return (
    <Card className="page-body">
      <Row className="mt-2">
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 12 }}
          xl={{ span: 12 }}
          xxl={{ span: 12 }}
        >
          <h2 className="page-title relative top-2.5">Change Log</h2>
        </Col>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 12 }}
          xl={{ span: 12 }}
          xxl={{ span: 12 }}
        >
          <div className="w-60 ml-auto">
            <Select
              name="changeLog"
              control={control}
              options={options}
              placeholder="Select Oprator ID"
              className="w-60"
            />
          </div>
        </Col>
      </Row>
      <div className="my-4">
        <Table
          columns={columns}
          dataSource={chnageLogs}
          rowKey={"id"}
          pagination={false}
          size="small"
        />
      </div>
    </Card>
  );
};

const columns: any = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    align: "center",
  },
  {
    title: "Operator ID",
    dataIndex: "operatorId",
    key: "id",
    align: "center",
    sorter: (a: any, b: any) => a.operatorId.localeCompare(b.operatorId),
  },

  {
    title: "Operator Name",
    dataIndex: "oeratorName",
    key: "id",
    align: "center",
    sorter: (a: any, b: any) => a.oeratorName.localeCompare(b.oeratorName),
  },
  {
    title: "Time Stamp",
    dataIndex: "timestamp",
    key: "id",
    align: "center",
    sorter: (a: any, b: any) => a.timestamp.localeCompare(b.timestamp),
  },
  {
    title: "Before Change",
    dataIndex: "before_change",
    key: "id",
    align: "center",
    sorter: (a: any, b: any) => a.before_change.localeCompare(b.before_change),
  },
  {
    title: "After Change",
    dataIndex: "after_change",
    key: "id",
    align: "center",
    sorter: (a: any, b: any) => a.after_change.localeCompare(b.after_change),
  },
];

const options:any = [
  // { id: 1, value: "WM123456789", label: "WM123456789" },
  // { id: 2, value: "WM123456745", label: "WM123456745" },
  // { id: 3, value: "WM123456745", label: "WM123456745" },
  // { id: 4, value: "WM123456774", label: "WM123456774" },
  // { id: 5, value: "WM123456795", label: "WM123456795" },
  // { id: 6, value: "WM123456723", label: "WM123456723" },
  // { id: 7, value: "WM123456741", label: "WM123456741" },
  // { id: 8, value: "WM123456703", label: "WM123456703" },
  // { id: 9, value: "WM123456748", label: "WM123456748" },
  // { id: 10, value: "WM123456749", label: "WM123456749" },
];
const chnageLogs:any = [
  // {
  //   id: 1,
  //   operatorId: "WM123456789",
  //   oeratorName: "Esther Howard",
  //   timestamp: "26-05-22 at 8.20 am",
  //   before_change: "Alphabet not clear on POI",
  //   after_change: "959420122914",
  // },
  // {
  //   id: 2,
  //   operatorId: "WM123456789",
  //   oeratorName: "Esther Howard",
  //   timestamp: "26-05-22 at 8.20 am",
  //   before_change: "Alphabet not clear on POI",
  //   after_change: "959420122914",
  // },
  // {
  //   id: 3,
  //   operatorId: "WM123456789",
  //   oeratorName: "Esther Howard",
  //   timestamp: "26-05-22 at 8.20 am",
  //   before_change: "Alphabet not clear on POI",
  //   after_change: "959420122914",
  // },
  // {
  //   id: 4,
  //   operatorId: "WM123456789",
  //   oeratorName: "Esther Howard",
  //   timestamp: "26-05-22 at 8.20 am",
  //   before_change: "Alphabet not clear on POI",
  //   after_change: "959420122914",
  // },
  // {
  //   id: 5,
  //   operatorId: "WM123456789",
  //   oeratorName: "Esther Howard",
  //   timestamp: "26-05-22 at 8.20 am",
  //   before_change: "Alphabet not clear on POI",
  //   after_change: "959420122914",
  // },
  // {
  //   id: 6,
  //   operatorId: "WM123456789",
  //   oeratorName: "Esther Howard",
  //   timestamp: "26-05-22 at 8.20 am",
  //   before_change: "Alphabet not clear on POI",
  //   after_change: "959420122914",
  // },
];
