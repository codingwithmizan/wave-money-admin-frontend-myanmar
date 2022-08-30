import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Button } from "antd";
import { BiArrowBack } from "react-icons/bi";
import {
  NrcCardDetails,
  RequestedProfileDetails,
  ChangeLog,
  UnverifiedOtcProfile,
  OCRDetails,
  ConfirmationMsg,
} from "@/components/otcs";
import { setHeaderTitle, getUserPermissions } from "@/lib/helpers";
import { getData } from "@/lib/services";
import { useCommon } from "@/hooks";
import _, { isEmpty } from "lodash";
import { LoadingSpiner } from "@/components/common";
import { ROLES as RBP } from "@/lib/constants";

const otcChangePermission = getUserPermissions(RBP.OTC.CHANGE_PERMISSION);

const Details = () => {
  const [pendingRecommendOtcProfile, setPendingRecommendOtcProfile] =
    useState<any>({});
  const [isApprove, setIsApprove] = useState(false);
  const { loading, setLoading, isModalVisible, toggleModalVisible } =
    useCommon();

  const { id } = useParams();

  useEffect(() => {
    getPendingOtcProfile();
  }, [id]);

  const getPendingOtcProfile = async () => {
    setLoading(true);
    try {
      const res = await getData(
        `otc_profiles/profile_recommendation/${id}/details`
      );

      console.log("res recomdation details", res);

      if (res.success) {
        setPendingRecommendOtcProfile(res.data);
      } else {
        console.log(res.message);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const onRecommendToApprove = () => {
    setIsApprove(true);
    toggleModalVisible();
  };
  const onRecommendToReject = () => {
    setIsApprove(false);
    toggleModalVisible();
  };
  setHeaderTitle( "pending-to-recommend-otc-profiles");

  if (loading) {
    return <LoadingSpiner />;
  }

  return (
    <div className="mb-6">
      <div className="flex justify-end">
        <Link to="/otc/pending-to-recommends" className="btn-back">
          <BiArrowBack className="btn-back-icon" /> Back to Pending to Recommend
          List
        </Link>
      </div>
      <Row gutter={[24, 24]}>
        <Col
          xs={{
            span: isEmpty(pendingRecommendOtcProfile?.ocr_response) ? 16 : 10,
          }}
        >
          {!_.isEmpty(pendingRecommendOtcProfile) &&
            Object.keys(pendingRecommendOtcProfile).length > 0 && (
              <RequestedProfileDetails
                title="Pending to Recommend Profile Details"
                profile={pendingRecommendOtcProfile}
                id={id}
                editedProfile={false}
                showOcr={false}
              />
            )}

        </Col>

        {!isEmpty(pendingRecommendOtcProfile?.ocr_response) && (
          <Col xs={{ span: 10 }}>
            <OCRDetails
              ocrResult={pendingRecommendOtcProfile?.ocr_response?.data}
              title="OCR results"
            />
          </Col>
        )}

        <Col
          xs={{
            span: isEmpty(pendingRecommendOtcProfile?.ocr_response) ? 8 : 4,
          }}
        >
          <div className="h-full flex">
            {!_.isEmpty(pendingRecommendOtcProfile) &&
              Object.keys(pendingRecommendOtcProfile).length > 0 && (
                <NrcCardDetails
                  nrcImg={pendingRecommendOtcProfile?.photos[0]}
                  size={
                    isEmpty(pendingRecommendOtcProfile?.ocr_response)
                      ? 250
                      : 100
                  }
                  idType={pendingRecommendOtcProfile.id_type}
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
                  onClick={onRecommendToReject}
                >
                  Recommend to Reject
                </Button>
              </div>
              <div className="w-1/3">
                <Button
                  type="primary"
                  size="large"
                  className="btn-submit"
                  block
                  onClick={onRecommendToApprove}
                >
                  Recommend to Approve
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      )}
      <div>
        <ChangeLog id={id} />
      </div>
      {id && (
        <ConfirmationMsg
          status={isApprove ? "RECOMMEND_TO_APPROVE" : "RECOMMEND_TO_REJECT"}
          isModalVisible={isModalVisible}
          toggleModal={toggleModalVisible}
          uniqueId={id}
        />
      )}
    </div>
  );
};

export default Details;
