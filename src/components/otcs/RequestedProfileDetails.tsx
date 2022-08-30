import { FC } from "react";
import { Link } from "react-router-dom";
import { Card, Divider, Row, Col } from "antd";
import { humanize, getUserPermissions } from "@/lib/helpers";
import moment from "moment";
import { isEmpty, toUpper, capitalize } from "lodash";
import { FiEdit } from "react-icons/fi";
import { ROLES as RBP } from "@/lib/constants";
import { ListItem, ListItemLink } from "@/components/common";

const otcEdit = getUserPermissions(RBP?.OTC?.UPDATE);

interface ProfileDetailsProps {
  editedProfile?: boolean;
  profile: any;
  id: any;
  title: string;
  editBtn?: boolean;
  showOcr?: boolean;
}

export const RequestedProfileDetails: FC<ProfileDetailsProps> = ({
  profile,
  id,
  title,
  editedProfile = false,
  editBtn = false,
  showOcr = false,
}) => {
  return (
    <Card title={title} className="page-body pl-6 relative">
      {editBtn && (
        <div className="flex justify-end">
          {otcEdit.isAuthorized && (
            <Link
              to={`/otc/pending-to-approve/edit/${id}`}
              className="flex gap-2"
            >
              <FiEdit className="text-sky-700 text-lg" />
              <span className="text-sky-700 font-medium">Edit</span>
            </Link>
          )}
        </div>
        )}
      <Row>
        <Col xs={{ span: 24 }}>
          <ListItem label="Unique Customer ID" data={profile?.unique_id} />
          <ListItem label="Full Name" data={profile?.name} />
          <ListItem label="Full Name in MM" data={profile?.name_mm} />
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
            data={profile?.id_number}
          />
          <ListItem
            label="ID Number in MM"
          
            data={profile?.id_number_mm}
          />
          <ListItem label="Created MSISDN" data={profile?.msisdn} />
          <ListItem label="Father Name" data={profile?.father_name} />
          <ListItem label="Father Name in MM" data={profile?.father_name_mm} />
          <ListItem
            label="Date of Birth"
            data={profile?.dob && moment(profile?.dob).format("DD-MM-YYYY")}
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
          <ListItem label="Submitted Agent’s MSISDN" data={profile?.agent_msisdn} />
          <ListItem label="KYC Status" status={profile?.kyc_status} />
          <ListItem label="Profile Status" status={profile?.account_status} />

          {editedProfile && (
            <>
              {profile?.status_change_reasons?.map((item: any) => (
                <ListItem
                  label="Update Reasons"
                  data={item.reason.portal_message}
                />
              ))}
              <ListItem label="Note" data={profile?.note} />
              <ListItem label="SR No" data={profile?.sr_number} />
              <ListItemLink
                label="Ref File"
                link={profile?.ref_file?.url}
                last
              />
            </>
          )}

          {showOcr && !isEmpty(profile?.ocr_response) && (
            <>
              <Divider />
              <h2 className=" mb-4 text-sky-700 text-base font-medium">
                OCR Result
              </h2>
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="p-3">
                      Title
                    </th>
                    <th scope="col" className="p-3">
                      In EN
                    </th>
                    <th scope="col" className="p-3">
                      In MM
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(profile?.ocr_response?.data)?.map((item) => {
                    if (item === "side") return;
                    return (
                      <tr className="bg-white border-b ">
                        <td className="border">{humanize(item)}</td>
                        <td className="border">
                          {profile?.ocr_response?.data?.[item]?.en}
                        </td>
                        <td className="border">
                          {profile?.ocr_response?.data?.[item]?.mm}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
        </Col>
      </Row>
    </Card>
  );
};
