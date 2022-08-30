import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import {checkRoleBasedPermission, getAllCookies} from '@/lib/helpers'

interface PrivateRouteProps {
  allowedRoles: string[];
}

const PrivateRoute: FC<PrivateRouteProps> = ({ allowedRoles }) => {
  const {authToken, roles} = getAllCookies();
  // const authToken = Cookies.get("token");
  // const roles = Cookies.get("permission_codes")?.split(",");
  const authPermission = checkRoleBasedPermission('ROUTE',roles, allowedRoles);

  if (authPermission && authToken) {
    return <Outlet />;
  } else if (authToken && !authPermission) {
    return <Navigate to="/404" replace />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;
