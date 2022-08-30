import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { ComapnyForm } from "@/components/management/companies";
import { setHeaderTitle } from "@/lib/helpers";
import { Col, Row, Card } from "antd";
import { getDetails } from "@/lib/services";
import { LoadingSpiner } from "@/components/common";
import { useCommon } from "@/hooks";

const Edit = () => {
  const [company, setCompany] = useState<any>({});
  const { loading, setLoading } = useCommon();
  const { id } = useParams();

  useEffect(() => {
    getCompanyDetails();
  }, [id]);

  const getCompanyDetails = async () => {
    setLoading(true);
    const res = await getDetails("tenants", id);
    console.log("tenants", company);

    setLoading(false);
    if (res?.success) {
      setCompany(res?.data);
    } else {
      console.log("something went wrong");
    }
  };
  setHeaderTitle("company-management");
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
        <Link to="/company/list" className="btn-back">
          <BiArrowBack className="btn-back-icon" /> Back to Company List
        </Link>
      </div>
      <Card title="Edit Company Management" className="page-body">
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
              <ComapnyForm
                formMode="UPDATE"
                companyDetails={company}
              />
            </div>
          </Col>
        </Row>
      </Card>

    </div>
  );
};

export default Edit;

