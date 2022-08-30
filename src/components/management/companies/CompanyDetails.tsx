import { FC } from "react";
import { Link } from "react-router-dom";
import { humanize, getUserPermissions } from "@/lib/helpers";
import { Card, Row, Col } from "antd";
import { FiEdit } from "react-icons/fi";
import { ROLES as RBP } from "@/lib/constants";
import { ListItem } from "@/components/common";

const companyEdit = getUserPermissions(RBP?.COMPANY?.UPDATE);

interface CompanyDetailsProps {
  company: any;
}

export const CompanyDetails: FC<CompanyDetailsProps> = ({ company }) => {
  return (
    <Card title="Company Management Details">
      <Row>
        <Col
          xs={{ span: 20 }}
          sm={{ span: 20 }}
          md={{ span: 20 }}
          lg={{ span: 20 }}
          xl={{ span: 20 }}
          xxl={{ span: 20 }}
        >
          <div className="pl-6">
            <ListItem label="Company Name" data={company?.company_name} />
            <ListItem label="Company ID" data={company?.company_id} />
            <ListItem label="Phone Number" data={company?.phone_number} />
            <ListItem label="Address" data={company?.address} />
            <ListItem label="Email ID" data={company?.email} />
            <ListItem label="Company Status" status={company?.company_status} />
          </div>
        </Col>
        <Col
          xs={{ span: 4 }}
          sm={{ span: 4 }}
          md={{ span: 4 }}
          lg={{ span: 4 }}
          xl={{ span: 4 }}
          xxl={{ span: 4 }}
        >
          {companyEdit.isAuthorized && (
            <div className="flex justify-end">
              <Link to={`/company/edit/${company?.id}`} className="flex gap-2">
                <FiEdit className="text-sky-700 wave-money-text relative top-1" />
                <span className="text-sky-700 font-medium wave-money-text">Edit</span>
              </Link>
            </div>
          )}
        </Col>
      </Row>
    </Card>
  );
};
