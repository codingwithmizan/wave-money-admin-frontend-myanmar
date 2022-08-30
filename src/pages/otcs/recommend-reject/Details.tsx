import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col , Button} from "antd";
import { BiArrowBack } from "react-icons/bi";
import {
  NrcCardDetails,
  RecommendProfileDetails,
  ChangeLog,
  OCRDetails,
  RejectionReasons
} from "@/components/otcs";
import { setHeaderTitle , getUserPermissions} from "@/lib/helpers";
import { getData } from "@/lib/services";
import { useCommon } from "@/hooks";
import { LoadingSpiner } from "@/components/common";
import { isEmpty } from "lodash";

import { ROLES as RBP } from "@/lib/constants";

const otcChangePermission = getUserPermissions(RBP.OTC.CHANGE_PERMISSION);
const Details = () => {
  const [recommendRejectOtcProfile, seRecommendRejectOtcProfile] =
    useState<any>({});
  const { loading, setLoading , isModalVisible, toggleModalVisible} = useCommon();

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
        seRecommendRejectOtcProfile(res.data);
      } else {
        console.log(res.message);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  setHeaderTitle("recommend-to-reject-otc-profiles");

  if (loading) {
    return <LoadingSpiner />;
  }
  return (
    <div className="mb-6">
      <div className="flex justify-end">
        <Link to="/otc/recommend-to-rejects" className="btn-back">
          <BiArrowBack className="btn-back-icon" /> Back to Recommend to Reject
          List
        </Link>
      </div>
      <Row gutter={[24, 24]}>
        <Col
          xs={{
            span: isEmpty(recommendRejectOtcProfile?.ocr_response) ? 16 : 10,
          }}
        >
          <div className="flex h-full">
            <RecommendProfileDetails
              profile={{
                unique_id: recommendRejectOtcProfile?.unique_id,
                kyc_status: recommendRejectOtcProfile?.kyc_status,
                full_name: recommendRejectOtcProfile?.name,
                full_name_mm: recommendRejectOtcProfile?.name_mm,
                father_name: recommendRejectOtcProfile?.father_name,
                father_name_mm: recommendRejectOtcProfile?.father_name,
                dob: recommendRejectOtcProfile?.dob,
                gender: recommendRejectOtcProfile?.gender,
                nationality: recommendRejectOtcProfile?.nationality,
                address: recommendRejectOtcProfile?.address,
                nrc_number: recommendRejectOtcProfile?.id_number,
                id_type: recommendRejectOtcProfile?.id_type,
                created_msisdn:
                  recommendRejectOtcProfile?.accounts?.[0]?.msisdn,
                account_status: recommendRejectOtcProfile?.account_status,
                created_at: recommendRejectOtcProfile?.created_at,
                updated_at: recommendRejectOtcProfile?.updated_at,
                submitted_agent_id:
                  recommendRejectOtcProfile?.accounts?.[0]?.agent_msisdn,
              }}
              title="Recommend to Reject Profile Details"
            />

          </div>
        </Col>

        {!isEmpty(recommendRejectOtcProfile?.ocr_response) && (
          <Col xs={{ span: 10 }}>
            <OCRDetails
              ocrResult={recommendRejectOtcProfile?.ocr_response?.data}
              title="OCR results"
            />
          </Col>
        )}
        <Col
          xs={{
            span: isEmpty(recommendRejectOtcProfile?.ocr_response) ? 8 : 4,
          }}
        >
          <div className="h-fit flex">
            {recommendRejectOtcProfile?.photos?.[0] && (
              <NrcCardDetails
                nrcImg={recommendRejectOtcProfile?.photos[0]}
                size={
                  isEmpty(recommendRejectOtcProfile?.ocr_response) ? 250 : 100
                }
                idType={recommendRejectOtcProfile.id_type}

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
                  size="large"
                  className="btn-danger-outline"
                  danger
                  block
                  onClick={toggleModalVisible}
                >
                  Reject
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      )}

      <div>
        <ChangeLog id={id} />
      </div>
      <RejectionReasons
        isModalVisible={isModalVisible}
        toggleModal={toggleModalVisible}
        uniqId={id || ""}
        id={recommendRejectOtcProfile.id}
      />
    </div>
  );
};

export default Details;
