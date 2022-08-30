import { useState } from "react";
import { LoginForm, WelcomeMsg } from "@/components/auth";
import { Row, Col, Alert } from "antd";

const Login = () => {
  const [errorMsg, setErrorMsg] = useState("");
  console.log(errorMsg);

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
                <h2 className="text-3xl text-gray-200 font-medium mb-6">
                  Log in
                </h2>
                <LoginForm setErrorMsg={setErrorMsg} />
              </div>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Login;
