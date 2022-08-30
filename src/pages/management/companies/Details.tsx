import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { setHeaderTitle } from "@/lib/helpers";
import { getDetails } from "@/lib/services";
import { LoadingSpiner } from "@/components/common";
import { CompanyDetails } from "@/components/management/companies";
import { useCommon } from "@/hooks";

const Details = () => {
  const [company, setCompany] = useState<any>({});
  const { loading, setLoading } = useCommon();
  const { id } = useParams();

  useEffect(() => {
    getCompanyDetails();
  }, [id]);

  const getCompanyDetails = async () => {
    setLoading(true);
    const res = await getDetails("tenants", id);
    console.log('tenants', company);
    
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
          <BiArrowBack className="btn-back-icon" /> Back to Comapny List
        </Link>
      </div>
      <div className="page-body">
        <CompanyDetails company={company} />
      </div>
    </div>
  );
};

export default Details;


