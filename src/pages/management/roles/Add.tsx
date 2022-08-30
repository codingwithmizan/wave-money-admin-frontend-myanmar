import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RoleForm } from "@/components/management/roles";
import { setHeaderTitle } from "@/lib/helpers";
import { Col, Row, Card } from "antd";

const Add = () => {
  setHeaderTitle("role-management");
  return (
    <div className="mb-6">
      <div className="flex justify-end">
        <Link to="/role/list" className="btn-back">
          <BiArrowBack className="btn-back-icon" /> Back to Role List
        </Link>
      </div>
      <Card title="Create New Role" className="page-body">
        <Row>
          <Col
            className=" w-full"
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 22 }}
            lg={{ span: 22, offset: 1 }}
            xl={{ span: 22, offset: 1 }}
            xxl={{ span: 22, offset: 1 }}
          >
            <div className="mt-4 pb-8">
              <RoleForm formMode="CREATE" />
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Add;
