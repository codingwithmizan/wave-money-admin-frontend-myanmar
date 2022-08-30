import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { getDetails } from "@/lib/services/baseServices";

export const useAuth = () => {
  const [userVerified, setUserVerified] = useState(false);
  const navigate = useNavigate();
  const authToken = Cookies.get("token" || "");


  // useEffect(() => {
  //   const authToken = Cookies.get("token" || "");
  //   console.log('authToken',authToken);
    
  //   if (authToken) {
  //     getVerifyAuthToken();
  //   } else {
  //     navigate("/login");
  //   }
  // }, []);

  const getVerifyAuthToken = async () => {
    const response = await getDetails("users/verify_auth_token");
    console.log('auth response',response);
    
    if (response?.success) {
      setUserVerified(response?.data?.valid);
    } else{
      navigate("/login");
    }
  };

  return authToken;
};
