import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Button } from "antd";
import { BiArrowBack } from "react-icons/bi";
import {
  NrcCardDetails,
  RecommendProfileDetails,
  ChangeLog,
  OCRDetails,
  AcceptanceReasons,
} from "@/components/otcs";
import { LoadingSpiner } from "@/components/common";
import { setHeaderTitle, getUserPermissions } from "@/lib/helpers";
import { getData } from "@/lib/services";
import { useCommon } from "@/hooks";
import { isEmpty } from "lodash";

import { ROLES as RBP } from "@/lib/constants";

const otcChangePermission = getUserPermissions(RBP.OTC.CHANGE_PERMISSION);
const Details = () => {
  const [recommendApproveOtcProfile, setRecommendApproveOtcProfile] =
    useState<any>({});
  const { loading, setLoading, isModalVisible, toggleModalVisible } =
    useCommon();
  const { id } = useParams();

  useEffect(() => {
    getOtcProfile();
  }, [id]);

  const getOtcProfile = async () => {
    setLoading(true);
    try {
      const res = await getData(
        `otc_profiles/profile_recommendation/${id}/details`
      );
      if (res.success) {
        setRecommendApproveOtcProfile(res.data);
      } else {
        console.log(res.message);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  setHeaderTitle( "recommend-to-approve-otc-profiles");

  if (loading) {
    return <LoadingSpiner />;
  }

  return (
    <div className="mb-6">
      <div className="flex justify-end">
        <Link to="/otc/recommend-to-approves" className="btn-back">
          <BiArrowBack className="btn-back-icon" /> Back to Recommend to Approve
          List
        </Link>
      </div>
      <Row gutter={[24, 24]}>
        <Col
          xs={{
            span: isEmpty(recommendApproveOtcProfile?.ocr_response) ? 16 : 10,
          }}
        >
          <div className="flex h-full">
            <RecommendProfileDetails
              profile={{
                unique_id: recommendApproveOtcProfile?.unique_id,
                kyc_status: recommendApproveOtcProfile?.kyc_status,
                full_name: recommendApproveOtcProfile?.name,
                full_name_mm: recommendApproveOtcProfile?.name_mm,
                father_name: recommendApproveOtcProfile?.father_name,
                father_name_mm: recommendApproveOtcProfile?.father_name,
                dob: recommendApproveOtcProfile?.dob,
                gender: recommendApproveOtcProfile?.gender,
                nationality: recommendApproveOtcProfile?.nationality,
                address: recommendApproveOtcProfile?.address,
                nrc_number: recommendApproveOtcProfile?.id_number,
                id_type: recommendApproveOtcProfile?.id_type,
                created_msisdn:
                  recommendApproveOtcProfile?.accounts?.[0]?.msisdn,
                account_status: recommendApproveOtcProfile?.account_status,
                created_at: recommendApproveOtcProfile?.created_at,
                updated_at: recommendApproveOtcProfile?.updated_at,
                submitted_agent_id:
                  recommendApproveOtcProfile?.accounts?.[0]?.agent_msisdn,
              }}
              title="Recommend to Approve Profile Details"
            />

          </div>
        </Col>
        {!isEmpty(recommendApproveOtcProfile?.ocr_response) && (
          <Col xs={{ span: 10 }}>
            <OCRDetails
              ocrResult={recommendApproveOtcProfile?.ocr_response?.data}
              title="OCR results"
            />
          </Col>
        )}
        <Col
          xs={{
            span: isEmpty(recommendApproveOtcProfile?.ocr_response) ? 8 : 4,
          }}
        >
          <div className="h-full flex">
            {recommendApproveOtcProfile?.photos?.[0] && (
              <NrcCardDetails
                nrcImg={recommendApproveOtcProfile?.photos[0]}
                size={
                  isEmpty(recommendApproveOtcProfile?.ocr_response) ? 250 : 100
                }
                idType={recommendApproveOtcProfile.id_type}

              />
            )}

          </div>
        </Col>
      </Row>

      {otcChangePermission.isAuthorized && (
        <Row>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 24 }}
            lg={{ span: 24 }}
            xl={{ span: 24 }}
            xxl={{ span: 18, offset: 3 }}
          >
            <div className="flex gap-8 justify-center mt-12 mb-6">
              <div className="w-1/3">
                <Button
                  type="primary"
                  size="large"
                  className="btn-submit"
                  block
                  onClick={toggleModalVisible}
                >
                  Approve
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      )}

      {id && (
        <div>
          <ChangeLog id={id} />
        </div>
      )}

      <AcceptanceReasons
        isModalVisible={isModalVisible}
        toggleModal={toggleModalVisible}
        id={id || ""}
      />
    </div>
  );
};

export default Details;
