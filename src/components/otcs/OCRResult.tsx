import { FC } from "react";
import { Card, Row, Col } from "antd";
import { ListItem } from "@/components/common";

interface OCRDetailsProp {
  ocrResult: any;
  title: string;
}

export const OCRDetails: FC<OCRDetailsProp> = ({ ocrResult, title }) => {
  return (
    <Card title={title} className="page-body w-full">
      <Row>
        <Col xs={{ span: 24 }}>
          <ListItem label="Full Name" data={ocrResult?.name?.en} />
          <ListItem label="Full Name in MM" data={ocrResult?.name?.mm} />
          <ListItem label="ID Number" data={ocrResult?.nrc_id?.en} />

          <ListItem label="ID Number in MM" data={ocrResult?.nrc_id?.mm} />
          <ListItem label="Father Name" data={ocrResult?.fathers_name?.en} />
          <ListItem
            label="Father Name in MM"
            data={ocrResult?.fathers_name?.mm}
          />
          <ListItem label="Date of Birth" data={ocrResult?.birth_date?.en} />
          <ListItem
            label="Date of Birth in mm"
            data={ocrResult?.birth_date?.mm}
          />
          <ListItem
            label="Blood Group"
            data={ocrResult?.blood_group?.en}
            secondaryData={ocrResult?.blood_group?.mm}
          />
          <ListItem
            label="Religion"
            data={ocrResult?.religion?.en}
            secondaryData={ocrResult?.religion?.mm}
          />
        </Col>
      </Row>
    </Card>
  );
};
