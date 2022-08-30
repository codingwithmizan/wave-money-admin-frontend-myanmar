import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getDetails } from "@/lib/services";
import { BiArrowBack } from "react-icons/bi";
import { setHeaderTitle, getUserPermissions } from "@/lib/helpers";
import { Card, Button, Avatar, Row, Col } from "antd";
import { FiEdit } from "react-icons/fi";
import { ResetPassword } from "@/components/management/users";
import { useCommon } from "@/hooks";
import { ROLES as RBP } from "@/lib/constants";
import {CustomAvatar} from '@/components/common'

const userEdit = getUserPermissions(RBP?.PORTAL_USER?.UPDATE);
const userReset = getUserPermissions(RBP?.PORTAL_USER?.RESET);

const Details = () => {
  const [user, setUser] = useState<any>({});
  const [avatarData, setAvatarData] = useState<any>({});
  const { isModalVisible, toggleModalVisible } = useCommon();
  const { id } = useParams();

  useEffect(() => {
    getUserDetails();
  }, [id]);

  const getUserDetails = async () => {
    const res = await getDetails("users", id);
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

  setHeaderTitle("user-management");

  return (
    <div className="mb-6">
      <div className="flex justify-end">
        <Link to="/user/list" className="btn-back">
          <BiArrowBack className="btn-back-icon" /> Back to User List
        </Link>
      </div>
      <Card title="User Details" className="page-body pb-12">
        <Row>
          <Col
            xs={{ span: 12, offset: 1 }}
            sm={{ span: 12, offset: 1 }}
            md={{ span: 12, offset: 1 }}
            lg={{ span: 12, offset: 1 }}
            xl={{ span: 12, offset: 1 }}
            xxl={{ span: 12, offset: 1 }}
          >
            <div className="mb-8 w-96  flex justify-center">
            <CustomAvatar data={avatarData} size={150} />
            </div>
            <table>
              <tbody>
                <tr className="odd:bg-gray-100">
                  <td className="table-label wave-money-text">Company Name</td>
                  <td className="separator wave-money-text">:</td>
                  <td className="table-data wave-money-text">{user?.tenant?.company_name}</td>
                </tr>
                <tr className="odd:bg-gray-100">
                  <td className="table-label wave-money-text">Company ID</td>
                  <td className="separator wave-money-text">:</td>
                  <td className="table-data wave-money-text">{user?.tenant?.company_id}</td>
                </tr>
                <tr className="odd:bg-gray-100">
                  <td className="table-label wave-money-text">Operator ID</td>
                  <td className="separator">:</td>
                  <td className="table-data wave-money-text">{user?.operator_id}</td>
                </tr>
                <tr className="odd:bg-gray-100">
                  <td className="table-label wave-money-text">Full Name</td>
                  <td className="separator">:</td>
                  <td className="table-data wave-money-text">{user?.name}</td>
                </tr>
                <tr className="odd:bg-gray-100">
                  <td className="table-label wave-money-text">Phone Number</td>
                  <td className="separator">:</td>
                  <td className="table-data wave-money-text">{user?.phone_number}</td>
                </tr>
                <tr className="odd:bg-gray-100">
                  <td className="table-label wave-money-text">Email ID</td>
                  <td className="separator">:</td>
                  <td className="table-data wave-money-text">{user?.email}</td>
                </tr>
                <tr className="odd:bg-gray-100">
                  <td className="table-label wave-money-text">Account Status</td>
                  <td className="separator">:</td>
                  <td className="table-data wave-money-text">{user?.account_status}</td>
                </tr>
                <tr className="odd:bg-gray-100">
                  <td className="table-label wave-money-text">Manager Email ID</td>
                  <td className="separator">:</td>
                  <td className="table-data wave-money-text">{user?.manager_email}</td>
                </tr>
                <tr className="odd:bg-gray-100">
                  <td className="table-label wave-money-text">Site Role</td>
                  <td className="separator">:</td>
                  <td className="table-data wave-money-text">{user?.role?.name}</td>
                </tr>
              </tbody>
            </table>
          </Col>

          <Col
            xs={{ span: 11 }}
            sm={{ span: 11 }}
            md={{ span: 11 }}
            lg={{ span: 11 }}
            xl={{ span: 11 }}
            xxl={{ span: 11 }}
          >
            <div
              className={`flex ${
                userReset.isAuthorized ? "justify-between" : "justify-end"
              } `}
            >
              {userReset.isAuthorized && (
                <div className="w-48 mt-14">
                  <Button
                    type="primary"
                    block
                    className="btn-reset wave-money-text"
                    size="large"
                    onClick={toggleModalVisible}
                  >
                    Reset Password
                  </Button>
                </div>
              )}
              {userEdit.isAuthorized && (
                <Link to={`/user/edit/${id}`} className="flex gap-2">
                  <FiEdit className="text-sky-700 text-lg" />
                  <span className="text-sky-700 font-medium">Edit</span>
                </Link>
              )}
            </div>
          </Col>
        </Row>
      </Card>
      <ResetPassword
        isModalVisible={isModalVisible}
        toggleModal={toggleModalVisible}
        id={user?.id}
      />
    </div>
  );
};

export default Details;
