import { UserForm } from "@/components/management/users";
import { setHeaderTitle } from "@/lib/helpers";
import { Col, Row, Card } from "antd";

const AddNewSubscriber = () => {
  setHeaderTitle("add-new-subscriber");

  return (
    <div className="my-6">
      <Card title="Add New Subscriber" className="page-body">
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

export default AddNewSubscriber;
