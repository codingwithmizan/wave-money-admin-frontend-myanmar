import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { LoadingSpiner } from "@/components/common";
import PrivateRoute from "@/routes/PrivateRoute";
import { ROLES as RBP } from "@/lib/constants";

// root
const LazyLogin = React.lazy(() => import("@/pages/Login"));
const LazyChangePassword = React.lazy(() => import("@/pages/ChangePassword"));
const LazyDashboardLayout = React.lazy(() => import("@/pages/DashboardLayout"));
const LazyBaseLayout = React.lazy(() => import("@/pages/BaseLayout"));
import { Home, AlertList, AuditLogs, PageNotFound } from "@/pages";

//profiles
import { ProfileDetails } from "@/pages/profiles";

//Management
import {
  CompanyList,
  CompanyAdd,
  CompanyDetails,
  CompanyEdit,
  RoleList,
  RoleAdd,
  RoleDetails,
  RoleEdit,
  UserList,
  UserAdd,
  UserDetails,
  UserEdit,
} from "@/pages/management";

//OTCs
import {
  OtcAllProfileList,
  OtcApprovedList,
  OtcApprovedDetails,
  OtcApprovedEdit,
  OtcPendingToApproveList,
  OtcPendingToApproveDetails,
  OtcPendingToApproveEdit,
  OtcPendingToReviewList,
  OtcPendingToReviewDetails,
  OtcPendingToRecommendList,
  OtcPendingToRecommendDetails,
  OtcRecommendToApproveList,
  OtcRecommendToApproveDetails,
  OtcRecommandToRejectsList,
  OtcRecommandToRejectsDetails,
  OtcRejectedList,
  OtcRejectedDetails,
} from "@/pages/otcs";

import { AuditTraiList, AuditTrailDetails } from "@/pages/audit-trails";
import {
  BulkList,
  BulkDetails,
  BulkUploadForCreation,
  BulkUploadForModification,
} from "@/pages/bulk-upload";

//Wallet Subscribers
import {
  AddNewSubscriber,
  AllSubscriberList,
  SubscriberNotsubmittedList,
  SubscriberNotsubmittedDetails,
  SubscriberPendingToApprovedList,
  SubscriberPendingToApprovedDetails,
  SubscriberApprovedList,
  SubscriberApprovedDetails,
  SubscriberRejectedList,
  SubscriberRejectedDetails,
  SubscriberPendingToRecommendList,
  SubscriberPendingToRecommendDetails,
  SubscriberRecommendToApprovedList,
  SubscriberRecommendToApprovedDetails,
  SubscriberRecommendToRejectList,
  SubscriberRecommendToRejectDetails,
} from "@/pages/wallet-subscribers";

const authToken = Cookies.get("token" || "");
axios.defaults.headers.common["Authorization"] = authToken || "";
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      Cookies.remove("token");
      Cookies.remove("email");
      Cookies.remove("expires");
      Cookies.remove("name");
      Cookies.remove("role");
      Cookies.remove("permission_codes");
      Cookies.remove("img");
      Cookies.remove("s_g");
      window.location.replace("/login");
    } else if (error?.response?.status === 500) {
      toast.error(
        "Something went wrong, please try again. If problem persist, please contact system admin."
      );
    } else {
      return error.response;
    }
  }
);

const RouteList = () => {
  return (
    <div>
      <Routes>
        <Route
          path=""
          element={
            <Suspense fallback={<LoadingSpiner />}>
              <LazyBaseLayout />
            </Suspense>
          }
        >
          <Route path="/*" element={<PrivateRoute allowedRoles={RBP.ALL} />}>
            <Route
              path=""
              element={
                <Suspense fallback={<LoadingSpiner />}>
                  <LazyDashboardLayout />
                </Suspense>
              }
            >
              <Route element={<PrivateRoute allowedRoles={RBP?.DASHBOARD} />}>
                <Route index element={<Home />} />
              </Route>
              {/* profile */}
              <Route path="profile/details" element={<ProfileDetails />} />
              <Route
                element={<PrivateRoute allowedRoles={RBP?.PORTAL_USER?.READ} />}
              >
                <Route path="user/list" element={<UserList />} />
              </Route>
              <Route
                element={
                  <PrivateRoute allowedRoles={RBP?.PORTAL_USER?.CREATE} />
                }
              >
                <Route path="user/add" element={<UserAdd />} />
              </Route>
              <Route
                element={<PrivateRoute allowedRoles={RBP?.PORTAL_USER?.READ} />}
              >
                <Route path="user/details/:id" element={<UserDetails />} />
              </Route>
              <Route
                element={
                  <PrivateRoute allowedRoles={RBP?.PORTAL_USER?.UPDATE} />
                }
              >
                <Route path="user/edit/:id" element={<UserEdit />} />
              </Route>
              {/* roles */}
              <Route element={<PrivateRoute allowedRoles={RBP?.ROLE?.READ} />}>
                <Route path="role/list" element={<RoleList />} />
              </Route>
              <Route
                element={<PrivateRoute allowedRoles={RBP?.ROLE?.CREATE} />}
              >
                <Route path="role/add" element={<RoleAdd />} />
              </Route>
              <Route element={<PrivateRoute allowedRoles={RBP?.ROLE?.READ} />}>
                <Route path="role/details/:id" element={<RoleDetails />} />
              </Route>
              <Route
                element={<PrivateRoute allowedRoles={RBP?.ROLE?.UPDATE} />}
              >
                <Route path="role/edit/:id" element={<RoleEdit />} />
              </Route>
              {/*company */}
              <Route
                element={<PrivateRoute allowedRoles={RBP?.COMPANY?.READ} />}
              >
                <Route path="company/list" element={<CompanyList />} />
              </Route>
              <Route
                element={<PrivateRoute allowedRoles={RBP?.COMPANY?.CREATE} />}
              >
                <Route path="company/add" element={<CompanyAdd />} />
              </Route>
              <Route
                element={<PrivateRoute allowedRoles={RBP?.COMPANY?.READ} />}
              >
                <Route
                  path="company/details/:id"
                  element={<CompanyDetails />}
                />
              </Route>
              <Route
                element={<PrivateRoute allowedRoles={RBP?.COMPANY?.UPDATE} />}
              >
                <Route path="company/edit/:id" element={<CompanyEdit />} />
              </Route>
              {/* otc all profile list */}
              <Route element={<PrivateRoute allowedRoles={RBP?.OTC?.READ} />}>
                <Route path="otc-profiles" element={<OtcAllProfileList />} />
              </Route>
              {/* otc approved */}
              <Route element={<PrivateRoute allowedRoles={RBP?.OTC?.READ} />}>
                <Route path="otc/approved/list" element={<OtcApprovedList />} />
              </Route>
              <Route element={<PrivateRoute allowedRoles={RBP?.OTC.READ} />}>
                <Route
                  path="otc/approved/details/:id"
                  element={<OtcApprovedDetails />}
                />
              </Route>
              <Route element={<PrivateRoute allowedRoles={RBP?.OTC?.UPDATE} />}>
                <Route
                  path="otc/approved/edit/:id"
                  element={<OtcApprovedEdit />}
                />
              </Route>
              {/* otc pending to approve */}
              <Route element={<PrivateRoute allowedRoles={RBP?.OTC.READ} />}>
                <Route
                  path="otc/pending-to-approve"
                  element={<OtcPendingToApproveList />}
                />
              </Route>
              <Route element={<PrivateRoute allowedRoles={RBP?.OTC.READ} />}>
                <Route
                  path="otc/pending-to-approve/details/:id"
                  element={<OtcPendingToApproveDetails />}
                />
              </Route>
              <Route element={<PrivateRoute allowedRoles={RBP?.OTC.UPDATE} />}>
                <Route
                  path="otc/pending-to-approve/edit/:id"
                  element={<OtcPendingToApproveEdit />}
                />
              </Route>
              {/* otc pending to review edited */}
              <Route element={<PrivateRoute allowedRoles={RBP?.OTC.READ} />}>
                <Route
                  path="otc/pending-to-review-edited"
                  element={<OtcPendingToReviewList />}
                />
              </Route>
              <Route element={<PrivateRoute allowedRoles={RBP?.OTC.READ} />}>
                <Route
                  path="otc/pending-to-review-edited/details/:id"
                  element={<OtcPendingToReviewDetails />}
                />
              </Route>
              {/* otc rejected */}
              <Route element={<PrivateRoute allowedRoles={RBP?.OTC.READ} />}>
                <Route path="otc/rejected/list" element={<OtcRejectedList />} />
              </Route>
              <Route element={<PrivateRoute allowedRoles={RBP?.OTC.READ} />}>
                <Route
                  path="otc/rejected/details/:id"
                  element={<OtcRejectedDetails />}
                />
              </Route>
              {/* otc pending to recommend */}
              <Route element={<PrivateRoute allowedRoles={RBP?.OTC.READ} />}>
                <Route
                  path="otc/pending-to-recommends"
                  element={<OtcPendingToRecommendList />}
                />
              </Route>
              <Route element={<PrivateRoute allowedRoles={RBP?.OTC.READ} />}>
                <Route
                  path="otc/pending-to-recommends/details/:id"
                  element={<OtcPendingToRecommendDetails />}
                />
              </Route>
              {/* otc recommend to approve */}
              <Route element={<PrivateRoute allowedRoles={RBP?.OTC.READ} />}>
                <Route
                  path="otc/recommend-to-approves"
                  element={<OtcRecommendToApproveList />}
                />
              </Route>
              <Route element={<PrivateRoute allowedRoles={RBP?.OTC.READ} />}>
                <Route
                  path="otc/recommend-to-approves/details/:id"
                  element={<OtcRecommendToApproveDetails />}
                />
              </Route>
              {/* otc recommend to reject */}
              <Route element={<PrivateRoute allowedRoles={RBP?.OTC.READ} />}>
                <Route
                  path="otc/recommend-to-rejects"
                  element={<OtcRecommandToRejectsList />}
                />
              </Route>
              <Route element={<PrivateRoute allowedRoles={RBP?.OTC.READ} />}>
                <Route
                  path="otc/recommend-to-rejects/details/:id"
                  element={<OtcRecommandToRejectsDetails />}
                />
              </Route>
              {/* audit tails */}
              <Route path="audit-trail/list" element={<AuditTraiList />} />
              <Route
                path="audit-trail/details/:id"
                element={<AuditTrailDetails />}
              />
              {/* add new subscriber */}
              <Route element={<PrivateRoute allowedRoles={RBP?.OTC.READ} />}>
                <Route path="subscribers/add" element={<AddNewSubscriber />} />
              </Route>

              {/* all subscribers */}
              <Route element={<PrivateRoute allowedRoles={RBP?.OTC.READ} />}>
                <Route path="all-subscribers" element={<AllSubscriberList />} />
              </Route>
              {/* wallet subscribers not submitted */}
              <Route element={<PrivateRoute allowedRoles={RBP?.OTC.READ} />}>
                <Route
                  path="subscribers/not-submitted"
                  element={<SubscriberNotsubmittedList />}
                />
              </Route>
              <Route element={<PrivateRoute allowedRoles={RBP?.OTC.READ} />}>
                <Route
                  path="subscribers/not-submitted/details/:id"
                  element={<SubscriberNotsubmittedDetails />}
                />
              </Route>
              {/*wallet subscribers pending to approve */}
              <Route element={<PrivateRoute allowedRoles={RBP?.OTC.READ} />}>
                <Route
                  path="subscribers/pending-to-approve"
                  element={<SubscriberPendingToApprovedList />}
                />
              </Route>
              <Route element={<PrivateRoute allowedRoles={RBP?.OTC.READ} />}>
                <Route
                  path="subscribers/pending-to-approve/details/:id"
                  element={<SubscriberPendingToApprovedDetails />}
                />
              </Route>
              {/*wallet subscribers approved */}
              <Route element={<PrivateRoute allowedRoles={RBP?.OTC.READ} />}>
                <Route
                  path="subscribers/approved"
                  element={<SubscriberApprovedList />}
                />
              </Route>
              <Route element={<PrivateRoute allowedRoles={RBP?.OTC.READ} />}>
                <Route
                  path="subscribers/approved/details/:id"
                  element={<SubscriberApprovedDetails />}
                />
              </Route>
              {/*wallet subscribers rejected */}
              <Route element={<PrivateRoute allowedRoles={RBP?.OTC.READ} />}>
                <Route
                  path="subscribers/rejected"
                  element={<SubscriberRejectedList />}
                />
              </Route>
              <Route element={<PrivateRoute allowedRoles={RBP?.OTC.READ} />}>
                <Route
                  path="subscribers/rejected/details/:id"
                  element={<SubscriberRejectedDetails />}
                />
              </Route>
              {/*wallet subscribers pending to recommend */}
              <Route element={<PrivateRoute allowedRoles={RBP?.OTC.READ} />}>
                <Route
                  path="subscribers/pending-to-recommend"
                  element={<SubscriberPendingToRecommendList />}
                />
              </Route>
              <Route element={<PrivateRoute allowedRoles={RBP?.OTC.READ} />}>
                <Route
                  path="subscribers/pending-to-recommend/details/:id"
                  element={<SubscriberPendingToRecommendDetails />}
                />
              </Route>
              {/*wallet subscribers recommend to approve */}
              <Route element={<PrivateRoute allowedRoles={RBP?.OTC.READ} />}>
                <Route
                  path="subscribers/recommend-to-approve"
                  element={<SubscriberRecommendToApprovedList />}
                />
              </Route>
              <Route element={<PrivateRoute allowedRoles={RBP?.OTC.READ} />}>
                <Route
                  path="subscribers/recommend-to-approve/details/:id"
                  element={<SubscriberRecommendToApprovedDetails />}
                />
              </Route>
              {/*wallet subscribers recommend to reject */}
              <Route element={<PrivateRoute allowedRoles={RBP?.OTC.READ} />}>
                <Route
                  path="subscribers/recommend-to-reject"
                  element={<SubscriberRecommendToRejectList />}
                />
              </Route>
              <Route element={<PrivateRoute allowedRoles={RBP?.OTC.READ} />}>
                <Route
                  path="subscribers/recommend-to-reject/details/:id"
                  element={<SubscriberRecommendToRejectDetails />}
                />
              </Route>
              =======
              {/* bulk upload */}
              <Route path="bulk-list" element={<BulkList />} />U
              <Route path="bulk-details/:id" element={<BulkDetails />} />
              <Route
                path="bulk-upload-creation"
                element={<BulkUploadForCreation />}
              />
              <Route
                path="bulk-upload-modification"
                element={<BulkUploadForModification />}
              />
              {/* others */}
              <Route path="alerts" element={<AlertList />} />
              <Route path="history" element={<AuditLogs />} />
              <Route path="404" element={<PageNotFound />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Route>
          <Route
            path="login"
            element={
              <Suspense fallback={<LoadingSpiner />}>
                <LazyLogin />
              </Suspense>
            }
          />
          <Route
            path="change-password"
            element={
              <Suspense fallback={<LoadingSpiner />}>
                <LazyChangePassword />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </div>
  );
};

export default RouteList;
