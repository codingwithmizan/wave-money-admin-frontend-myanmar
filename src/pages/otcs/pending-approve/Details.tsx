import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Row, Col, Button } from "antd";
import { BiArrowBack } from "react-icons/bi";
import {
  NrcCardDetails,
  RequestedProfileDetails,
  ChangeLog,
  UnverifiedOtcProfile,
  RejectionReasons,
  AcceptanceReasons,
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
  const [latestOtcProfile, setLatestOtcProfile] = useState<any>({});
  const [previousOtcProfiles, setPreviousOtcProfiles] = useState<any[]>([]);
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
  const [isAcceptModalVisible, setIsAceptModalVisible] = useState(false);
  const { loading, setLoading, isModalVisible, toggleModalVisible } =
    useCommon();
  const [previousProfileId, setPreviousProfileId] = useState("");
  const { id } = useParams();

  useEffect(() => {
    getPendingOtcProfile();
  }, [id]);

  const getPendingOtcProfile = async () => {
    setLoading(true);
    try {
      const res = await getData("otc_profiles/pending/details", {
        unique_id: id,
      });

      if (res.success) {
        setLatestOtcProfile(
          res.data.find((item: any) => item?.unique_id === id)
        );
        setPreviousOtcProfiles(
          res.data.filter((item: any) => item?.unique_id !== id)
        );
      } else {
        console.log(res.message);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const toggleRejectModalVisible = () => {
    setIsRejectModalVisible(!isRejectModalVisible);
  };
  const toggleAcceptModalVisible = () => {
    setIsAceptModalVisible(!isAcceptModalVisible);
  };

  const checkPreviousOtcIdAndOcrResponse = (ocrRes: any, otcId: string) => {
    const ocrResponse = ocrRes === null || isEmpty(ocrRes) ? false : true;

    if (ocrResponse && otcId) {
      return true;
    } else if (ocrResponse || otcId) {
      return true;
    } else {
      return false;
    }
  };

  setHeaderTitle("pending-to-approve-otc-profiles");
  if (loading) {
    return <LoadingSpiner />;
  }

  return (
    <div className="mb-6">
      <div className="flex justify-end">
        <Link to="/otc/pending-to-approve" className="btn-back">
          <BiArrowBack className="btn-back-icon" /> Back to Pending to Approve
          List
        </Link>
      </div>
      <Row gutter={[24, 24]}>
        <Col
          xs={{
            span: checkPreviousOtcIdAndOcrResponse(
              latestOtcProfile?.ocr_response,
              previousProfileId
            )
              ? 9
              : 16,
          }}
        >
          {!_.isEmpty(latestOtcProfile) &&
            Object.keys(latestOtcProfile).length > 0 && (
              <RequestedProfileDetails
                title="Latest OTC Profile Details"
                profile={latestOtcProfile}
                id={id}
                editBtn
                editedProfile={false}
                showOcr={false}
              />
            )}
        </Col>

        {previousProfileId && (
          <Col xs={{ span: 9 }}>
            {previousOtcProfiles.length > 0 &&
              !_.isEmpty(previousOtcProfiles[0]) &&
              Object.keys(previousOtcProfiles[0]).length > 0 && (
                <RequestedProfileDetails
                  title="Previous OTC Profile Details"
                  profile={previousOtcProfiles[0]}
                  id={id}
                  editedProfile={false}
                  showOcr={false}
                />
              )}
          </Col>
        )}

        {!previousProfileId &&
          latestOtcProfile?.ocr_response &&
          !isEmpty(latestOtcProfile?.ocr_response) && (
            <Col xs={{ span: 9 }}>
              <OCRDetails
                ocrResult={latestOtcProfile?.ocr_response?.data}
                title="OCR results"
              />
            </Col>
          )}
        <Col
          xs={{
            span: checkPreviousOtcIdAndOcrResponse(
              latestOtcProfile?.ocr_response,
              previousProfileId
            )
              ? 6
              : 8,
          }}
        >
          <div className="h-full ">
            <div>
              {!_.isEmpty(latestOtcProfile) &&
                Object.keys(latestOtcProfile).length > 0 && (
                  <NrcCardDetails nrcImg={latestOtcProfile?.photos[0]} idType={latestOtcProfile.id_type} />
                )}

              {previousProfileId &&
                latestOtcProfile?.ocr_response &&
                !isEmpty(latestOtcProfile?.ocr_response) && (
                  <div>
                    <OCRDetails
                      ocrResult={latestOtcProfile?.ocr_response?.data}
                      title="OCR results"
                    />
                  </div>
                )}
            </div>
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
                  onClick={toggleRejectModalVisible}
                >
                  Reject
                </Button>
              </div>
              <div className="w-1/3">
                <Button
                  size="large"
                  className="btn-submit-outline"
                  block
                  onClick={() => toggleModalVisible()}
                >
                  Pending to Recommendation
                </Button>
              </div>
              <div className="w-1/3">
                <Button
                  type="primary"
                  size="large"
                  className="btn-submit"
                  block
                  onClick={toggleAcceptModalVisible}
                >
                  Approve
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      )}

      {previousOtcProfiles.length > 0 && (
        <div>
          <UnverifiedOtcProfile
            profiles={previousOtcProfiles}
            onSelectProfile={setPreviousProfileId}
          />
        </div>
      )}

      <div>
        <ChangeLog id={id} />
      </div>
      <RejectionReasons
        isModalVisible={isRejectModalVisible}
        toggleModal={toggleRejectModalVisible}
        uniqId={id || ""}
        id={latestOtcProfile.id}
      />
      <AcceptanceReasons
        isModalVisible={isAcceptModalVisible}
        toggleModal={toggleAcceptModalVisible}
        id={id || ""}
      />
      {id && (
        <ConfirmationMsg
          uniqueId={id}
          status="RECOMMEND_TO_PENDING"
          isModalVisible={isModalVisible}
          toggleModal={toggleModalVisible}
        />
      )}
    </div>
  );
};

export default Details;
