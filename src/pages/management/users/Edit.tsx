import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { UserForm } from "@/components/management/users";
import { setHeaderTitle } from "@/lib/helpers";
import * as yup from "yup";
import { Col, Row, Card } from "antd";
import { getDetails } from "@/lib/services";

const Edit = () => {
  const [user, setUser] = useState<any>({});
  const { id } = useParams();

  useEffect(() => {
    getUserDetails();
  }, [id]);

  const getUserDetails = async () => {
    const res = await getDetails("users", id);
    if (res?.success) {
      setUser(res?.data);
    } else {
      console.log("something went wrong");
    }
  };

  setHeaderTitle("user-management");

  return (
    <div className="mb-6page-container">
      <div className="flex justify-end">
        <Link to="/user/list" className="btn-back">
          <BiArrowBack className="btn-back-icon" /> Back to User List
        </Link>
      </div>
      <Card title="Edit User Profile" className="page-body">
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
              <UserForm
                formMode="UPDATE"
                userData={user}
              />
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Edit;

