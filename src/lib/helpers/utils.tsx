import moment from "moment";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useAppDispatch } from "@/app/hooks";
import { setSeletedPage } from "@/app/features/global/globalSlice";

export const capitalize = (str: string = "") => {
  const lower = str?.toLocaleLowerCase();
  return str?.charAt(0).toUpperCase() + lower?.slice(1);
};

export const titleCase = (str: string) => {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" ");
};

export const getFormattedDate = (date?: string, format?: string) => {
  return date ? moment(date).utcOffset("+0600")?.format(format) : "";
};

export const commaRemover = (value: string) => {
  return value.replace(/\,/g, "");
};

export const getDate = (date: string) => {
  return moment(date).utcOffset("+0600");
};

export const refreshPage = (url: string, callback?: any) => {
  setTimeout(() => {
    callback();
    window.location.replace(url);
  }, 1000);
};

export const humanize = (str: string) => {
  let humanizedStr = "";
  if (str) {
    humanizedStr = str
      .replace(/^[\s_]+|[\s_]+$/g, "")
      .replace(/[_\s]+/g, " ")
      .replace(/^[a-z]/, function (m) {
        return m.toUpperCase();
      });
  }
  return humanizedStr;
};

export const objectToFormData = (obj: any) => {
  let formData = new FormData();
  Object.keys(obj).forEach((key) => formData.append(key, obj[key]));
  return formData;
};

export const obj2FormData = (obj: any) => {
  let formData = new FormData();

  const createFormData = function (obj: any, subKeyStr = "") {
    for (let i in obj) {
      let value = obj[i];
      let subKeyStrTrans = subKeyStr ? subKeyStr + "[" + i + "]" : i;

      if (typeof value === "string" || typeof value === "number") {
        formData.append(subKeyStrTrans, obj[i]);
      } else if (typeof value === "object") {
        createFormData(value, subKeyStrTrans);
      }
    }
  };

  createFormData(obj);

  return formData;
};

export const setHeaderTitle = (title: string) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setSeletedPage(title));
  }, [title]);
};

export const getAllCookies = () => {
  const authToken = Cookies.get("token") || "";
  const roles = Cookies.get("permission_codes")?.split(",");
  return { authToken, roles };
};

export const avatarFormatter = (name: string = "AD") => {
  let formattedStr = "";
  const strArr = name.split(" ");
  if (strArr.length === 1) {
    formattedStr = strArr[0].slice(0, 2).toUpperCase();
  } else if (strArr.length > 1) {
    formattedStr =
      strArr[0].slice(0, 1).toUpperCase() + strArr[1].slice(0, 1).toUpperCase();
  } else {
    formattedStr = "AD";
  }
  return formattedStr ? formattedStr : "N/A";
};

export const generateNrcNo = (
  region?: number,
  township?: string,
  id_type?: string,
  digits?: string
) => {
  let nrc_no = "";
  if (region && township && id_type && digits) {
    nrc_no = region + "/" + township + "(" + id_type + ")" + digits;
  }

  return nrc_no;
};

export const splitedNrcNo = (nrc_no?: string) => {
  if (!nrc_no && !/[/()]/.test(nrc_no || "")) {
    return { region: null, township: null, id_type: null, digits: null };
  }

  const splitedString = nrc_no?.split(/[/()]/);
  if (!splitedString) {
    return { region: null, township: null, id_type: null, digits: null };
  } else {
    return {
      region: splitedString[0] || null,
      township: splitedString[1] || null,
      id_type: splitedString[2] || null,
      digits: splitedString[3] || null,
    };
  }
};

export const getRole = (role: number) => {
  switch (role) {
    case 0:
      return "Member";
    case 1:
      return "Admin";
    case 2:
      return "Super Admin";
    case 3:
      return "Manager";
    default:
      return "";
  }
};

export const getFilteredRoles: any = (
  roles: string[],
  moduleWiseRoles?: string[]
) => {
  console.log("moduleWiseRoles", moduleWiseRoles);

  const filteredRoles =
    moduleWiseRoles && moduleWiseRoles?.filter((item) => roles?.includes(item));
  return filteredRoles;
};

export const isValidUrl = (val: string) => {
  let url;

  try {
    url = new URL(val);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
};

export const splitedForeignData = (value: string) => {
  const splitedList = value.split("-");
  return splitedList[0];
};

export const getBase64 = (file: any): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const checkRoleBasedPermission = (
  mode: string,
  roles?: string[],
  allowRole?: string[]
) => {
  const result = roles?.some(
    (role: string) => allowRole && allowRole.includes(role)
  );
  return mode === "ROUTE" ? result : !result;
};

export const getUserPermissions = (permissionCodeList: string[]) => {
  const { roles } = getAllCookies();
  const isAuthorized = permissionCodeList?.some((code) =>
    roles?.includes(code)
  );
  return { isAuthorized };
};

export const getStyledStatus = (status: string) => {
  switch (status) {
    case "SuperAdmin":
      return (
        <span className="status bg-pink-100 text-pink-700 w-28">
          Super Admin
        </span>
      );
    case "admin":
      return <span className="status bg-blue-100 text-blue-700 ">Admin</span>;
    case "manager":
    case "Manager":
      return (
        <span className="status  bg-purple-100 text-purple-700 ">Manager</span>
      );
    case "Checker":
    case "checker":
      return <span className="status bg-cyan-100 text-cyan-700 ">Checker</span>;
    case "auditor":
      return (
        <span className="status bg-amber-100 text-amber-700 ">Auditor</span>
      );
    case "success":
      return (
        <span className="status bg-green-100 text-green-700 ">Success</span>
      );
    case "processing":
      return (
        <span className="status bg-orange-100 text-orange-700 ">
          Processing
        </span>
      );
    case "member":
      return (
        <span className="status bg-green-100 text-green-700 ">Member</span>
      );
    case "approved":
    case "accepted":
    case "pending_to_review_edited":
      return (
        <span className="status bg-green-100 text-green-700 ">Approved</span>
      );
    case "active":
      return (
        <span className="status bg-green-100 text-green-700 ">Active</span>
      );
    case "pending_approval":
      return (
        <span className="status bg-sky-100 text-sky-700 w-32 ">
          Pending Approval
        </span>
      );
    case "pending_recommendation":
      return (
        <span className="status bg-violet-100 text-violet-700 w-40 2xl:w-52">
          Pending to Recommendation
        </span>
      );
    case "recommend_to_approve":
      return (
        <span className="status bg-green-100 text-green-700 w-40 2xl:w-44">
          Recommend to Approve
        </span>
      );
    case "inactive":
      return (
        <span className="status  bg-yellow-100 text-yellow-700">Inactive</span>
      );
    case "pending":
      return (
        <span className="status bg-violet-100 text-violet-700">Pending</span>
      );
    case "failed":
      return <span className="status bg-red-100 text-red-700 ">Failed</span>;
    case "rejected":
      return <span className="status bg-red-100 text-red-700 ">Rejected</span>;
    case "closed":
      return <span className="status bg-red-100 text-red-700 ">Closed</span>;
    case "recommend_to_reject":
      return (
        <span className="status bg-red-100 text-red-700 w-40 2xl:w-40">
          Recommend to Reject
        </span>
      );
    default:
      return (
        <span className="status bg-stone-200 text-stone-700 ">
          {humanize(status)}
        </span>
      );
  }
};

export const getOtcUrl = (status: string, id: string, urlType: string) => {
  let url = "/otc/";
  switch (status) {
    case "accepted":
      url += `approved/${urlType}/${encodeURI(id)}`;
      break;
    case "pending_approval":
      url += `pending-to-approve/${urlType}/${encodeURI(id)}`;
      break;
    case "pending_to_review_edited":
      url += `pending-to-review-edited/${urlType}/${encodeURI(id)}`;
      break;
    case "rejected":
      url += `rejected/${urlType}/${encodeURI(id)}`;
      break;
    default:
      url += `pending-to-approve/${urlType}/${encodeURI(id)}`;
      break;
  }
  return url;
};
