import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Cookies from "js-cookie";
import { postData } from "@/lib/services";
import { useAppDispatch } from "@/app/hooks";
import { setUsername } from "@/app/features/global/globalSlice";
import { FieldLabel, Input, Password, Checkbox } from "@/components/controls";
import { Button } from "antd";
import { useCommon } from "@/hooks";
import { WarningMsg } from "./WarningMsg";
import { ROLES as RBP } from "@/lib/constants";

interface LoginFormProps {
  setErrorMsg: (value: string) => void;
}
interface IFormInputs {
  email: string;
  password: string;
}

export const LoginForm: FC<LoginFormProps> = ({ setErrorMsg }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isModalVisible, toggleModalVisible } = useCommon();
  const [token, setToken] = useState("");
  const [warningMsg, setWarningMsg] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    mode: "all",
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: IFormInputs) => {
    const params = {
      email: data.email,
      password: data.password,
    };
    const res = await postData("users/login", params);

    if (!res?.success && res?.status === 307) {
      setToken(res?.data?.token);
      setWarningMsg(res?.message);
      toggleModalVisible();
    } else if (res?.success) {
      Cookies.set("token", res?.data?.token, { expires: 1 });
      Cookies.set("email", res?.data?.email, { expires: 1 });
      Cookies.set("name", res?.data?.name, { expires: 1 });
      Cookies.set("role", res?.data?.role?.name, { expires: 1 });
      Cookies.set("img", res?.data?.image?.url || "", { expires: 1 });
      Cookies.set("permission_codes", res?.data?.role?.permission_codes, {
        expires: 1,
      });
      Cookies.set("expires", res?.data?.exp);
      dispatch(setUsername(res?.data?.username));
      const isAuthorized = RBP.DASHBOARD?.some((code) =>
        res?.data?.role?.permission_codes?.includes(code)
      );
      if (res?.data?.role?.name === "SuperAdmin" || !isAuthorized) {
        navigate("/profile/details" , {replace:true});
        window.location.reload();
      } else {
        navigate("/", {replace:true});
        window.location.reload();
      }
    } else {
      setErrorMsg(res?.message);
    }
  };
  const onChangePassword = async () => {
    navigate("/change-password", { state: { token }, replace: false });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-6">
          <FieldLabel
            name="email"
            label="Email"
            required
            className="text-gray-200"
          />
          <Input
            control={control}
            name="email"
            type="email"
            errors={errors}
            placeholder="e.g. john@gmail.com"
          />
        </div>
        <div className="mb-6">
          <FieldLabel
            name="password"
            label="Password"
            required
            className="text-gray-200"
          />
          <Password
            control={control}
            name="password"
            errors={errors}
            placeholder="e.g. pass*123#"
          />
        </div>
        <div className="mb-6 -mt-1">
          <Checkbox
            control={control}
            name="keep_me"
            label="Keep me logged in"
            className="text-gray-200 login-control"
          />
        </div>
        <Button
          type="primary"
          htmlType="submit"
          className="bg-sky-800 hover:bg-sky-700  uppercase"
          size="large"
          block
        >
          Log in
        </Button>
      </form>
      {warningMsg && (
        <WarningMsg
          isModalVisible={isModalVisible}
          toggleModal={toggleModalVisible}
          onChangePassword={onChangePassword}
          message={warningMsg}
        />
      )}
    </>
  );
};

const loginSchema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required").trim(),
  })
  .required();
