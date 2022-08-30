import { FC } from "react";
import { Card } from "antd";
import { ListItem } from "@/components/common";

interface AuditTrailDetailsProp {
  info: any;
}

export const AuditTrailDetails: FC<AuditTrailDetailsProp> = ({ info }) => {
  return (
    <Card title="Audit Trail Details" className="page-body pl-6 w-full">
      <ListItem label="Agents ID" data={info?.created_by?.id} />
      <ListItem label="Agents Name" data={info?.created_by?.name} />
      <ListItem label="Modified Date" data={info?.modified_date} />
      <ListItem label="Change Category" data={info?.change_category} />
      <ListItem label="Change Summary" data={info?.change_summary} />
      <ListItem label="Reason for Change" data={info?.change_reason} last/>
    </Card>
  );
};
