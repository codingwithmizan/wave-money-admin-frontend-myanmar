import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Card } from "antd";
import { BiArrowBack } from "react-icons/bi";
import {
  NrcCardDetails,
  ProfileDetails,
  ChangeLog,
  OCRDetails,
} from "@/components/otcs";
import { LoadingSpiner } from "@/components/common";
import { setHeaderTitle } from "@/lib/helpers";
import { getData } from "@/lib/services";
import { useCommon } from "@/hooks";
import { isEmpty } from "lodash";

const Details = () => {
  const [approvedOtcProfile, setApprovedOtcProfile] = useState<any>({});
  const [approvedReasons, setApprovedReasons] = useState<any[]>([]);
  const { loading, setLoading } = useCommon();
  const { id } = useParams();

  useEffect(() => {
    getOtcProfile();
  }, [id]);

  const getOtcProfile = async () => {
    setLoading(true);
    try {
      const res = await getData("otc_profiles/accepted/details", {
        unique_id: id,
      });

      if (res.success) {
        setApprovedOtcProfile(res.data);
        setApprovedReasons(
          res.data?.status_change_reasons?.filter(
            (reason: any) => reason.reason_type === "acceptance"
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

  setHeaderTitle( "approved-otc-profiles");

  if (loading) {
    return <LoadingSpiner />;
  }

  return (
    <div className="mb-6">
      <div className="flex justify-end">
        <Link to="/otc/approved/list" className="btn-back">
          <BiArrowBack className="btn-back-icon" /> Back to Approved List
        </Link>
      </div>
      <Row gutter={[24, 24]}>
        <Col xs={{ span: isEmpty(approvedOtcProfile?.ocr_response) ? 16 : 10 }}>
          <div className="flex h-full">
            <ProfileDetails
              status="APPROVED"
              profile={{
                unique_id: approvedOtcProfile?.unique_id,
                kyc_status: approvedOtcProfile?.kyc_status,
                full_name: approvedOtcProfile?.name,
                full_name_mm: approvedOtcProfile?.name_mm,
                father_name: approvedOtcProfile?.father_name,
                father_name_mm: approvedOtcProfile?.father_name,
                dob: approvedOtcProfile?.dob,
                gender: approvedOtcProfile?.gender,
                nationality: approvedOtcProfile?.nationality,
                address: approvedOtcProfile?.address,
                id_type: approvedOtcProfile?.identity_documents?.[0]?.id_type,
                nrc_number: approvedOtcProfile?.identity_documents?.[0]?.id_number,
                created_msisdn: approvedOtcProfile?.accounts?.[0]?.msisdn,
                account_status: approvedOtcProfile?.account_status,
                created_at: approvedOtcProfile?.created_at,
                updated_at: approvedOtcProfile?.updated_at,
                submitted_agent_id: approvedOtcProfile?.accounts?.[0]?.agent_msisdn,
                is_edited: approvedOtcProfile?.is_edited,
                approved_reason: approvedReasons,
                note: approvedOtcProfile?.note,
                sr_no: approvedOtcProfile?.sr_number,
                ref_file: approvedOtcProfile?.ref_file?.url,
              }}
              id={id}
              title="Approved Profile Details"
              editBtn 
            />
          </div>
        </Col>
        {!isEmpty(approvedOtcProfile?.ocr_response) && (
          <Col xs={{ span: 10 }}>
            <OCRDetails
              ocrResult={approvedOtcProfile?.ocr_response?.data}
              title="OCR results"
            />
          </Col>
        )}
        <Col xs={{ span: isEmpty(approvedOtcProfile?.ocr_response) ? 8 : 4 }}>
          <div className="h-full flex">
            {approvedOtcProfile?.identity_documents?.[0]?.identity_photos?.[0] && (
              <NrcCardDetails

                nrcImg={approvedOtcProfile?.identity_documents[0]?.identity_photos[0]}
                size={isEmpty(approvedOtcProfile?.ocr_response) ? 250 : 100}
                idType={approvedOtcProfile?.identity_documents?.[0]?.id_type}
              />
            )}
          </div>
        </Col>
      </Row>

      {id && (
        <div>
          <ChangeLog id={id} />
        </div>
      )}
    </div>
  );
};

export default Details;
