import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RoleForm } from "@/components/management/roles";
import { setHeaderTitle } from "@/lib/helpers";
import { Col, Row, Card } from "antd";
import { getDetails } from "@/lib/services";
import { LoadingSpiner } from "@/components/common";
import { useCommon } from "@/hooks";

const Edit = () => {
  const [role, setRole] = useState<any>({});
  const { loading, setLoading } = useCommon();
  const { id } = useParams();

  useEffect(() => {
    getRoleDetails();
  }, [id]);

  const getRoleDetails = async () => {
    setLoading(true);
    const res = await getDetails("roles", id);
    setLoading(false);
    if (res?.success) {
      setRole(res?.data);
    } else {
      console.log("something went wrong");
    }
  };

  setHeaderTitle("role-management");

  if (loading) {
    return (
      <div className="flex justify-center mt-48 ">
        <LoadingSpiner />
      </div>
    );
  }
  return (
    <div className="mb-6">
      <div className="flex justify-end">
        <Link to="/role/list" className="btn-back">
          <BiArrowBack className="btn-back-icon" /> Back to Role List
        </Link>
      </div>
      <Card title="Edit Role" className="page-body">
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
              <RoleForm formMode="UPDATE" role={role} />
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Edit;
