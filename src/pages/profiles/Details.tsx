import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDetails } from "@/lib/services";
import { setHeaderTitle } from "@/lib/helpers";
import { Card, Button, Row, Col } from "antd";
import { ChangePassword } from "@/components/management/users";
import { ProfileBadge, CustomAvatar } from "@/components/common";
import { useCommon } from "@/hooks";

const Details = () => {
  const [user, setUser] = useState<any>({});
  const [avatarData, setAvatarData] = useState<any>({});
  const { isModalVisible, toggleModalVisible } = useCommon();
  const { id } = useParams();

  useEffect(() => {
    getUserDetails();
  }, [id]);

  const getUserDetails = async () => {
    const res = await getDetails("users/profile", id);
    if (res?.success) {
      setAvatarData({
        img: res.data?.image?.url ? res.data.image?.url : "",
        name: res.data?.name,
      });
      setUser(res?.data);
    } else {
      console.log("something went wrong");
    }
  };

  setHeaderTitle("profile");
  return (
    <div className="">
      <Card title="Profile Details" className="page-body pb-12">
        <Row>
          <Col
            xs={{ span: 12, offset: 1 }}
            sm={{ span: 12, offset: 1 }}
            md={{ span: 12, offset: 1 }}
            lg={{ span: 12, offset: 1 }}
            xl={{ span: 12, offset: 1 }}
            xxl={{ span: 12, offset: 1 }}
          >
            <div className="mb-8 w-96 relative  flex justify-center">
              <CustomAvatar data={avatarData} size={150} />
              <div className="absolute bottom-4 right-32">
                <ProfileBadge />
              </div>
            </div>
            <table>
              <tbody>
                <tr className="odd:bg-gray-100">
                  <td className="table-label wave-money-text">Full Name </td>
                  <td className="separator">:</td>
                  <td className="table-data wave-money-text">{user?.name} </td>
                </tr>
                <tr className="odd:bg-gray-100">
                  <td className="table-label wave-money-text">Phone Number </td>
                  <td className="separator">:</td>
                  <td className="table-data wave-money-text">{user?.phone_number} </td>
                </tr>
                <tr className="odd:bg-gray-100">
                  <td className="table-label wave-money-text">Email address </td>
                  <td className="separator">:</td>
                  <td className="table-data wave-money-text">{user?.email} </td>
                </tr>
                <tr className="odd:bg-gray-100">
                  <td className="table-label wave-money-text">Account Status </td>
                  <td className="separator">:</td>
                  <td className="table-data wave-money-text">{user?.account_status} </td>
                </tr>
                <tr className="odd:bg-gray-100">
                  <td className="table-label wave-money-text">Company name </td>
                  <td className="separator">:</td>
                  <td className="table-data wave-money-text">{user?.tenant?.company_name} </td>
                </tr>
                <tr className="odd:bg-gray-100">
                  <td className="table-label wave-money-text">Company ID</td>
                  <td className="separator">:</td>
                  <td className="table-data wave-money-text">{user?.tenant?.company_id} </td>
                </tr>
                <tr className="odd:bg-gray-100">
                  <td className="table-label wave-money-text">Operator ID </td>
                  <td className="separator">:</td>
                  <td className="table-data wave-money-text">{user?.operator_id} </td>
                </tr>
                <tr className="odd:bg-gray-100">
                  <td className="table-label wave-money-text" >Manager Email Adress </td>
                  <td className="separator">:</td>
                  <td className="table-data wave-money-text">{user?.manager_email} </td>
                </tr>
                <tr className="odd:bg-gray-100">
                  <td className="table-label wave-money-text">Site Role </td>
                  <td className="separator">:</td>
                  <td className="table-data wave-money-text ">{user?.role?.name} </td>
                </tr>
              </tbody>
            </table>
          </Col>

          <Col
            xs={{ span: 6 }}
            sm={{ span: 6 }}
            md={{ span: 6 }}
            lg={{ span: 6 }}
            xl={{ span: 6 }}
            xxl={{ span: 6 }}
          >
            <div className="w-48 mt-10">
              <Button
                type="primary"
                block
                className="btn-reset wave-money-text"
                size="large"
                onClick={toggleModalVisible}
              >
                Change Password
              </Button>
            </div>
          </Col>
        </Row>
      </Card>
      <ChangePassword
        isModalVisible={isModalVisible}
        toggleModal={toggleModalVisible}
      />
    </div>
  );
};

export default Details;
