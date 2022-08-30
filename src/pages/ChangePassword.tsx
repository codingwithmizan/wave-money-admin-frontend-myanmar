import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChangePasswordForm, WelcomeMsg } from "@/components/auth";
import { Row, Col, Alert } from "antd";
import changePasswordImg from "@/assets/images/change_password.png";

const ChangePassword = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const location: any = useLocation();
  const token = location?.state?.token;

  useEffect(() => {
    if (!token) {
      return navigate("*", { replace: true });
    }
  }, [token]);
  const onClose = () => {
    setErrorMsg("");
  };

  return (
    <Row className="h-screen">
      <Col
        xs={{ span: 0 }}
        sm={{ span: 0 }}
        md={{ span: 0 }}
        lg={{ span: 12 }}
        xl={{ span: 12 }}
        xxl={{ span: 12 }}
      >
        <WelcomeMsg />
      </Col>
      <Col
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={{ span: 24 }}
        lg={{ span: 12 }}
        xl={{ span: 12 }}
        xxl={{ span: 12 }}
      >
        <div className="relative h-full bg-login-right">
          <div className=" bg-sky-800 bg-opacity-70 h-full flex justify-center items-center">
            <div className="w-96">
              {errorMsg && (
                <div className="relative -top-8">
                  <Alert
                    message={errorMsg}
                    type="error"
                    closable
                    showIcon
                    onClose={onClose}
                  />
                </div>
              )}

              <div>
                <div className="mb-10">
                  <div className="flex justify-center">
                    <img src={changePasswordImg} alt="Change Password" />
                  </div>
                  <h2 className="my-6 text-center text-gray-200 text-3xl font-medium">
                    Change Password
                  </h2>
                </div>
                <ChangePasswordForm setErrorMsg={setErrorMsg} token={token} />
              </div>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default ChangePassword;
