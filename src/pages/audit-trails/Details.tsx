import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { AuditTrailDetails, ChangeInfo } from "@/components/audit-trails";
import { setHeaderTitle } from "@/lib/helpers";
import { useCommon } from "@/hooks";
import {  getDetails } from "@/lib/services";

const Details = () => {
  const {loading, setLoading } = useCommon();
  const [auditTrail, setAuditTrails] = useState({id: '', object_changes: {}});

  const { id } = useParams();

  useEffect(() => {
    getAuditTrailDetails();
  }, []);

  const getAuditTrailDetails = async () => {
    setLoading(true);
    try {
      const res = await getDetails("audit_logs",id);
      if (res.success) {
        setAuditTrails(res.data)
      } else {
        console.log(res.message);
      }
      console.log("pendingOtcProfile", res);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
 
  setHeaderTitle("audit-trail");
  return (
    <div className="mb-6">
      <div className="flex justify-end">
        <Link to="/audit-trail/list" className="btn-back">
          <BiArrowBack className="btn-back-icon" /> Back to Audit Trail List
        </Link>
      </div>
        <div>
          <AuditTrailDetails info={auditTrail}/>
        </div>

        <div>
        {auditTrail?.id && <ChangeInfo info={auditTrail?.object_changes}/>}
        </div>

       
    </div>
  );
};

export default Details;
