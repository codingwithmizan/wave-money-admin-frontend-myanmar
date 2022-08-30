import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Button, Card, Divider } from "antd";
import { BiArrowBack } from "react-icons/bi";
import {
  NrcImage,
  RequestedProfileDetails,
  ChangeLog,
  RejectionReasons,
  AcceptanceReasons,
} from "@/components/otcs";
import { setHeaderTitle, getUserPermissions } from "@/lib/helpers";
import { getData } from "@/lib/services";
import { useCommon } from "@/hooks";
import _, { toUpper, capitalize } from "lodash";
import { LoadingSpiner } from "@/components/common";
import { ROLES as RBP } from "@/lib/constants";

const otcChangePermission = getUserPermissions(RBP.OTC.CHANGE_PERMISSION);

const Details = () => {
  const [requestedProfile, setRequestedProfile] = useState<any>({});
  const [originalProfile, setOriginalProfile] = useState<any>({});
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
  const [isAcceptModalVisible, setIsAceptModalVisible] = useState(false);
  const { loading, setLoading } = useCommon();

  const { id } = useParams();

  useEffect(() => {
    getRequestedProfile();
  }, []);

  const getRequestedProfile = async () => {
    setLoading(true);
    try {
      const res = await getData("otc_profiles/pending/update_details", {
        unique_id: id,
      });

      if (res.success) {
        setRequestedProfile(res.data?.requested_changes);
        setOriginalProfile(res.data?.original_profile);
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

  setHeaderTitle( "pending-to-review-edited-otc-profiles");

  return (
    <div className="mb-6">
      <div className="flex justify-end">
        <Link to="/otc/pending-to-review-edited" className="btn-back">
          <BiArrowBack className="btn-back-icon" /> Back to Pending to Review
          List
        </Link>
      </div>
      <Row gutter={[24, 24]}>
        <Col xs={{ span: 9 }}>
          {!_.isEmpty(originalProfile) &&
            Object.keys(originalProfile).length > 0 && (
              <RequestedProfileDetails
                title="Before"
                profile={{ ...originalProfile }}
                id=""
                showOcr={false}
              />
            )}
        </Col>
        <Col xs={{ span: 9 }}>
          {!_.isEmpty(requestedProfile) &&
            Object.keys(requestedProfile).length > 0 && (
              <RequestedProfileDetails
                title="After"
                profile={requestedProfile}
                id=""
                editedProfile={true}
                showOcr={false}
              />
            )}
        </Col>
        <Col xs={{ span: 6 }}>
          <Card
            title={`${
              requestedProfile.id_type === "nrc"
                ? `${toUpper(requestedProfile.id_type)} Card`
                : capitalize(requestedProfile.id_type)
            }`}
            className="page-body w-full h-fit"
          >
            {!_.isEmpty(requestedProfile) &&
              Object.keys(requestedProfile).length > 0 &&
              requestedProfile?.photos?.length > 0 && (
                <div className="mb-4">
                  <NrcImage
                    nrcImg={requestedProfile?.photos[0]}
                    title="Requested NRC"
                    size={150}
                  />
                  <Divider />
                </div>
              )}
            {!_.isEmpty(originalProfile) &&
              Object.keys(originalProfile).length > 0 &&
              originalProfile?.photos?.length > 0 && (
                <div className="relative top-4">
                  <NrcImage
                    nrcImg={originalProfile?.photos[0]}
                    title="Original NRC"
                    size={150}
                  />
                </div>
              )}
          </Card>
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
              {/* <div className="w-1/3">
              <Button size="large" className="btn-submit-outline" block>
                Pending Recommendation
              </Button>
            </div> */}
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
      <div>
        <ChangeLog id={id} />
      </div>
      <RejectionReasons
        isModalVisible={isRejectModalVisible}
        toggleModal={toggleRejectModalVisible}
        uniqId={id || ""}
        id={requestedProfile.id}
      />
      <AcceptanceReasons
        isModalVisible={isAcceptModalVisible}
        toggleModal={toggleAcceptModalVisible}
        id={id || ""}
      />
    </div>
  );
};

export default Details;
