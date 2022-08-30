import { FC } from "react";
import { Card, Row, Col, Image, Divider } from "antd";
import { humanize } from "@/lib/helpers";
import { isEmpty } from "lodash";
import { isValidUrl } from "@/lib/helpers/utils";
import { ListItem } from "@/components/common";
interface ChangeInfoProp {
  info: any;
}

export const ChangeInfo: FC<ChangeInfoProp> = ({ info }) => {
  console.log(info);
  return (
    <Card title="Information Changes" className="page-body w-full pl-6">
      <Row>
      <Col
          xs={{ span: 10 }}
          sm={{ span: 10 }}
          md={{ span: 10 }}
          lg={{ span: 10 }}
          xl={{ span: 10 }}
          xxl={{ span: 10 }}
        >
          <h2 className="mb-4 text-sky-700 text-base font-medium ">
            Before Changes
          </h2>
          <Divider />

          {info?.before &&
            !isEmpty(info?.before) &&
            Object.entries(info?.before).map(([key, value]: any, index) => (
              <div key={index}>
                {isValidUrl(value) ? (
                  <ListItem label={humanize(key)} img={value} />
                ) : key === "kyc_status" ? (
                  <ListItem label={humanize(key)} status={value} />
                ) : (
                  <ListItem label={humanize(key)} data={value} />
                )}
              </div>
            ))}
        </Col>
        <Col
          xs={{ span: 10, offset: 2 }}
          sm={{ span: 10, offset: 2 }}
          md={{ span: 10, offset: 2 }}
          lg={{ span: 10, offset: 2 }}
          xl={{ span: 10, offset: 2 }}
          xxl={{ span: 10, offset: 2 }}
        >
          <h2 className="mb-4 text-sky-700 text-base font-medium ">
            After Changes
          </h2>
          <Divider />

          {info?.after &&
            !isEmpty(info?.after) &&
            Object.entries(info?.after)?.map(([key, value]: any, index) => (
              <div key={index}>
                {key === "kyc_status" ? (
                  <ListItem label={humanize(key)} status={value} />
                ) : (
                  <ListItem label={humanize(key)} data={value} />
                )}
              </div>
            ))}
        </Col>
      </Row>
    </Card>
  );
};
