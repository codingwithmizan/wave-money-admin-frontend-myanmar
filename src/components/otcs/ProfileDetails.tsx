import { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, Divider } from "antd";
import { ExclamationCircleFilled, CheckCircleFilled } from "@ant-design/icons";
import { FiEdit } from "react-icons/fi";
import { humanize, getUserPermissions } from "@/lib/helpers";
import { DATE_FORMMAT, ROLES as RBP } from "@/lib/constants";
import moment from "moment";
import { toUpper, capitalize } from "lodash";
import { ListItem, ListItemLink } from "@/components/common";

const otcEdit = getUserPermissions(RBP?.OTC?.UPDATE);

interface ProfileDetailsProp {
  status: "APPROVED" | "REJECTED" ;
  profile: any;
  id: any;
  title: string;
  editBtn?: boolean;

}

export const ProfileDetails: FC<ProfileDetailsProp> = ({
  status,
  profile,
  id,
  title,
  editBtn= false
}) => {
  return (
    <Card
      title={title}
      className="page-body w-full pl-6 relative"
      extra={
        <>
          {profile?.kyc_status === "approved" ? (
            <div className="flex gap-2">
              <CheckCircleFilled className="text-xl relative -top-0.5 text-sky-700" />
              <h4 className="text-lg text-sky-700">Verified</h4>
            </div>
          ) : (
            <div className="flex gap-2">
              <ExclamationCircleFilled className="text-xl relative -top-0.5 text-gray-400" />
              <h4 className="text-lg text-gray-500 ">Unverified</h4>
            </div>
          )}
        </>
      }
    >
      {editBtn && id && otcEdit.isAuthorized && (
          <div className="flex justify-end">
            {
              !profile?.is_edited ?
              <Link to={`/otc/approved/edit/${id}`} className="flex gap-2">
                 <FiEdit className="text-sky-700 text-lg" />
                 <span className="text-sky-700 font-medium underline"> Edit </span>
              </Link>
              :
              <Link to={`/otc/pending-to-review-edited/details/${id}`} className="ant-btn ant-btn-primary ant-btn-md btn-submit">
                 <span className="text-white-700 font-medium"> Pending To Review Edited </span>
              </Link>
            }
          </div>
        )}
      {/* {id && otcEdit.isAuthorized && (
        <div className="flex justify-end">
          {!profile?.is_edited ? (
            <Link
              to={`/otc/approved/edit/${id}`}
              className="flex gap-2 cursor-pointer"
            >
              <FiEdit className="text-sky-700 text-lg" />
              <span className="text-sky-700 font-medium "> Edit </span>
            </Link>
          ) : (
            <Link
              to={`/otc/pending-to-review-edited/details/${encodeURI(id)}`}
              className="ant-btn ant-btn-primary ant-btn-md btn-submit"
            >
              <span className="text-white-700 font-medium">
                Pending To Review Edited
              </span>
            </Link>
          )}
        </div>
      )} */}
      <Row>
        <Col xs={{ span: 24 }}>
          <ListItem label="Unique Customer ID" data={profile?.unique_id} />
          <ListItem label="Full Name" data={profile?.full_name} />
          <ListItem label="Full Name in MM" data={profile?.full_name_mm} />
          <ListItem
            label="ID Type"
            data={
              profile?.id_type === "nrc"
                ? toUpper(profile?.id_type)
                : capitalize(profile?.id_type)
            }
          />
          <ListItem
            label="ID Number"
            data={profile?.nrc_number}
          />

          <ListItem label="Created MSISDN" data={profile?.created_msisdn} />
          <ListItem label="Father Name" data={profile?.father_name} />
          <ListItem label="Father Name in MM" data={profile?.father_name_mm} />
          <ListItem
            label="Date of Birth"
            data={profile?.dob && moment(profile?.dob).format(DATE_FORMMAT)}
          />
          <ListItem label="Gender" data={humanize(profile?.gender)} />
          <ListItem label="Address" data={profile?.address} />
          <ListItem
            label="KYC Submission Date"
            data={moment(profile?.created_at).format("DD-MM-YYYY HH:mm:ss")}
          />
          <ListItem
            label="KYC Last Modified Date"
            data={moment(profile?.updated_at)?.format("DD-MM-YYYY HH:mm:ss")}
          />
          <ListItem
            label="Submitted Agent's MSISDN"
            data={profile?.submitted_agent_id}
          />
          <ListItem label="KYC Status" status={profile?.kyc_status} />
          <ListItem label="Profile Status" status={profile?.account_status} />
          <div>
            {status === "APPROVED" ? (
              <>
                <h4 className="text-gray-500 mb-1.5 wave-money-text">
                  Approved Reasons
                </h4>
                {profile?.approved_reason?.length > 0 ? (
                  profile?.approved_reason?.map(
                    (reasonItem: any, i: number) => (
                      <p
                        key={i}
                        className="text-gray-600 font-medium wave-money-text"
                      >
                        {reasonItem?.reason?.portal_message}.
                      </p>
                    )
                  )
                ) : (
                  <span className="text-xs">N/A</span>
                )}
              </>
            ) : (
              <>
                <h4 className="text-gray-500 mb-1.5 wave-money-text">
                  Rejection Reasons
                </h4>
                {profile?.rejection_reason?.length > 0 ? (
                  profile?.rejection_reason?.map(
                    (reasonItem: any, i: number) => (
                      <p
                        key={i}
                        className="text-gray-600 font-medium wave-money-text mb-1"
                      >
                        {reasonItem?.reason?.portal_message}.
                      </p>
                    )
                  )
                ) : (
                  <span className="text-xs">N/A</span>
                )}
              </>
            )}
            <Divider className="my-4" />
          </div>
          <ListItem label="Note" data={profile?.note} />
          <ListItem label="SR No" data={profile?.sr_no} />
          <ListItemLink label="Ref. File" link={profile?.ref_file} last />
        </Col>
      </Row>
    </Card>
  );
};
