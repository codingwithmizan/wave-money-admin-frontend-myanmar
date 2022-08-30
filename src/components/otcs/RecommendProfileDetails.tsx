import { FC } from "react";
import { Card, Row, Col, Divider } from "antd";
import { ExclamationCircleFilled, CheckCircleFilled } from "@ant-design/icons";
import { humanize } from "@/lib/helpers";
import { DATE_FORMMAT, ROLES as RBP } from "@/lib/constants";
import moment from "moment";
import { toUpper, capitalize } from "lodash";
import { ListItem, ListItemLink } from "@/components/common";

interface RecommendProfileDetailsProp {
  // status: "RECOMMAND_APPROVE" | "RECOMMEND_REJECT";
  profile: any;
  title: string;
}

export const RecommendProfileDetails: FC<RecommendProfileDetailsProp> = ({
  profile,
  title,
}) => {
  return (
    <Card
      title={title}
      className="page-body w-full pl-6 relative"
    >
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
          <ListItem
            label="Profile Status"
            status={profile?.account_status}
            last
          />
        </Col>
      </Row>
    </Card>
  );
};
