import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col } from "antd";
import { BiArrowBack } from "react-icons/bi";
import {
  NrcCardDetails,
  ProfileDetails,
  ChangeLog,
  OCRDetails,
} from "@/components/otcs";
import { setHeaderTitle } from "@/lib/helpers";
import { getData } from "@/lib/services";
import { useCommon } from "@/hooks";
import { LoadingSpiner } from "@/components/common";
import { isEmpty } from "lodash";

const Details = () => {
  const [otcProfile, setOtcProfile] = useState<any>({});
  const [rejectionReasons, setRejectionReasons] = useState<any[]>([]);
  const { loading, setLoading } = useCommon();

  const { id } = useParams();

  useEffect(() => {
    getOtcProfile();
  }, [id]);

  const getOtcProfile = async () => {
    setLoading(true);
    try {
      const res = await getData("otc_profiles/rejected/details", {
        unique_id: id,
      });

      if (res.success) {
        setOtcProfile(res.data);
        setRejectionReasons(
          res.data?.status_change_reasons?.filter(
            (reason: any) => reason.reason_type === "rejection"
          )
        );
      } else {
        console.log(res.message);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  setHeaderTitle("rejected-otc-profiles");

  if (loading) {
    return <LoadingSpiner />;
  }
  return (
    <div className="mb-6">
      <div className="flex justify-end">
        <Link to="/otc/rejected/list" className="btn-back">
          <BiArrowBack className="btn-back-icon" /> Back to Rejected List
        </Link>
      </div>
      <Row gutter={[24, 24]}>
        <Col xs={{ span: isEmpty(otcProfile?.ocr_response) ? 16 : 10 }}>
          <div className="flex h-full">
            <ProfileDetails
              status="REJECTED"
              profile={{
                unique_id: otcProfile?.unique_id,
                kyc_status: otcProfile?.kyc_status,
                full_name: otcProfile?.name,
                full_name_mm: otcProfile?.name_mm,
                father_name: otcProfile?.father_name,
                father_name_mm: otcProfile?.father_name,
                dob: otcProfile?.dob,
                gender: otcProfile?.gender,
                nationality: otcProfile?.nationality,
                address: otcProfile?.address,
                nrc_number: otcProfile?.id_number,
                id_type: otcProfile?.id_type,
                created_msisdn: otcProfile?.accounts?.[0]?.msisdn,
                account_status: otcProfile?.account_status,
                created_at: otcProfile?.created_at,
                updated_at: otcProfile?.updated_at,
                submitted_agent_id: otcProfile?.accounts?.[0]?.agent_msisdn,
                rejection_reason: rejectionReasons,
                note: otcProfile?.note,
                sr_no: otcProfile?.sr_number,
                ref_file: otcProfile?.ref_file?.url,
              }}
              id={""}
              title="Rejected Profile Details"
            />
          </div>
        </Col>

        {!isEmpty(otcProfile?.ocr_response) && (
          <Col xs={{ span: 10 }}>
            <OCRDetails
              ocrResult={otcProfile?.ocr_response?.data}
              title="OCR results"
            />
          </Col>
        )}
        <Col xs={{ span: isEmpty(otcProfile?.ocr_response) ? 8 : 4 }}>
          <div className="h-fit flex">
            {otcProfile?.photos?.[0] && (
              <NrcCardDetails
                nrcImg={otcProfile?.photos[0]}
                size={isEmpty(otcProfile?.ocr_response) ? 250 : 100}
                idType={otcProfile?.id_type}
              />
            )}
          </div>
        </Col>
      </Row>

      <div>
        <ChangeLog id={id} />
      </div>
    </div>
  );
};

export default Details;
