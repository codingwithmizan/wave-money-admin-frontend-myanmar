import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { UserForm } from "@/components/management/users";
import { setHeaderTitle } from "@/lib/helpers";
import { Col, Row, Card } from "antd";

const Add = () => {
  setHeaderTitle("user-management");

  return (
    <div className="mb-6">
      <div className="flex justify-end">
        <Link to="/user/list" className="btn-back">
          <BiArrowBack className="btn-back-icon" /> Back to User List
        </Link>
      </div>
      <Card title="Add New User" className="page-body">
        <Row>
          <Col
            className=" w-full"
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 22 }}
            lg={{ span: 20 }}
            xl={{ span: 14 }}
            xxl={{ span: 10 }}
          >
            <div className="mt-4 pb-8">
              <UserForm formMode="CREATE" />
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Add;
